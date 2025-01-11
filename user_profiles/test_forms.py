from django.test import TestCase
from .forms import CustomSignupForm

# Create your tests here.
class TestSignupForm(TestCase):

    def test_form_is_valid(self):
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
        self.assertEqual(signup_form.errors['password2'], ['Passwords do not match.'])

    def test_form_is_invalid_missing_fields(self):
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
