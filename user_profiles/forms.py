from django import forms

class CustomSignupForm(forms.Form):
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

    def save(self, request):
        from allauth.account.forms import SignupForm
        user = SignupForm().save(request)
        user.first_name = self.cleaned_data['first_name']
        user.last_name = self.cleaned_data['last_name']
        user.save()
        return user

    def signup(self, request, user):
        user.first_name = self.cleaned_data.get('first_name')
        user.last_name = self.cleaned_data.get('last_name')
        user.save()