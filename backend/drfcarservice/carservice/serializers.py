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


class OrderSerializer(serializers.ModelSerializer):
    vin = CarSerializer(read_only=True)
    vin_id = serializers.PrimaryKeyRelatedField(
        write_only=True,
        queryset=Car.objects.all(),
        source='vin'
    )

    class Meta:
        model = Order
        fields = '__all__'

