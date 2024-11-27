from django.db import models
from .users import User

class Post(models.Model):
    MEDIA_TYPES = [
        ('photo', 'Photo'),
        ('video', 'Video'),
        ('photo_audio', 'Photo with Audio'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    media_type = models.CharField(max_length=50, choices=MEDIA_TYPES)
    media_url = models.URLField()
    visibility = models.CharField(max_length=50, choices=[('public', 'Public'), ('institution_specific', 'Institution Specific')])
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Post by {self.user.fname} at {self.created_at}"
