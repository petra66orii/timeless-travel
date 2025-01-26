from django.apps import AppConfig


class ChecklistsConfig(AppConfig):
    """
    Provides primary key type for checklists app
    """
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'checklists'
