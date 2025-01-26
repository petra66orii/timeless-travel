from django.test import TestCase
from django.contrib.auth.models import User
from django_summernote.widgets import SummernoteWidget
from .forms import CreatePost, EditPost, CommentForm
from .models import BlogPost


class CreatePostFormTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="testuser",
                                             password="testpassword")

    def test_create_post_form_valid_data(self):
        """
        Tests if the form is valid with complete and valid data.
        """
        form = CreatePost(data={
            'title': 'Test Post',
            'content': 'This is a test post.',
            'status': 0,
            'excerpt': 'Test excerpt.',
            'visibility': 'Public',
            'featured_image': 'placeholder'
        })
        self.assertTrue(form.is_valid())

    def test_create_post_form_missing_required_fields(self):
        """
        Test CreatePost form with missing required fields
        """
        form = CreatePost(data={
            'title': '',
            'content': '',
        })
        self.assertFalse(form.is_valid())
        self.assertIn('title', form.errors)
        self.assertIn('content', form.errors)

    def test_create_post_form_widget_for_content(self):
        """
        Test that the SummernoteWidget is used for the content field
        """
        form = CreatePost()
        self.assertIsInstance(form.fields['content'].widget, SummernoteWidget)


class EditPostFormTests(TestCase):
    def setUp(self):
        """
        Creates a test user and a BlogPost object for use in the test cases.

        This method is called before each test case in the class.
        It creates a new user with the username "testuser" and password
        "testpassword". Then, it creates a BlogPost object with some
        predefined data, such as "Original Title" for the
        title, "Original Content" for the content,
        and "Public" for the visibility.
        The created user is also assigned as the author of the BlogPost.

        This setup ensures that each test case has a consistent
        starting point with a known user and a BlogPost object.
        """
        self.user = User.objects.create_user(username="testuser",
                                             password="testpassword")
        self.post = BlogPost.objects.create(
            title="Original Title",
            content="Original Content",
            status=0,
            excerpt="Original Excerpt",
            visibility='Public',
            author=self.user,
        )

    def test_edit_post_form_valid_data(self):
        """
        Tests if the form is valid with updated data.
        """
        form = EditPost(data={
            'title': 'Updated Title',
            'content': 'Updated content.',
            'status': 1,
            'excerpt': 'Updated excerpt.',
            'visibility': 'Users Only',
        }, instance=self.post)
        self.assertTrue(form.is_valid())
        updated_post = form.save()
        self.assertEqual(updated_post.title, "Updated Title")

    def test_edit_post_form_missing_required_fields(self):
        """
        Test EditPost form with missing required fields
        """
        form = EditPost(data={
            'title': '',
            'content': '',
        }, instance=self.post)
        self.assertFalse(form.is_valid())
        self.assertIn('title', form.errors)
        self.assertIn('content', form.errors)

    def test_edit_post_form_widget_for_content(self):
        """
        Test that the SummernoteWidget is used for the content field
        """
        form = EditPost()
        self.assertIsInstance(form.fields['content'].widget, SummernoteWidget)


class CommentFormTests(TestCase):
    def test_comment_form_valid_data(self):
        """
        Test CommentForm with valid data
        """
        form = CommentForm(data={
            'content': 'This is a test comment.',
        })
        self.assertTrue(form.is_valid())

    def test_comment_form_missing_content(self):
        """
        Test CommentForm with missing content
        """
        form = CommentForm(data={
            'content': '',
        })
        self.assertFalse(form.is_valid())
        self.assertIn('content', form.errors)
