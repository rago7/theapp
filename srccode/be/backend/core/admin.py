from django.contrib import admin
from .models import User, Post, Like, Comment, Chat, Notification

admin.site.register(User)
admin.site.register(Post)
admin.site.register(Like)
admin.site.register(Comment)
admin.site.register(Chat)
admin.site.register(Notification)
