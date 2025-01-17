from django.shortcuts import render, get_object_or_404, redirect
from django.db.models import Count, Q
from django.contrib.auth.decorators import login_required
from .models import Profile
from .forms import EditProfileForm
from checklists.models import Checklist

# Create your views here.
@login_required
def user_profile(request):
    profile = get_object_or_404(Profile, user=request.user)
    checklists = Checklist.objects.filter(user=request.user).annotate(
        completed_tasks=Count('tasks', filter=Q(tasks__completed=True)),
        pending_tasks=Count('tasks', filter=Q(tasks__completed=False))
    )

    return render(
        request, 'user_profiles/user_profile.html',
        {'profile': profile, 
         'checklists': checklists
        })

@login_required
def profile_view(request):
    profile = request.user.profile
    profile_picture_url = profile.profile_picture.url if profile.profile_picture else '/static/images/placeholder.png'
    return render(request, 'profile.html', {'profile': profile, 'profile_picture_url': profile_picture_url})

@login_required
def edit_profile(request):
    if request.method == 'POST':
        form = EditProfileForm(request.POST, request.FILES, instance=request.user.profile)
        if form.is_valid():
            form.save()
            return redirect('profile')
    else:
        form = EditProfileForm(instance=request.user.profile)
    return render(request, 'user_profiles/edit_profile.html', {'form': form})