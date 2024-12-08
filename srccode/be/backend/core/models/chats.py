from django.db import models
from .users import User
import uuid

class Chat(models.Model):
    chat_id = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
    sender = models.ForeignKey(User, to_field='uuid', on_delete=models.CASCADE, related_name='sent_chats')
    recipient = models.ForeignKey(User, to_field='uuid', on_delete=models.CASCADE, related_name='received_chats', default=None)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Chat from {self.sender.fname} to {self.receiver.fname}"
