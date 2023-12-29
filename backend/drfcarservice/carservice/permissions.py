from rest_framework import permissions
from rest_framework.permissions import SAFE_METHODS


class IsActiveUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_active)


class IsStaff(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_active and request.user.is_staff)


class IsStaffOrReadOnly(permissions.BasePermission):

    def has_permission(self, request, view):
        return bool(
            request.method in SAFE_METHODS or
            request.user and
            request.user.is_active and request.user.is_staff
        )

