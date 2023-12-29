"""
URL configuration for drfcarservice project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework import routers

from carservice.views import *

router = routers.SimpleRouter()
router.register(r'userlist', UserViewSet)
router.register(r'carlist', CarViewSet)
router.register(r'orderlist', OrderViewSet)
router.register(r'documents', DocumentViewSet)
router.register(r'carpackages', CarPackageViewSet)
router.register(r'cardamages', CarDamageViewSet)
router.register(r'works', WorksViewSet)
router.register(r'spareparts', SparePartsViewSet)
router.register(r'worklist', WorkListViewSet)
router.register(r'sparepartlist', SparePartListViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include(router.urls)),
    path('api/v1/auth/', include('djoser.urls')),
    re_path(r'^auth/', include('djoser.urls.authtoken')),
    path('api/v1/check_token/', check_token)
]
