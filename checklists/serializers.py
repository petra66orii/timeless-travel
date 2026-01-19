from rest_framework import serializers
from .models import Checklist, Task

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'task', 'completed', 'priority']

class ChecklistSerializer(serializers.ModelSerializer):
    # This nests the tasks inside the checklist JSON
    tasks = TaskSerializer(many=True, read_only=True)
    
    class Meta:
        model = Checklist
        fields = ['id', 'title', 'description', 'created_at', 'tasks']