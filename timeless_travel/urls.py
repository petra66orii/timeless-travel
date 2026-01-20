from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from blog.views import BlogPostViewSet
from checklists.views import ChecklistViewSet, TaskUpdateAPIView

# Create the router and register viewsets
router = DefaultRouter()
router.register(r'posts', BlogPostViewSet, basename='blogpost')
router.register(r'checklists', ChecklistViewSet, basename='checklist')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('allauth.urls')),
    path('summernote/', include('django_summernote.urls')),
    path('dj-rest-auth/', include('dj_rest_auth.urls')),
    
    # The API URLs are now live at /api/
    path('api/', include(router.urls)),
    path('api/tasks/<int:pk>/', TaskUpdateAPIView.as_view(), name='task-update'),
    
    path('', include('home.urls'), name='home'),
    path('blog/', include("blog.urls")),
    path('user_profiles/', include('user_profiles.urls')),
    path('checklists/', include('checklists.urls')),
]