from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import *

# Register your models here.
admin.site.register(User, UserAdmin)


@admin.register(Car)
class CarAdmin(admin.ModelAdmin):
    list_display = ('car_model', 'vin')
    search_fields = ('car_model', 'vin')


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('user', 'order_date', 'status', 'appeal_reason')
    list_filter = ('status',)


@admin.register(Document)
class DocumentAdmin(admin.ModelAdmin):
    list_display = ('doc_num', 'doc_type', 'doc_date', 'order')
    list_filter = ('doc_type',)
    search_fields = ('doc_num',)


@admin.register(CarPackage)
class CarPackageAdmin(admin.ModelAdmin):
    list_display = ('doc', 'title', 'amount')
    search_fields = ('doc',)


@admin.register(CarDamage)
class CarDamageAdmin(admin.ModelAdmin):
    list_display = ('doc', 'title', 'place')
    search_fields = ('doc',)


@admin.register(Works)
class WorksAdmin(admin.ModelAdmin):
    list_display = ('doc', 'work', 'amount')
    search_fields = ('doc',)


@admin.register(WorkList)
class WorkListAdmin(admin.ModelAdmin):
    list_display = ('title',)


@admin.register(WorkCost)
class WorkCostAdmin(admin.ModelAdmin):
    list_display = ('work', 'cost', 'start', 'end')
    list_filter = ('work',)


@admin.register(SpareParts)
class SparePartsAdmin(admin.ModelAdmin):
    list_display = ('doc', 'spare_part', 'amount')
    search_fields = ('doc',)


@admin.register(SparePartList)
class SparePartListAdmin(admin.ModelAdmin):
    list_display = ('title',)


@admin.register(SparePartCost)
class SparePartCostAdmin(admin.ModelAdmin):
    list_display = ('spare_part', 'cost', 'start', 'end')
    list_filter = ('spare_part',)

