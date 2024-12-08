from django.db import models
from .users import User
import uuid

class Post(models.Model):
    post_id = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
    user = models.ForeignKey(User, to_field='uuid', on_delete=models.CASCADE, related_name='posts')
    MEDIA_TYPES = [
        ('photo', 'Photo'),
        ('video', 'Video'),
        ('photo_audio', 'Photo with Audio'),
    ]
    content = models.TextField()
    media_type = models.CharField(max_length=50, choices=MEDIA_TYPES)
    media_url = models.URLField()
    visibility = models.CharField(max_length=50, choices=[('public', 'Public'), ('institution_specific', 'Institution Specific')])
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Post by {self.user.fname} at {self.created_at}"
