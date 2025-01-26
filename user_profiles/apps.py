from django.apps import AppConfig


class UserProfilesConfig(AppConfig):
    """
    Provides primary key type for user_profiles app
    """
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'user_profiles'

    def ready(self):
        import user_profiles.signals
