from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from rest_framework.routers import DefaultRouter
from blog.views import BlogPostViewSet, CommentViewSet
from checklists.views import ChecklistViewSet, TaskViewSet
from user_profiles.views import UserProfileViewSet, DeleteUserView

# Create the router and register viewsets
router = DefaultRouter()
router.register(r'posts', BlogPostViewSet, basename='blogpost')
router.register(r'checklists', ChecklistViewSet, basename='checklist')
router.register(r'tasks', TaskViewSet, basename='task')
router.register(r'comments', CommentViewSet, basename='comments')
router.register(r'user-profile', UserProfileViewSet, basename='user-profile')

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('accounts/', include('allauth.urls')),
    path('summernote/', include('django_summernote.urls')),
    path('dj-rest-auth/', include('dj_rest_auth.urls')),
    path('dj-rest-auth/registration/', include('dj_rest_auth.registration.urls')),
    
    # The API URLs are now live at /api/
    path('api/', include(router.urls)),
    path('api/tasks/<int:pk>/', TaskViewSet.as_view({'put': 'update', 'patch': 'partial_update'}), name='task-update'),
    path(
        'password-reset/confirm/<uidb64>/<token>/', 
        TemplateView.as_view(template_name="password_reset_confirm.html"), 
        name='password_reset_confirm'
    ),
    path('api/user/delete/', DeleteUserView.as_view(), name='delete_user'),
    re_path(r'^.*$', TemplateView.as_view(template_name='index.html')),
]