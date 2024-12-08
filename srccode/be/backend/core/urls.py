from django.urls import path
from core.views.users import SignupView, LoginView
from core.views.posts import get_posts
from core.views.users import get_users, profile_view, update_profile_view
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path("posts/", get_posts, name="get_posts"),
    path("users/", get_users, name="get_users"),
    path('profile/', profile_view, name='profile'),
    path('profile_update/', update_profile_view, name='update_profile'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
