from django.shortcuts import render, get_object_or_404, reverse
from django.views import generic
from django.db.models import Q
from django.views.generic import DetailView, CreateView
from django.contrib.auth.mixins import LoginRequiredMixin
from .forms import CreatePost
from .models import BlogPost, Comments

# Create your views here.

# Blog posts list view
class BlogPostList(generic.ListView):
    model = BlogPost
    template_name = "blog/blog_posts.html"
    paginate_by = 5

    # Used Django's documentation to filter posts depending in visibility
    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            return BlogPost.objects.filter(
                Q(visibility='Public') |
                Q(visibility='Users Only') |
                (Q(visibility='Private') & Q(author=user))
        ).order_by('-created_at')
        else:
           return BlogPost.objects.filter(visibility='Public').order_by('-created_at')

# Single blog post view
class PostDetailView(DetailView):
    model = BlogPost
    template_name = 'blog/single_post.html'
    context_object_name = 'blogpost'

# Create post view
class PostCreateView(LoginRequiredMixin, CreateView):
    model = BlogPost
    form_class = CreatePost
    template_name = 'blog/create_post.html'

    def form_valid(self, form):
        form.instance.author = self.request.user
        return super().form_valid(form)

    def get_success_url(self):
        return reverse('post', kwargs={'slug': self.object.slug})

