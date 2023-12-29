from datetime import datetime

from django.utils import timezone
from rest_framework import serializers
from .models import *


# Create your serializers here.
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'patronymic', 'email', 'phone_number', 'is_active', 'is_staff')


class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = '__all__'


class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):
    vin = CarSerializer(read_only=True)
    vin_id = serializers.PrimaryKeyRelatedField(
        write_only=True,
        queryset=Car.objects.all(),
        source='vin'
    )
    document_set = DocumentSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = '__all__'


class CarPackageSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarPackage
        fields = '__all__'


class CarDamageSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarDamage
        fields = '__all__'


class WorkCostSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkCost
        fields = '__all__'


class WorkListSerializer(serializers.ModelSerializer):
    current_cost = serializers.SerializerMethodField()

    class Meta:
        model = WorkList
        fields = ['id', 'title', 'current_cost']

    def get_current_cost(self, obj):
        current_time = timezone.now()  # если ваш проект основан на времени UTC
        cost = WorkCost.objects.filter(
            work=obj,
            start__lte=current_time,
            # end__gte=current_time если end не None, иначе берем объекты, где end is None
        ).exclude(end__lt=current_time).order_by('-start').first()

        # Возвращаем стоимость или None, если цены нет
        return cost.cost if cost else None


class WorksSerializer(serializers.ModelSerializer):
    work = WorkListSerializer(read_only=True)
    work_id = serializers.PrimaryKeyRelatedField(
        write_only=True,
        queryset=WorkList.objects.all(),
        source='work'
    )

    class Meta:
        model = Works
        fields = '__all__'


class SparePartCostSerializer(serializers.ModelSerializer):
    class Meta:
        model = SparePartCost
        fields = '__all__'


class SparePartListSerializer(serializers.ModelSerializer):
    current_cost = serializers.SerializerMethodField()

    class Meta:
        model = SparePartList
        fields = ['id', 'title', 'current_cost']

    def get_current_cost(self, obj):
        current_time = timezone.now()  # если ваш проект основан на времени UTC
        cost = SparePartCost.objects.filter(
            spare_part=obj,
            start__lte=current_time,
            # end__gte=current_time если end не None, иначе берем объекты, где end is None
        ).exclude(end__lt=current_time).order_by('-start').first()

        # Возвращаем стоимость или None, если цены нет
        return cost.cost if cost else None


class SparePartsSerializer(serializers.ModelSerializer):
    spare_part = SparePartListSerializer(read_only=True)
    spare_part_id = serializers.PrimaryKeyRelatedField(
        write_only=True,
        queryset=SparePartList.objects.all(),
        source='spare_part'
    )

    class Meta:
        model = SpareParts
        fields = '__all__'
