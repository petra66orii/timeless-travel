from .models import BlogPost, Comments
from django import forms

class CreatePost(forms.ModelForm):
    class Meta:
        model = BlogPost
        fields = ['title', 'content', 'status', 'excerpt', 'featured_image', 'visibility']