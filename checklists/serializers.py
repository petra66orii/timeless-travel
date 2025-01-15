from rest_framework import serializers
from .models import Task, Checklist

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'

class ChecklistSerializer(serializers.ModelSerializer):
    tasks = TaskSerializer(many=True, read_only=True)
    class Meta:
        model = Checklist
        fields = ['id', 'title', 'description', 'created_at', 'updated_at', 'tasks']