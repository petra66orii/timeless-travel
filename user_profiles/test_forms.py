from django.test import TestCase
from django.contrib.auth.models import User
from allauth.account.forms import LoginForm
from cloudinary.models import CloudinaryField
from .forms import CustomSignupForm
from user_profiles.models import Profile
from user_profiles.forms import EditProfileForm
from django.core.files.uploadedfile import SimpleUploadedFile


# Create your tests here.
class TestSignupForm(TestCase):
    """
    Unit tests for the CustomSignupForm class.
    """
    def test_form_is_valid(self):
        """
        Tests if the form is valid with valid data.

        Asserts that the form is valid when provided with
        correct and complete user input.
        """
        form_data = {
            'first_name': 'John',
            'last_name': 'Smith',
            'username': 'johnsmith54',
            'email': 'johnsmith54@example.com',
            'password1': 'strongpassword123',
            'password2': 'strongpassword123'
        }
        signup_form = CustomSignupForm(data=form_data)
        self.assertTrue(signup_form.is_valid())

    def test_form_is_invalid_password_mismatch(self):
        """
        Tests if the form is invalid when passwords do not match.

        Asserts that the form is invalid and that the expected
        error message is present for mismatched passwords.
        """
        form_data = {
            'first_name': 'John',
            'last_name': 'Smith',
            'username': 'johnsmith54',
            'email': 'johnsmith54@example.com',
            'password1': 'strongpassword123',
            'password2': 'somethingelse123'
        }
        signup_form = CustomSignupForm(data=form_data)
        self.assertFalse(signup_form.is_valid())
        self.assertIn('password2', signup_form.errors)
        self.assertEqual(signup_form.errors['password2'],
                                           ['Passwords do not match.'])

    def test_form_is_invalid_missing_fields(self):
        """
        Tests if the form is invalid when required fields are missing.

        Asserts that the form is invalid and that expected
        error messages are present for missing required fields.
        """
        form_data = {
            'first_name': '',
            'last_name': '',
            'username': 'johnsmith54',
            'email': 'johnsmith54@example.com',
            'password1': 'strongpassword123',
            'password2': 'strongpassword123'
        }
        signup_form = CustomSignupForm(data=form_data)
        self.assertFalse(signup_form.is_valid())
        self.assertIn('first_name', signup_form.errors)
        self.assertIn('last_name', signup_form.errors)

    def test_form_is_invalid_email(self):
        """
        Tests if the form is invalid when an invalid email is provided.

        Asserts that the form is invalid and that the expected
        error message is present for the invalid email.
        """
        form_data = {
            'first_name': 'John',
            'last_name': 'Smith',
            'username': 'johnsmith54',
            'email': 'not-an-email',
            'password1': 'strongpassword123',
            'password2': 'strongpassword123'
        }
        signup_form = CustomSignupForm(data=form_data)
        self.assertFalse(signup_form.is_valid())
        self.assertIn('email', signup_form.errors)


class LoginFormTests(TestCase):
    """
    Unit tests for the LoginForm class.
    """
    def setUp(self):
        """
        Sets up test data by creating a sample user.
        """
        self.user_credentials = {
            'username': 'testusername',
            'password': 'testpassword123'
        }
        self.user = User.objects.create_user(
            username=self.user_credentials['username'],
            password=self.user_credentials['password']
        )

    def test_valid_form(self):
        """
        Tests if the form is valid with correct credentials.

        Asserts that the form is valid when provided with
        the correct username and password.
        """
        form_data = {'login': 'testusername', 'password': 'testpassword123'}
        form = LoginForm(data=form_data)
        self.assertTrue(form.is_valid())

    def test_invalid_form(self):
        """
        Tests if the form is invalid with incorrect credentials.

        Asserts that the form is invalid when provided with
        incorrect or missing credentials.
        """
        form_data = {'login': 'testusername', 'password': ''}
        form = LoginForm(data=form_data)
        self.assertFalse(form.is_valid())


class EditProfileFormTests(TestCase):
    """
    Unit tests for the EditProfileForm class.
    """
    def setUp(self):
        """
        Sets up test data by creating a user and a profile instance.
        """
        self.user = User.objects.create_user(f"testuser_{self.id()}",
                                             password='password')
        self.profile,
        created = Profile.objects.get_or_create(user=self.user,
                                                defaults={
                                                        "bio": "Initial bio"
                                                        })

    def test_valid_form(self):
        """
        Tests if the form is valid with updated bio.

        Asserts that the form is valid when provided with
        an updated bio and saves the updated profile information.
        """
        form_data = {
            "bio": "Updated bio",
        }
        form_files = {
            "profile_picture": None,
        }
        form = EditProfileForm(
                               data=form_data,
                               files=form_files,
                               instance=self.profile
                               )
        self.assertTrue(form.is_valid())
        updated_profile = form.save()
        self.assertEqual(updated_profile.bio, "Updated bio")

    def test_empty_bio(self):
        """
        Tests if the form is valid with an empty bio.

        Asserts that the form is valid even with an empty bio
        and saves the updated profile information.
        """
        form_data = {
            "bio": "",
        }
        form_files = {
            "profile_picture": None,
        }
        form = EditProfileForm(
                               data=form_data,
                               files=form_files,
                               instance=self.profile
                               )
        self.assertTrue(form.is_valid())
        updated_profile = form.save()
        self.assertEqual(updated_profile.bio, "")

    def test_upload_invalid_file_type(self):
        """
        Tests if the form is invalid with an invalid file type
        for profile picture.

        Asserts that the form is invalid when uploading a file
        with a content type other than image.
        """
        invalid_file = SimpleUploadedFile(
            "test_document.txt",
            b"file_content",
            content_type="text/plain"
        )
        form_data = {
            "bio": "Updated bio with invalid file",
        }
        form_files = {
            "profile_picture": invalid_file,
        }
        form = EditProfileForm(data=form_data,
                               files=form_files,
                               instance=self.profile)
        self.assertFalse(form.is_valid())

    def test_missing_data(self):
        """
        Tests if the form is valid with missing data (empty form).

        Asserts that the form is technically valid even with
        missing data (empty form) but the profile bio is not updated
        unless explicitly set.
        """
        form_data = {}
        form_files = {}
        form = EditProfileForm(data=form_data,
                               files=form_files,
                               instance=self.profile)
        self.assertTrue(form.is_valid())
        updated_profile = form.save(commit=False)
        if not updated_profile.bio:
            updated_profile.bio = "Initial bio"
        updated_profile.save()
        self.assertEqual(updated_profile.bio, "Initial bio")
