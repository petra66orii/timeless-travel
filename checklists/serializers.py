from rest_framework import serializers
from .models import Checklist, Task

class TaskSerializer(serializers.ModelSerializer):
    # Allow setting the checklist by ID when creating a task (Write Only)
    checklist_id = serializers.PrimaryKeyRelatedField(
        queryset=Checklist.objects.all(), 
        source='checklist', 
        write_only=True
    )

    class Meta:
        model = Task
        fields = ['id', 'task', 'completed', 'priority', 'checklist_id']

class ChecklistSerializer(serializers.ModelSerializer):
    # read_only=True ensures the API doesn't ask for tasks when creating a checklist
    tasks = TaskSerializer(many=True, read_only=True) 
    
    user = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Checklist
        fields = ['id', 'title', 'description', 'created_at', 'updated_at', 'user', 'tasks']
        read_only_fields = ['id', 'created_at', 'updated_at', 'user']