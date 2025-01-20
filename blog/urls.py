from . import views
from django.urls import path

urlpatterns = [
    path('', views.BlogPostList.as_view(), name='blog'),
    path('<slug:slug>/', views.PostDetailView.as_view(), name='post'),
]