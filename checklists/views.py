from django.shortcuts import render
from rest_framework import viewsets
from .models import Checklist, Task
from .serializers import TaskSerializer

# Create your views here.
class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

def checklist_view(request):
    return render(request, 'checklists/checklist.html')