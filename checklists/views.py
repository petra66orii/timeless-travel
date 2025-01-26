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
    """
    A view for creating new Checklist objects.

    Requires user authentication using LoginRequiredMixin.

    Attributes:
        model: The Checklist model.
        form_class: The CreateChecklist form class used
        for creating checklists.
        template_name: The HTML template used to render the
        create checklist form.
    """
    model = Checklist
    form_class = CreateChecklist
    template_name = 'checklists/checklist_form.html'

    def form_valid(self, form):
        """
        Overrides the default form_valid method
        to set the user for the new Checklist.

        Assigns the currently logged-in user
        as the creator of the new checklist
        before saving the form data.

        Args:
            form: The submitted CreateChecklist form.

        Returns:
            An HttpResponseRedirect object
            with the success message and redirect URL.
        """
        form.instance.user = self.request.user
        return super().form_valid(form)

    def get_success_url(self):
        """
        Determines the redirect URL after a checklist is successfully created.

        Displays a success message and redirects to the user's profile page.

        Returns:
            The URL to redirect to after successful checklist creation.
        """
        messages.success(self.request, "Checklist created!")
        return reverse('profile')


class ChecklistUpdateView(UpdateView, LoginRequiredMixin):
    """
    A view for updating existing checklist objects.

    Requires user authentication using LoginRequiredMixin.

    Attributes:
        model: The Checklist model.
        fields: A list of fields that can be edited in the update form.
        template_name: The HTML template used to render
        the update checklist form.
    """
    model = Checklist
    fields = ['title', 'description']
    template_name = 'checklists/edit_checklist_form.html'

    def get_success_url(self):
        """
        Determines the redirect URL after a
        checklist is successfully updated.

        Displays a success message and redirects
        back to the detail view of the updated checklist.

        Returns:
            The URL to redirect to after successful Checklist update.
        """
        messages.success(self.request, "Checklist updated!")
        return reverse('checklist', kwargs={'pk': self.object.pk})

    def get_queryset(self):
        """
        Filters the queryset to include only checklists owned
        by the logged-in user.

        This ensures that users can only update their own checklists.

        Returns:
            A QuerySet containing only checklists that
            belong to the current user.
        """
        return Checklist.objects.filter(user=self.request.user)


class ChecklistDeleteView(DeleteView, LoginRequiredMixin):
    """
    A view for deleting Checklist objects.

    Requires user authentication using LoginRequiredMixin.

    Attributes:
        model: The Checklist model.
        template_name: The HTML template used to confirm Checklist deletion.
        success_url: The URL to redirect to after successful deletion.
    """
    model = Checklist
    template_name = 'checklists/checklist_confirm_delete.html'
    success_url = reverse_lazy('checklist')

    def get_success_url(self):
        """
        Determines the redirect URL after a checklist is successfully deleted.

        Displays a success message and redirects to the user's profile page.

        Returns:
            The URL to redirect to after successful checklist deletion.
        """
        messages.success(self.request, "Checklist deleted!")
        return reverse('profile')


# Tasks CRUD Views
class TaskCreateView(CreateView):
    """
    A view for creating new task objects
    associated with a specific checklist.

    Attributes:
        model: The Task model.
        fields: A list of fields to be included in the form.
        template_name: The HTML template used to render the create task form.
    """
    model = Task
    fields = ['task', 'priority']
    template_name = 'checklists/task_form.html'

    def form_valid(self, form):
        """
        Overrides the default form_valid method to associate the
        task with the checklist.

        Retrieves the checklist object using the checklist_id
        from the URL kwargs
        and assigns it to the `checklist` field of the Task instance.

        Args:
            form: The submitted form data.

        Returns:
            An HttpResponseRedirect object with the success
            message and redirect URL.
        """
        checklist = get_object_or_404(Checklist,
                                      pk=self.kwargs['checklist_id'])
        form.instance.checklist = checklist
        return super().form_valid(form)

    def get_context_data(self, **kwargs):
        """
        Adds the checklist object to the context data.

        Retrieves the checklist object using the checklist_id
        from the URL kwargs
        and adds it to the context dictionary.

        Returns:
            A dictionary containing the context data for the template.
        """
        context = super().get_context_data(**kwargs)
        context['checklist'] = get_object_or_404(Checklist,
                                                 id=self.kwargs[
                                                               'checklist_id'
                                                                ])
        return context

    def get_success_url(self):
        """
        Determines the redirect URL after a task is successfully created.

        Displays a success message and redirects
        to the detail view of the associated checklist.

        Returns:
            The URL to redirect to after successful task creation.
        """
        messages.success(self.request, "Task created!")
        return reverse_lazy('checklist',
                            kwargs={'pk': self.kwargs['checklist_id']})


class TaskUpdateView(UpdateView):
    """
    A view for updating existing task objects.

    Attributes:
        model: The Task model.
        fields: A list of fields to be included in the update form.
        template_name: The HTML template used to render the update task form.
    """
    model = Task
    fields = ['task', 'priority']
    template_name = 'checklists/edit_task_form.html'

    def get_context_data(self, **kwargs):
        """
        Adds the checklist object to the context data.

        Retrieves the checklist object associated
        with the current task and adds it to the context dictionary.

        Returns:
            A dictionary containing the context data for the template.
        """
        context = super().get_context_data(**kwargs)
        context['checklist'] = self.object.checklist
        return context

    def get_success_url(self):
        """
        Determines the redirect URL after a task is successfully updated.

        Displays a success message and redirects
        to the detail view of the associated checklist.

        Returns:
            The URL to redirect to after successful task update.
        """
        messages.success(self.request, "Task updated!")
        return reverse_lazy('checklist',
                            kwargs={'pk': self.object.checklist.id})


class TaskDeleteView(DeleteView):
    """
    A view for deleting task objects.

    Attributes:
        model: The Task model.
        template_name: The HTML template used to confirm Task deletion.
    """
    model = Task
    template_name = 'checklists/task_confirm_delete.html'

    def get_context_data(self, **kwargs):
        """
        Adds the checklist object to the context data.

        Retrieves the checklist object associated
        with the current task and adds it to the context dictionary.

        Returns:
            A dictionary containing the context data for the template.
        """
        context = super().get_context_data(**kwargs)
        task = self.get_object()
        context['checklist'] = task.checklist
        return context

    def get_success_url(self):
        """
        Determines the redirect URL after a task is successfully deleted.

        Displays a success message and redirects
        to the detail view of the associated checklist.

        Returns:
            The URL to redirect to after successful task deletion.
        """
        messages.success(self.request, "Task deleted!")
        return reverse_lazy('checklist',
                            kwargs={'pk': self.object.checklist.id})


# Toggle tasks as complete
@csrf_exempt
def toggle_task_completion(request, task_id):
    """
    Toggles the completion status of a task object.

    Expects a POST request with the task_id in the URL path.

    Permissions:
      - Requires authentication (not explicitly enforced in this code).

    Args:
      request: The incoming HTTP request.
      task_id: The ID of the task object to be modified.

    Returns:
      A JSON response with the following data:
          - completed (bool): The updated completion status of the task.

    Raises:
      - HTTP 400 Bad Request: If the request method is not POST.
      - HTTP 404 Not Found: If the task object is not found or the user
        does not have permission to access it.
    """
    if request.method == 'POST':
        task = get_object_or_404(Task,
                                 id=task_id,
                                 checklist__user=request.user)
        task.completed = not task.completed
        task.save()
        return JsonResponse({'completed': task.completed})
    return JsonResponse({'error': 'Invalid request method'}, status=400)

