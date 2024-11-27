from django.urls import path
from .views.users import user_list
from .views.posts import post_list

urlpatterns = [
    path('users/', user_list, name='user-list'),
    path('posts/', post_list, name='post-list'),
]
