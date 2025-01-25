from django.shortcuts import render, get_object_or_404, reverse, redirect
from django.views import generic
from django.db.models import Q
from django.views.generic import DetailView, CreateView, UpdateView, DeleteView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import HttpResponseRedirect
from django.contrib import messages
from .forms import CreatePost, EditPost, CommentForm
from .models import BlogPost, Comments
from user_profiles.views import user_drafts

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
                Q(status=1)).filter(
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

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        # Add the comment form and the comments for the current post
        context['form'] = CommentForm()
        context['comments'] = self.object.comments.all()
        return context

    def post(self, request, *args, **kwargs):
        # Handle the comment submission
        self.object = self.get_object()  # Get the current blog post
        form = CommentForm(request.POST)
        if form.is_valid():
            comment = form.save(commit=False)
            comment.post = self.object
            comment.user = request.user
            comment.save()
            messages.success(request, "Comment added successfully!")
            return HttpResponseRedirect(reverse('post', args=[self.object.slug]))
        else:
            messages.error(request, "Ooops! Error adding comment!")

        # If the form is invalid, re-render the page with the form errors
        comments = blogpost.comments.all()
        return self.render_to_response({
            'blogpost': blogpost,
            'comments': comments,
            'form': form,
        })

        # Handle editing a comment
    def edit_comment(request, comment_id, slug):
        comment = get_object_or_404(Comments, id=comment_id, user=request.user)

        if request.method == 'POST':
            form = CommentForm(request.POST, instance=comment)
            if form.is_valid():
                form.save()
                messages.success(request, "Comment updated successfully!")
                return redirect('post', slug=comment.post.slug)
            else:
                messages.error(request, "Ooops! Error updating comment!")
        
    def delete_comment(request, comment_id, slug):
        comment = get_object_or_404(Comments, id=comment_id, user=request.user)

        if comment.user == request.user:
            comment.delete()
            messages.success(request, "Comment deleted successfully!")
            return HttpResponseRedirect(reverse('post',  args=[slug]))
        else:
            messages.error(request, "Failed to delete the comment.")
            return redirect('post', slug=slug)

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

# Update post view
class PostUpdateView(UpdateView, LoginRequiredMixin):
    model = BlogPost
    form_class = EditPost
    template_name = 'blog/edit_post.html'
    
    def get_success_url(self):
        return reverse('post', kwargs={'slug': self.object.slug})

    def get_queryset(self):
        # Only allow the logged-in user to update their checklists
        return BlogPost.objects.filter(author=self.request.user)

# Delete post view
class PostDeleteView(DeleteView):
    model = BlogPost
    template_name = 'blog/blogpost_confirm_delete.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        task = self.get_object()
        context['blogpost'] = self.object
        return context

    def get_success_url(self):
        if self.object.status == 1:
            return reverse('blog')
        elif self.object.status == 0:
            return reverse('user_drafts')