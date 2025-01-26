from .models import Checklist, Task
from django import forms


class CreateChecklist(forms.ModelForm):
    """
    Form class for users to create a checklist
    """
    class Meta:
        """
        Specify the Django model and order of the fields
        """
        model = Checklist
        fields = ['title', 'description']
