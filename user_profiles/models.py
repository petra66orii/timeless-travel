from django.db import models
from django.contrib.auth.models import User
from cloudinary.models import CloudinaryField


# Create your models here.
class Profile(models.Model):
    """
    Model representing user profiles.

    Attributes:
        user: A OneToOneField to the User model,
        ensuring a one-to-one relationship.
        bio: A TextField for storing the user's bio (optional).
        profile_picture: A CloudinaryField for storing
        the user's profile picture (optional).
    """
    user = models.OneToOneField(User, on_delete=models.CASCADE, unique=True)
    bio = models.TextField(blank=True, null=True)
    profile_picture = CloudinaryField('image', blank=True, null=True)

    def __str__(self):
        return self.user.username
