from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TaskViewSet, checklist_view

router = DefaultRouter()
router.register(r'tasks', TaskViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('checklist/', checklist_view, name='checklist'),
]