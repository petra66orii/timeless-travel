from django.db.models.signals import post_save
from allauth.account.signals import user_signed_up
from django.dispatch import receiver
from django.contrib.auth.models import User
from .models import Profile
from django.contrib import messages

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()

@receiver(user_signed_up)
def on_user_signup(request, user, **kwargs):
    messages.success(request, "You have successfully registered! Welcome to Time[less] Travel!")

