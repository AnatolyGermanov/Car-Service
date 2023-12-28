from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from .viewsets import NoDeleteModelViewSet
from .serializers import *
from .permissions import IsActiveUser, IsStaff


# Проверка токена наличия токена в системе
@api_view(['GET'])
def check_token(request):
    token_key = request.GET.get('auth_token', '')
    print(request.GET)
    tokens = Token.objects.filter(key=token_key)

    if tokens.exists():
        return Response({'checked': True})

    return Response({'checked': False})


# Create your views here.
class UserViewSet(NoDeleteModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsActiveUser,)


class CarViewSet(NoDeleteModelViewSet):
    queryset = Car.objects.all()
    serializer_class = CarSerializer
    permission_classes = (IsActiveUser,)


class OrderViewSet(NoDeleteModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = (IsActiveUser,)

    def get_queryset(self):
        """
        Отображение заказов в зависимости от статуса пользователя. Персонал видит все заказы,
        в то время как остальные видят только свои заказы.
        """
        user = self.request.user
        if user.is_staff:
            # Пользователи с флагом is_staff могут видеть все заказы конкретного пользователя
            user_id = self.request.query_params.get('user_id')
            if user_id is not None:
                target_user = get_object_or_404(User, pk=user_id)
                return Order.objects.select_related('vin').filter(user=target_user)
            return Order.objects.none()
        if user.is_active:
            # Активные пользователи видят только свои заказы
            return Order.objects.select_related('vin').filter(user=user)
        # Неактивные пользователи не должны видеть какие-либо заказы
        # Можно возвращать пустой QuerySet или вызвать исключение
        return Order.objects.none()

