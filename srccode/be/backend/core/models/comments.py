from django.db import models
from .users import User
from .posts import Post
import uuid

class Comment(models.Model):
    comment_id = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
    user = models.ForeignKey(User, to_field='uuid', on_delete=models.CASCADE, related_name='comments')
    post = models.ForeignKey(Post, to_field='post_id', on_delete=models.CASCADE, related_name='comments')
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Comment by {self.user.fname} on Post {self.post.id}"
