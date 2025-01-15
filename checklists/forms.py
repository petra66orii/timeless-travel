from .models import Checklist, Task
from django import forms

class CreateChecklist(forms.ModelForm):
    class Meta:
        model = Checklist
        fields = ['title', 'description']