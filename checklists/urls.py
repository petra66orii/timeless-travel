from django.urls import path, include
#from rest_framework.routers import DefaultRouter
from .views import TaskViewSet, ChecklistViewSet, ChecklistListView, ChecklistCreateView, ChecklistUpdateView, ChecklistDeleteView

#router = DefaultRouter()
#router.register(r'checklists', ChecklistViewSet)
#router.register(r'tasks', TaskViewSet)

urlpatterns = [
 #   path('', include(router.urls)),
    path('', ChecklistListView.as_view(), name='checklist'),
    path('create/', ChecklistCreateView.as_view(), name='checklist_create'),
    path('<int:pk>/edit/', ChecklistUpdateView.as_view(), name='checklist_update'),
    path('<int:pk>/delete/', ChecklistDeleteView.as_view(), name='checklist_delete'),
]