from django.shortcuts import render, get_object_or_404, reverse
from rest_framework import viewsets
from django.urls import reverse_lazy
from django.views.generic import CreateView, UpdateView, DeleteView, DetailView
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
class ChecklistDetailView(DetailView):
    model = Checklist
    template_name = 'checklists/checklist.html' 
    context_object_name = 'checklist'  

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        # Add tasks related to this checklist
        context['tasks'] = Task.objects.filter(checklist=self.object)
        return context

    def get_queryset(self):
        # Restrict checklists to those owned by the logged-in user
        return Checklist.objects.filter(user=self.request.user)

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

class TaskDeleteView(DeleteView):
    model = Task
    template_name = 'checklists/task_confirm_delete.html'

    def get_success_url(self):
        return reverse_lazy('checklist', kwargs={'pk': self.object.checklist.id})