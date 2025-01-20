from django.shortcuts import render, get_object_or_404
from django.views import generic
from .models import BlogPost, Comments
from django.views.generic import DetailView, CreateView
from .forms import CreatePost

# Create your views here.
class BlogPostList(generic.ListView):
    queryset = BlogPost.objects.all()
    template_name = "blog/blog_posts.html"
    paginate_by = 5

class PostDetailView(DetailView):
    model = BlogPost
    template_name = 'blog/single_post.html'
    context_object_name = 'blogpost'

class PostCreateView(CreateView):
    model = BlogPost
    form_class = CreatePost
    template_name = 'blog/create_post.html'

    def form_valid(self, form):
        form.instance.user = self.request.user
        return super().form_valid(form)

    def get_success_url(self):
        return reverse('post', kwargs={'slug': self.object.slug})

