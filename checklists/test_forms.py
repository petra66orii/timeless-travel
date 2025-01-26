from django.test import TestCase
from .forms import CreateChecklist
from .models import Checklist


class CreateChecklistFormTests(TestCase):

    def test_create_checklist_form_valid_data(self):
        """
        Tests if the CreateChecklist form is valid with valid data.
        """
        form_data = {
            'title': 'Test Checklist',
            'description': 'This is a test checklist.',
        }
        form = CreateChecklist(data=form_data)
        self.assertTrue(form.is_valid())

    def test_create_checklist_form_missing_required_fields(self):
        """
        Tests if the CreateChecklist form is invalid with
        missing required fields.
        """
        form_data = {
            'title': '',
            'description': '',
        }
        form = CreateChecklist(data=form_data)
        self.assertFalse(form.is_valid())
        self.assertIn('title', form.errors)
        self.assertIn('description', form.errors)
