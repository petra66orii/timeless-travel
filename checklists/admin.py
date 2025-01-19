from django.contrib import admin
from .models import Checklist, Task

# Register your models here.
class ChecklistAdmin(admin.ModelAdmin):
  list_display = ("user", "description", "title", "created_at", "updated_at")
  
admin.site.register(Checklist, ChecklistAdmin)

class TaskAdmin(admin.ModelAdmin):
  list_display = ("checklist", "task", "completed", "priority")
  
admin.site.register(Task, TaskAdmin)