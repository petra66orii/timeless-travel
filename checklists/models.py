from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Checklist(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='checklists')
    description = models.TextField(max_length=255)
    title = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
class Tasks(models.Model):
    checklist = models.ForeignKey(Checklist, on_delete=models.CASCADE, related_name='items')
    task = models.CharField(max_length=255)
    completed = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.task} ({'Completed' if self.completed else 'Pending'})"

