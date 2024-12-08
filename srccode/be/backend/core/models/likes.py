from django.db import models
from .users import User
from .posts import Post
import uuid

class Like(models.Model):
    like_id = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
    user = models.ForeignKey(User, to_field='uuid', on_delete=models.CASCADE, related_name='likes')
    post = models.ForeignKey(Post, to_field='post_id', on_delete=models.CASCADE, related_name='likes')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Like by {self.user.fname} on Post {self.post.id}"
