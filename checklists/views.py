from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets
from django.urls import reverse_lazy
from django.views.generic import ListView, CreateView, UpdateView, DeleteView
from django.contrib.auth.mixins import LoginRequiredMixin
from .models import Checklist, Task
from .serializers import TaskSerializer, ChecklistSerializer
from .forms import CreateChecklist

# Create your views here.

# Model View Sets
class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

class ChecklistViewSet(viewsets.ModelViewSet):
    queryset = Checklist.objects.all()
    serializer_class = ChecklistSerializer

# Checklist CRUD Views
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
    success_url = reverse_lazy('checklist')

class ChecklistDeleteView(DeleteView, LoginRequiredMixin):
    model = Checklist
    template_name = 'checklists/checklist_delete.html'
    success_url = reverse_lazy('checklist')

# Tasks CRUD Views
class TaskCreateView(CreateView):
    model = Task
    fields = ['task', 'completed']
    template_name = 'checklists/task_form.html'

    def form_valid(self, form):
        checklist = get_object_or_404(Checklist, pk=self.kwargs['checklist_id'])
        form.instance.checklist = checklist
        return super().form_valid(form)

    def get_success_url(self):
        return reverse_lazy('checklist', kwargs={'pk': self.kwargs['checklist_id']})

class TaskUpdateView(UpdateView):
    model = Task
    fields = ['task', 'completed']
    template_name = 'checklists/task_form.html'

    def get_success_url(self):
        return reverse_lazy('checklist', kwargs={'pk': self.object.checklist.id})
