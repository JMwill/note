from django.core.urlresolvers import resolve
from django.test import TestCase
from lists.views import home_page


# Create your tests here.
class HomePageTest(TestCase):
    """Test Home page activity"""
    def test_root_url_resolves_to_home_page_view(self):
        found = resolve('/')
        self.assertEqual(found.func, home_page)
