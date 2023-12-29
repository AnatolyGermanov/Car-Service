from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from .viewsets import NoDeleteModelViewSet
from .serializers import *
from .permissions import IsActiveUser, IsStaff, IsStaffOrReadOnly


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
        orders_query = Order.objects.select_related('vin').prefetch_related('document_set')
        if user.is_staff:
            # Пользователи с флагом is_staff могут видеть все заказы конкретного пользователя
            user_id = self.request.query_params.get('user_id')
            if user_id is not None:
                target_user = get_object_or_404(User, pk=user_id)
                return orders_query.filter(user=target_user)
            return Order.objects.none()
        if user.is_active:
            # Активные пользователи видят только свои заказы
            return orders_query.filter(user=user)
        # Неактивные пользователи не должны видеть какие-либо заказы
        # Можно возвращать пустой QuerySet или вызвать исключение
        return Order.objects.none()


class DocumentViewSet(viewsets.ModelViewSet):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer
    permission_classes = (IsStaffOrReadOnly,)


class CarPackageViewSet(viewsets.ModelViewSet):
    queryset = CarPackage.objects.all()
    serializer_class = CarPackageSerializer
    permission_classes = (IsStaffOrReadOnly,)

    def get_queryset(self):
        """
        Optionally restricts the returned purchases to a given user,
        by filtering against a `doc` query parameter in the URL.
        """
        queryset = super().get_queryset()
        doc_id = self.request.query_params.get('doc', None)
        if doc_id is not None:
            return queryset.filter(doc_id=doc_id)
        return CarPackage.objects.none()


class CarDamageViewSet(viewsets.ModelViewSet):
    queryset = CarDamage.objects.all()
    serializer_class = CarDamageSerializer
    permission_classes = (IsStaffOrReadOnly,)

    def get_queryset(self):
        """
        Optionally restricts the returned purchases to a given user,
        by filtering against a `doc` query parameter in the URL.
        """
        queryset = super().get_queryset()
        doc_id = self.request.query_params.get('doc', None)
        if doc_id is not None:
            return queryset.filter(doc_id=doc_id)
        return CarDamage.objects.none()


class WorksViewSet(viewsets.ModelViewSet):
    queryset = Works.objects.all()
    serializer_class = WorksSerializer
    permission_classes = (IsStaffOrReadOnly,)

    def get_queryset(self):
        queryset = super().get_queryset()
        # Получаем 'doc_id' из параметров запроса
        doc_id = self.request.query_params.get('doc', None)

        if doc_id is not None:
            # Фильтруем работы по id документа
            return queryset.filter(doc_id=doc_id)
        return Works.objects.none()


class WorkListViewSet(viewsets.ModelViewSet):
    queryset = WorkList.objects.all()
    serializer_class = WorkListSerializer
    permission_classes = (IsStaffOrReadOnly,)


class SparePartsViewSet(viewsets.ModelViewSet):
    queryset = SpareParts.objects.all()
    serializer_class = SparePartsSerializer
    permission_classes = (IsStaffOrReadOnly,)

    def get_queryset(self):
        queryset = super().get_queryset()
        # Получаем 'doc_id' из параметров запроса
        doc_id = self.request.query_params.get('doc', None)

        if doc_id is not None:
            # Фильтруем работы по id документа
            return queryset.filter(doc_id=doc_id)
        return SpareParts.objects.none()


class SparePartListViewSet(viewsets.ModelViewSet):
    queryset = SparePartList.objects.all()
    serializer_class = SparePartListSerializer
    permission_classes = (IsStaffOrReadOnly,)