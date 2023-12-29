from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db import migrations


# Create your models here.
class User(AbstractUser):
    patronymic = models.CharField(max_length=150, null=True, blank=True)
    phone_number = models.CharField(max_length=11, null=True)

    def __str__(self):
        return f'{self.first_name} {self.last_name}'


class Car(models.Model):
    vin = models.CharField(max_length=50, primary_key=True)
    car_model = models.CharField(max_length=50)
    release_date = models.DateField()
    body_number = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        return f'{self.car_model} {self.vin}'


class Order(models.Model):
    class OrderStates(models.TextChoices):
        WAIT = 'Ожидание', 'Ожидание'
        DIAGNOSTIC = 'Диагностика', 'Диагностика'
        AGREEMENT = 'Согласование', 'Согласование'
        EXECUTION = 'Выполнение', 'Выполнение'
        COMPLETE = 'Завершен', 'Завершен'

    user = models.ForeignKey('User', on_delete=models.PROTECT)
    order_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=15, choices=OrderStates.choices, default=OrderStates.WAIT)
    appeal_reason = models.TextField(blank=True, null=True)
    vin = models.ForeignKey('Car', on_delete=models.PROTECT)
    car_number = models.CharField(max_length=20)
    mileage = models.IntegerField()
    engine_number = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        return str(self.id)


class Document(models.Model):
    class DocumentType(models.TextChoices):
        PURCHASE_ORDER = 'Заказ-наряд', 'Заказ-наряд'
        ACCEPTANCE_CERTIFICATE = 'Акт приема-передачи', 'Акт приема-передачи'

    doc_num = models.IntegerField(blank=True)
    doc_type = models.CharField(max_length=20, choices=DocumentType.choices)
    doc_date = models.DateTimeField(auto_now=True)
    order = models.ForeignKey('Order', on_delete=models.PROTECT)

    class Meta:
        unique_together = ('doc_type', 'order')

    def __str__(self):
        return f'{self.doc_num} {self.doc_type}'


class CarPackage(models.Model):
    doc = models.ForeignKey('Document', on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    amount = models.IntegerField()

    class Meta:
        unique_together = ('doc', 'title')

    def __str__(self):
        return self.title


class CarDamage(models.Model):
    doc = models.ForeignKey('Document', on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    place = models.CharField(max_length=50)

    class Meta:
        unique_together = ('doc', 'title')

    def __str__(self):
        return self.title


class Works(models.Model):
    doc = models.ForeignKey('Document', on_delete=models.CASCADE)
    work = models.ForeignKey('WorkList', on_delete=models.PROTECT)
    amount = models.IntegerField()

    class Meta:
        unique_together = ('doc', 'work')


class WorkList(models.Model):
    title = models.CharField(max_length=50)

    def __str__(self):
        return self.title


class WorkCost(models.Model):
    work = models.ForeignKey('WorkList', on_delete=models.PROTECT)
    cost = models.DecimalField(max_digits=12, decimal_places=2)
    start = models.DateField(auto_now_add=True)
    end = models.DateField(blank=True, null=True)

    class Meta:
        unique_together = ('work', 'start')


class SpareParts(models.Model):
    doc = models.ForeignKey('Document', on_delete=models.CASCADE)
    spare_part = models.ForeignKey('SparePartList', on_delete=models.PROTECT)
    amount = models.IntegerField()

    class Meta:
        unique_together = ('doc', 'spare_part')


class SparePartList(models.Model):
    title = models.CharField(max_length=50)

    def __str__(self):
        return self.title


class SparePartCost(models.Model):
    spare_part = models.ForeignKey('SparePartList', on_delete=models.PROTECT)
    cost = models.DecimalField(max_digits=12, decimal_places=2)
    start = models.DateField(auto_now_add=True)
    end = models.DateField(blank=True, null=True)

    class Meta:
        unique_together = ('spare_part', 'start')

