from django.shortcuts import render
from rest_framework import viewsets
from django.urls import reverse_lazy
from django.views.generic import ListView, CreateView, UpdateView, DeleteView
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

class ChecklistListView(ListView):
    model = Checklist
    template_name = 'checklists/checklist.html'
    context_object_name = 'checklists'

class ChecklistCreateView(CreateView):
    model = Checklist
    form = CreateChecklist
    fields = ['title', 'description']
    template_name = 'checklists/checklist_form.html'
    success_url = reverse_lazy('checklist')

class ChecklistUpdateView(UpdateView):
    model = Checklist
    fields = ['title', 'description']
    template_name = 'checklists/checklist_form.html'
    success_url = reverse_lazy('checklist')

class ChecklistDeleteView(DeleteView):
    model = Checklist
    template_name = 'checklists/checklist_delete.html'
    success_url = reverse_lazy('checklist')