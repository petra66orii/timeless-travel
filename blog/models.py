from django.db import models
from django.contrib.auth.models import User
from cloudinary.models import CloudinaryField

STATUS = ((0, 'Draft'), (1, 'Published'))
VISIBILITY = (('private', 'Private'), ('users only', 'Users Only'), ('public', 'Public'))
# Create your models here.

# Blog post model - borrowed and adapted from Codestar Blog project
class BlogPost(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='blog_posts')
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, default='default-slug')
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    status = models.IntegerField(choices=STATUS, default=0)
    excerpt = models.TextField(blank=True)
    featured_image = CloudinaryField('image', default='placeholder')
    visibility = models.CharField(max_length=15, choices=VISIBILITY, default='users only')

    def __str__(self):
        return f"{self.title} | Written by {self.author}"

# Comments and Likes model
class Comments(models.Model):
    post = models.ForeignKey(BlogPost, on_delete=models.CASCADE, related_name='comments')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Comment by {self.user} on {self.post.title}'