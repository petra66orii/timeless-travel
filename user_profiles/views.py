from django.shortcuts import render

# Create your views here.
def user_profile(request):
    return render(request, 'user_profiles/user_profile.html')