from rest_framework import serializers
from .models import BlogPost, Comments
from django.contrib.auth.models import User

# 1. Create a mini serializer for the Author
class AuthorSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'name', 'email'] # ID for logic, Name for display

    def get_name(self, obj):
        # Return "First Last" if available, otherwise fallback to username
        if obj.first_name:
            return f"{obj.first_name} {obj.last_name}".strip()
        return obj.username

# 2. Update BlogPostSerializer to use it
class BlogPostSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True) # Use the object, not just a string

    class Meta:
        model = BlogPost
        fields = [
            'id', 'author', 'title', 'slug', 'content', 
            'excerpt', 'status', 'featured_image', 'created_at', 'visibility'
        ]

class CommentSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True, source='user')

    class Meta:
        model = Comments
        fields = ['id', 'post', 'author', 'content', 'created_at']