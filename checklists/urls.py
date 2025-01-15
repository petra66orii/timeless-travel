from django.urls import path, include
#from rest_framework.routers import DefaultRouter
from .views import TaskViewSet, ChecklistViewSet, ChecklistListView, ChecklistCreateView, ChecklistUpdateView, ChecklistDeleteView

#router = DefaultRouter()
#router.register(r'checklists', ChecklistViewSet)
#router.register(r'tasks', TaskViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('checklist/', checklist_view, name='checklist'),
]