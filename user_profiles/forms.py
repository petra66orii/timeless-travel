from django import forms
from django.core.exceptions import ValidationError
from .models import Profile


class CustomSignupForm(forms.Form):
    """
    Custom signup form that collects additional
    user information (first name, last name).

    Extends the default signup form to include
    fields for first name and last name.
    """
    first_name = forms.CharField(
        max_length=30,
        label="First Name",
        widget=forms.TextInput(attrs={
            'placeholder': 'First Name'
        })
    )
    last_name = forms.CharField(
        max_length=30,
        label="Last Name",
        widget=forms.TextInput(attrs={
            'placeholder': 'Last Name'
        })
    )
    username = forms.CharField(
        max_length=30,
        label="Username",
        help_text="Enter a unique username for your account."
    )
    email = forms.EmailField(
        label="Email",
        help_text="Provide a valid email address."
    )
    password1 = forms.CharField(
        widget=forms.PasswordInput,
        label="Password",
        help_text="Your password must be at least 8 characters long."
    )
    password2 = forms.CharField(
        widget=forms.PasswordInput,
        label="Confirm Password",
        help_text="Re-enter your password for confirmation."
    )

    def clean(self):
        """
        Validates the form data, ensuring that the entered passwords match.

        Returns:
            The cleaned data if valid, otherwise raises an error.
        """
        cleaned_data = super().clean()
        password1 = cleaned_data.get("password1")
        password2 = cleaned_data.get("password2")

        if password1 and password2 and password1 != password2:
            self.add_error("password2", "Passwords do not match.")

        return cleaned_data

    def save(self, request):
        """
        Creates a new user with the provided information.

        Uses the cleaned form data to create a new User object
        with the specified username, email, password,
        first name, and last name.

        Args:
            request: The HTTP request object.

        Returns:
            The newly created user object.
        """
        from allauth.account.forms import SignupForm
        user = SignupForm().save(request)
        user.first_name = self.cleaned_data['first_name']
        user.last_name = self.cleaned_data['last_name']
        user.save()
        return user

    def signup(self, request, user):
        """
        Saves the user's first and last name to the existing user object.

        This method is intended to be used after a
        successful user signup process.
        It updates the first and last names of the provided
        user object with the values from the cleaned form data.

        Args:
            request: The HTTP request object
            (might not be used in this method).
            user: The user object to be updated.
        """
        user.first_name = self.cleaned_data.get('first_name')
        user.last_name = self.cleaned_data.get('last_name')
        user.save()


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
                raise ValidationError("Invalid file type. Only JPEG and PNG are allowed.")
        return profile_picture 
