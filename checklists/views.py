from django.shortcuts import render
from rest_framework import viewsets
from django.urls import reverse_lazy
from django.views.generic import ListView, CreateView, UpdateView, DeleteView
from django.contrib.auth.mixins import LoginRequiredMixin
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

class ChecklistListView(ListView, LoginRequiredMixin):
    model = Checklist
    template_name = 'checklists/checklist.html'
    context_object_name = 'checklists'

class ChecklistCreateView(CreateView, LoginRequiredMixin):
    model = Checklist
    form = CreateChecklist
    fields = ['title', 'description']
    template_name = 'checklists/checklist_form.html'
    success_url = reverse_lazy('checklist')

    def form_valid(self, form):
        # Set the user to the currently logged-in user
        form.instance.user = self.request.user
        return super().form_valid(form)

class ChecklistUpdateView(UpdateView, LoginRequiredMixin):
    model = Checklist
    fields = ['title', 'description']
    template_name = 'checklists/checklist_form.html'
    success_url = reverse_lazy('checklist_update')

class ChecklistDeleteView(DeleteView, LoginRequiredMixin):
    model = Checklist
    template_name = 'checklists/checklist_delete.html'
    success_url = reverse_lazy('checklist')