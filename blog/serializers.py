from rest_framework import serializers
from rest_framework import permissions
from .models import BlogPost, Comments
from .permissions import IsOwnerOrReadOnly


class BlogPostSerializer(serializers.ModelSerializer):
    author = serializers.SerializerMethodField()
    featured_image = serializers.SerializerMethodField()
    # Format the date to be nice and readable, or keep as ISO format
    created_at = serializers.DateTimeField(format="%d %b %Y", read_only=True)

    class Meta:
        model = BlogPost
        fields = [
            'id', 
            'author', 
            'title', 
            'slug', 
            'content', 
            'excerpt', 
            'status', 
            'featured_image', 
            'created_at', 
            'visibility'
        ]

    def get_featured_image(self, obj):
        # Checks if the image field has content, then returns the URL
        if obj.featured_image and hasattr(obj.featured_image, 'url'):
            return obj.featured_image.url
        return None
    
    def get_author(self, obj):
        # Return "First Last" if available, otherwise "username"
        if obj.author.first_name:
            return f"{obj.author.first_name} {obj.author.last_name}".strip()
        return obj.author.username
    
class CommentSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='user.username') # Show username, not ID
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    class Meta:
        model = Comments
        fields = ['id', 'post', 'author', 'content', 'created_at']

    def get_author(self, obj):
        if obj.user.first_name:
            return f"{obj.user.first_name} {obj.user.last_name}".strip()
        return obj.user.username