from django.db import models
from django.contrib.auth.models import User

PRIORITIES = [
    ('low', 'Low'),
    ('medium', 'Medium'),
    ('high', 'High')
]

# Create your models here.
class Checklist(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='checklists', null=False)
    description = models.TextField(max_length=255)
    title = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
class Task(models.Model):
    checklist = models.ForeignKey(Checklist, on_delete=models.CASCADE, related_name='tasks')
    task = models.CharField(max_length=255)
    completed = models.BooleanField(default=False)
    priority = models.CharField(max_length=10, choices=PRIORITIES, default='low')

    def __str__(self):
        return f"{self.task} ({'Completed' if self.completed else 'Pending'})"

