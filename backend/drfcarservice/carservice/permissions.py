from rest_framework import permissions


class IsActiveUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_active)


class IsStaff(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_active and request.user.is_staff)
