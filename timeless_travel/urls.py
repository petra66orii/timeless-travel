from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from blog.views import BlogPostViewSet, CommentViewSet
from checklists.views import ChecklistViewSet, TaskViewSet
from user_profiles.views import UserProfileDetailView

# Create the router and register viewsets
router = DefaultRouter()
router.register(r'posts', BlogPostViewSet, basename='blogpost')
router.register(r'checklists', ChecklistViewSet, basename='checklist')
router.register(r'tasks', TaskViewSet, basename='task')
router.register(r'comments', CommentViewSet, basename='comments')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('allauth.urls')),
    path('summernote/', include('django_summernote.urls')),
    path('dj-rest-auth/', include('dj_rest_auth.urls')),
    
    # The API URLs are now live at /api/
    path('api/', include(router.urls)),
    path('api/tasks/<int:pk>/', TaskViewSet.as_view({'put': 'update', 'patch': 'partial_update'}), name='task-update'),
    path('api/user-profile/', UserProfileDetailView.as_view(), name='user-profile'),
    
    path('', include('home.urls'), name='home'),
    path('blog/', include("blog.urls")),
    path('user_profiles/', include('user_profiles.urls')),
    path('checklists/', include('checklists.urls')),
]