from django.contrib import admin
from .models import BlogPost, Comments
from django_summernote.admin import SummernoteModelAdmin

# Register your models here.
# This model was borrowed and adapted from Codestar Blog project
@admin.register(BlogPost)
class BlogPostAdmin(SummernoteModelAdmin):

    list_display = ('title', 'slug', 'status')
    search_fields = ['title']
    list_filter = ('status',)
    prepopulated_fields = {'slug': ('title',)}
    summernote_fields = ('content',)

@admin.register(Comments)
class CommentsAdmin(admin.ModelAdmin):
  list_display = ("post", "user", "content", "created_at")
