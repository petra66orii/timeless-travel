from django.urls import path
from . import views

urlpatterns = [
    path('profile/', views.user_profile, name='profile'),
    path('profile/drafts/', views.user_drafts, name='user_drafts'),
    path('profile/drafts/publish/<int:post_id>/', views.publish_post,
         name='publish_post'),
    path('edit_profile/', views.edit_profile, name='edit_profile')
]
