from django import forms
from django.core.exceptions import ValidationError
from .models import Profile


class EditProfileForm(forms.ModelForm):
    """
    Form for editing user profile information.

    Allows users to update their profile picture and bio.

    Attributes:
        Meta:
            - model: The Profile model.
            - fields: A list of fields to be included
            in the form ('profile_picture', 'bio').
    """
    class Meta:
        model = Profile
        fields = ['profile_picture', 'bio']

    def clean_profile_picture(self):
        """
        Validates the uploaded profile picture.
        Checks if the uploaded file is a valid image file (JPEG or PNG).

        Args:
            self: The current form instance.

        Returns:
            The cleaned profile picture data if valid.

        Raises:
            ValidationError: If the uploaded file type is not JPEG or PNG.
        """
        profile_picture = self.cleaned_data.get('profile_picture')
        if profile_picture:
            valid_mime_types = ['image/jpeg', 'image/png']
            file_type = profile_picture.content_type
            if file_type not in valid_mime_types:
                raise ValidationError("Invalid file type.")
        return profile_picture
