from django.shortcuts import render
from rest_framework import viewsets
from .models import Checklist, Task
from .serializers import TaskSerializer, ChecklistSerializer
from .forms import CreateChecklist

# Create your views here.
class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

class ChecklistViewSet(viewsets.ModelViewSet):
    queryset = Checklist.objects.all()
    serializer_class = ChecklistSerializer

