from django.shortcuts import render, get_object_or_404, redirect
from django.db.models import Count, Q
from django.contrib.auth.decorators import login_required
from django.core.paginator import Paginator
from django.contrib import messages
from .models import Profile
from .forms import EditProfileForm
from checklists.models import Checklist
from blog.models import BlogPost


# Create your views here.
@login_required
def user_profile(request):
    """
    Displays the user's profile page.

    Retrieves the user's profile, checklists, and published blog posts.
    Paginates the blog posts for better user experience.

    Args:
        request: The HTTP request object.

    Returns:
        An HTTPResponse object rendering the
        'user_profiles/user_profile.html' template
        with the user's profile, checklists,
        and paginated blog posts.
    """
    profile = get_object_or_404(Profile, user=request.user)
    checklists = Checklist.objects.filter(user=request.user).annotate(
        completed_tasks=Count('tasks', filter=Q(tasks__completed=True)),
        pending_tasks=Count('tasks', filter=Q(tasks__completed=False))
    )
    blog_posts = BlogPost.objects.filter(
                                         author=request.user,
                                         status=1).order_by('-created_at')

    # Used Django's Paginator to paginate the posts section in user profile
    paginator = Paginator(blog_posts, 4)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    return render(
        request, 'user_profiles/user_profile.html',
        {'profile': profile,
         'checklists': checklists,
         'page_obj': page_obj
         })


@login_required
def profile_view(request):
    """
    Displays the current user's profile page.

    Retrieves the user's profile object and generates the URL
    for the profile picture (using a placeholder if no picture is set).

    Args:
        request: The HTTP request object.

    Returns:
        An HTTPResponse object rendering the 'profile.html' template
        with the user's profile and profile picture URL.
    """
    profile = request.user.profile
    profile_picture_url = (
                           profile.profile_picture.url
                           if profile.profile_picture
                           else '/static/images/placeholder.png'
                          )
    return render(request, 'profile.html',
                  {'profile': profile,
                   'profile_picture_url': profile_picture_url})


@login_required
def edit_profile(request):
    """
    Allows users to edit their profile information.

    Handles GET and POST requests:
        - GET: Renders the edit profile form with
        the user's current profile information.
        - POST: Validates the submitted form data.
            - If valid, saves the updated profile information
            and displays a success message.
            - If invalid, re-renders the form with
            the validation errors.

    Args:
        request: The HTTP request object.

    Returns:
        An HTTPResponse object rendering the
        'user_profiles/edit_profile.html' template
        with the edit profile form.
    """
    if request.method == 'POST':
        form = EditProfileForm(request.POST,
                               request.FILES,
                               instance=request.user.profile)
        if form.is_valid():
            form.save()
            messages.success(request, 'Profile successfully updated!')
            return redirect('profile')
    else:
        form = EditProfileForm(instance=request.user.profile)
    return render(request, 'user_profiles/edit_profile.html', {'form': form})


@login_required
def user_drafts(request):
    """
    Displays a list of the user's draft blog posts.

    Retrieves all BlogPost objects authored by the current user
    that have a status of 0 (draft).

    Args:
        request: The HTTP request object.

    Returns:
        An HTTPResponse object rendering the 'blog/draft_posts.html'
        template with a list of the user's draft posts.
    """
    draft_posts = BlogPost.objects.filter(author=request.user, status=0)
    return render(
                  request, 'blog/draft_posts.html',
                  {
                   'draft_posts': draft_posts}
                  )


@login_required
def publish_post(request, post_id):
    """
    Publishes a draft blog post by the current user.

    Retrieves the specified draft post (status 0)
    authored by the current user.
    Handles POST requests to publish the draft post:
        - Sets the post's status to 1 (published).
        - Saves the updated post.
        - Displays a success message.
        - Redirects the user back to the draft posts list.

    Args:
        request: The HTTP request object.
        post_id: The ID of the draft blog post to publish.

    Returns:
        An HTTPResponse object potentially
        redirecting to the 'user_drafts' view
        or raising a 404 error if the post
        is not found or not a draft.
    """
    draft_post = get_object_or_404(BlogPost,
                                   id=post_id,
                                   author=request.user,
                                   status=0)

    if request.method == "POST":
        draft_post.status = 1
        draft_post.save()
        messages.success(request, 'Post successfully published!')
        return redirect('user_drafts')
