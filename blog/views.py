from django.shortcuts import render
from django.views import generic
from .models import BlogPost, Comments
from django.views.generic import DetailView

# Create your views here.
class BlogPostList(generic.ListView):
    queryset = BlogPost.objects.all()
    template_name = "blog/blog_posts.html"
    paginate_by = 5

class PostDetailView(DetailView):
    model = BlogPost
    template_name = 'blog/single_post.html'
    context_object_name = 'blogpost'

