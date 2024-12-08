from django.db import models
from .users import User
import uuid

class Notification(models.Model):
    NOTIFICATION_TYPES = [
        ('like', 'Like'),
        ('comment', 'Comment'),
        ('other', 'Other'),
    ]

    notification_id = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
    user = models.ForeignKey(User, to_field='uuid', on_delete=models.CASCADE, related_name='notifications')
    trigger_user = models.ForeignKey(User, to_field='uuid', on_delete=models.CASCADE, related_name='triggered_notifications', default=None) 
    type = models.CharField(max_length=50, choices=NOTIFICATION_TYPES)
    message = models.TextField()
    read_status = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Notification for {self.user.fname} from {self.trigger_user.fname}"
