from django.urls import path, include
from .views import TaskViewSet, ChecklistViewSet, ChecklistCreateView, ChecklistUpdateView, ChecklistDeleteView
from .views import TaskCreateView, TaskUpdateView, TaskDeleteView, ChecklistDetailView


urlpatterns = [
    path('checklists/<int:pk>/', ChecklistDetailView.as_view(), name='checklist'),
    #path('checklists/<int:pk>/', ChecklistListView.as_view(), name='checklist'),
    path('create/', ChecklistCreateView.as_view(), name='checklist_create'),
    path('<int:pk>/edit/', ChecklistUpdateView.as_view(), name='checklist_update'),
    path('<int:pk>/delete/', ChecklistDeleteView.as_view(), name='checklist_delete'),

    path('checklists/<int:checklist_id>/tasks/create/', TaskCreateView.as_view(), name='task_create'),
    path('tasks/<int:pk>/update/', TaskUpdateView.as_view(), name='task_update'),
    path('tasks/<int:pk>/delete/', TaskDeleteView.as_view(), name='task_delete'),
]