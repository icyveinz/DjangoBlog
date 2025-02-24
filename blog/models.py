from django.db import models

# Create your models here.
class Post(models.Model):
    title = models.CharField(max_length=250)
    slug = models.TextField(max_length=250, unique=True)
    body = models.TextField()
    def __str__(self):
        return self.title