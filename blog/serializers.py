from rest_framework import serializers
from .models import BlogPost

class BlogPostSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.username')
    featured_image = serializers.SerializerMethodField()
    # Format the date to be nice and readable, or keep as ISO format
    created_at = serializers.DateTimeField(format="%d %b %Y")

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