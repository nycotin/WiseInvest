from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.

class User(AbstractUser):
    id = models.AutoField(primary_key=True)
    firstname = models.CharField(max_length=30)
    lastname = models.CharField(max_length=30)
    email = models.EmailField(max_length=64)
    username = models.CharField(unique=True, max_length=64)
    password = models.CharField(max_length=20)
    
    def __str__(self):
        return f"{self.id}"

