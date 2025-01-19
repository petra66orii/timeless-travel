from django.shortcuts import render
from django.views import generic
from .models import BlogPost, Comments

# Create your views here.
class BlogPostList(generic.ListView):
    queryset = BlogPost.objects.all()
    template_name = "blog/blog_posts.html"
    paginate_by = 5
