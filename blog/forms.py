from bleach import clean
from .models import BlogPost, Comments
from django_summernote.widgets import SummernoteWidget
from django import forms

class CreatePost(forms.ModelForm):
    class Meta:
        model = BlogPost
        fields = ['title', 'content', 'status', 'excerpt', 'featured_image', 'visibility']
        widgets = {
            'content': SummernoteWidget(),
        }

class EditPost(forms.ModelForm):
    class Meta:
        model = BlogPost
        fields = ['title', 'content', 'status', 'excerpt', 'featured_image', 'visibility']
        widgets = {
            'content': SummernoteWidget(),
        }