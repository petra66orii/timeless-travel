from . import views
from django.urls import path

urlpatterns = [
    path('', views.BlogPostList.as_view(), name='blog'),
    path('create/', views.PostCreateView.as_view(), name='create_post'),
    path('<slug:slug>/', views.PostDetailView.as_view(), name='post'),
]