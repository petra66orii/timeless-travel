from django.shortcuts import render, get_object_or_404
from django.contrib.auth.decorators import login_required
from .models import Profile

# Create your views here.
@login_required
def user_profile(request):
    profile = get_object_or_404(Profile, user=request.user)
    return render(
        request, 'user_profiles/user_profile.html',
        {'profile': profile})