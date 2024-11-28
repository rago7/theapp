from django.urls import path
from core.views.users import SignupView, LoginView
from core.views.posts import get_posts
from core.views.users import get_users

urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path("posts/", get_posts, name="get_posts"),
    path("users/", get_users, name="get_users"),
]
