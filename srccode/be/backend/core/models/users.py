from django.db import models

class User(models.Model):
    fname = models.CharField(max_length=100)
    lname = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    dob = models.DateField()
    gender = models.CharField(max_length=10)
    profile_pic_url = models.URLField()
    university = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    verified = models.BooleanField(default=False)
    last_active = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.fname} {self.lname}"
