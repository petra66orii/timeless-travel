from django.shortcuts import render, get_object_or_404, reverse, redirect
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets
from django.urls import reverse_lazy
from django.views.generic import CreateView, UpdateView, DeleteView, DetailView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib import messages
from .models import Checklist, Task
from .forms import CreateChecklist

# Create your views here.


# Checklist CRUD Views
class ChecklistDetailView(DetailView):
    """
    A DetailView for displaying a single Checklist.

    Retrieves the Checklist object and its associated tasks.
    Restricts access to Checklists owned by the logged-in user.

    Attributes:
        model: The Checklist model.
        template_name: The HTML template used to render the Checklist detail.
        context_object_name: The name of the variable used
        in the template to access the Checklist object.
    """
    model = Checklist
    template_name = 'checklists/checklist.html'
    context_object_name = 'checklist'

    def get_context_data(self, **kwargs):
        """
        Adds the related tasks to the context.

        Retrieves all Task objects associated with the current Checklist
        and adds them to the context dictionary.

        Returns:
            A dictionary containing the context data for the template.
        """
        context = super().get_context_data(**kwargs)
        # Add tasks related to this checklist
        context['tasks'] = Task.objects.filter(checklist=self.object)
        return context

    def get_queryset(self):
        """
        Filters the queryset to include only Checklists
        owned by the logged-in user.

        Returns:
            A QuerySet containing only Checklists that belong
            to the current user.
        """

        return Checklist.objects.filter(user=self.request.user)


class ChecklistCreateView(CreateView, LoginRequiredMixin):
    model = Checklist
    form_class = CreateChecklist
    template_name = 'checklists/checklist_form.html'

    def form_valid(self, form):
        form.instance.user = self.request.user
        return super().form_valid(form)

    def get_success_url(self):
        messages.success(self.request, "Checklist created!")
        return reverse('profile')


class ChecklistUpdateView(UpdateView, LoginRequiredMixin):
    model = Checklist
    fields = ['title', 'description']
    template_name = 'checklists/edit_checklist_form.html'

    def get_success_url(self):
        messages.success(self.request, "Checklist updated!")
        return reverse('checklist', kwargs={'pk': self.object.pk})

    def get_queryset(self):
        # Only allow the logged-in user to update their checklists
        return Checklist.objects.filter(user=self.request.user)


class ChecklistDeleteView(DeleteView, LoginRequiredMixin):
    model = Checklist
    template_name = 'checklists/checklist_confirm_delete.html'
    success_url = reverse_lazy('checklist')

    def get_success_url(self):
        messages.success(self.request, "Checklist deleted!")
        return reverse('profile')


# Tasks CRUD Views
class TaskCreateView(CreateView):
    model = Task
    fields = ['task', 'priority']
    template_name = 'checklists/task_form.html'

    def form_valid(self, form):
        checklist = get_object_or_404(Checklist,
                                      pk=self.kwargs['checklist_id'])
        form.instance.checklist = checklist
        return super().form_valid(form)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['checklist'] = get_object_or_404(Checklist,
                                                 id=self.kwargs[
                                                               'checklist_id'
                                                                ])
        return context

    def get_success_url(self):
        messages.success(self.request, "Task created!")
        return reverse_lazy('checklist',
                            kwargs={'pk': self.kwargs['checklist_id']})


class TaskUpdateView(UpdateView):
    model = Task
    fields = ['task', 'priority']
    template_name = 'checklists/edit_task_form.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['checklist'] = self.object.checklist
        return context

    def get_success_url(self):
        messages.success(self.request, "Task updated!")
        return reverse_lazy('checklist',
                            kwargs={'pk': self.object.checklist.id})


class TaskDeleteView(DeleteView):
    model = Task
    template_name = 'checklists/task_confirm_delete.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        task = self.get_object()
        context['checklist'] = task.checklist
        return context

    def get_success_url(self):
        messages.success(self.request, "Task deleted!")
        return reverse_lazy('checklist',
                            kwargs={'pk': self.object.checklist.id})


# Toggle tasks as complete
@csrf_exempt
def toggle_task_completion(request, task_id):
    if request.method == 'POST':
        task = get_object_or_404(Task,
                                 id=task_id,
                                 checklist__user=request.user)
        task.completed = not task.completed
        task.save()
        return JsonResponse({'completed': task.completed})
    return JsonResponse({'error': 'Invalid request method'}, status=400)
