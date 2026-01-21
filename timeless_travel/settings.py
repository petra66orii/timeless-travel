from pathlib import Path
import os
import sys
import dj_database_url
if os.path.isfile('env.py'):
    import env
from corsheaders.defaults import default_headers
from django.contrib.messages import constants as messages

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent
TEMPLATES_DIR = os.path.join(BASE_DIR, 'templates')

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get("SECRET_KEY")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = os.environ.get("DEBUG", "False") == "True"

ALLOWED_HOSTS = ['8000-petra66orii-timelesstra-fb5flw6d4ly.ws.codeinstitute-ide.net', '.herokuapp.com', 'localhost', '127.0.0.1']


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'cloudinary_storage',
    'django_summernote',
    'django_bleach',
    'cloudinary',
    'django.contrib.sites',
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'rest_framework.authtoken',
    'corsheaders',            
    'dj_rest_auth',
    'crispy_forms',
    'crispy_bootstrap5',
    'home',
    'blog',
    'user_profiles',
    'checklists',
]

SITE_ID = 1
LOGIN_REDIRECT_URL = '/'
LOGOUT_REDIRECT_URL = '/'

CRISPY_ALLOWED_TEMPLATE_PACKS = "bootstrap5"
CRISPY_TEMPLATE_PACK = "bootstrap5"

SUMMERNOTE_CONFIG = {
    # Using SummernoteWidget - iframe mode, default
    'iframe': True,

    # You can put custom Summernote settings
    'summernote': {
        # Change editor size
        'width': '100%',
        'height': '480',

        # Toolbar customization
        # https://summernote.org/deep-dive/#custom-toolbar-popover
        'toolbar': [
            ['style', ['style']],
            ['font', ['bold', 'underline', 'clear']],
            ['fontname', ['fontname']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['table', ['table']],
            ['insert', ['link', 'picture', 'video']],
            ['view', ['fullscreen', 'codeview', 'help']],
        ],
    }
}

BLEACH_ALLOWED_TAGS = [
    'a', 'b', 'blockquote', 'em', 'i', 'li', 'ol', 'p', 'strong', 'ul', 
    'h1', 'h2', 'h3', 'pre', 'code', 'img', 'table', 'tr', 'td', 'th', 'tbody'
]

BLEACH_ALLOWED_ATTRIBUTES = {
    '*': ['class', 'style', 'align'],
    'a': ['href', 'rel', 'target'],
    'img': ['src', 'alt', 'width', 'height'],
}

BLEACH_ALLOWED_STYLES = [
    'color', 'font-weight', 'text-align', 'background-color', 'font-style'
]

BLEACH_STRIP_TAGS = True  # Strip disallowed tags instead of escaping them
BLEACH_STRIP_COMMENTS = True  # Remove HTML comments

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'allauth.account.middleware.AccountMiddleware',
]

ROOT_URLCONF = 'timeless_travel.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [TEMPLATES_DIR],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'timeless_travel.wsgi.application'

# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases


# Check if the DATABASE_URL environment variable is set
if os.environ.get("DATABASE_URL"):
    # If yes, use the Heroku Postgres database
    DATABASES = {
        'default': dj_database_url.parse(os.environ.get("DATABASE_URL"))
    }
else:
    # If no (local development), use the built-in SQLite database
    print("Postgres URL not found, using local SQLite3 instead.")
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db.sqlite3',
        }
    }

CSRF_TRUSTED_ORIGINS = [
    "https://*.codeinstitute-ide.net/",
    "https://*.herokuapp.com"
]

# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

MESSAGE_TAGS = {
    messages.DEBUG: 'debug',
    messages.INFO: 'info',
    messages.SUCCESS: 'success',
    messages.WARNING: 'warning',
    messages.ERROR: 'danger',
}

ACCOUNT_EMAIL_VERIFICATION = 'none'
ACCOUNT_SIGNUP_FORM_CLASS = 'user_profiles.forms.CustomSignupForm'

# Email settings for development

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = os.environ.get('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = os.environ.get('EMAIL_HOST_PASSWORD')
DEFAULT_FROM_EMAIL = os.environ.get('EMAIL_HOST_USER')

# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = 'static/'
STATICFILES_DIRS = [os.path.join(BASE_DIR, 'static'), ]
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
DEFAULT_FILE_STORAGE = 'cloudinary_storage.storage.MediaCloudinaryStorage'

# CORS Settings
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

CORS_ALLOW_HEADERS = list(default_headers) + [
    "content-disposition", 
    "authorization",
]

CORS_ALLOW_CREDENTIALS = True

REST_AUTH = {
    'TOKEN_SERIALIZER': 'dj_rest_auth.serializers.TokenSerializer',
    'SESSION_LOGIN': False, # Recommended False if using only Tokens for API
}

# REST Framework Config (Use Session Auth for now)
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
        'rest_framework.authentication.SessionAuthentication',
    ],
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
        'rest_framework.renderers.BrowsableAPIRenderer',
    ],
}