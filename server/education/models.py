from django.db import models

from users.models import User

# Create your models here.

class Course(models.Model):
    id = models.AutoField(primary_key=True)
    playlistId = models.CharField(max_length=50)
    createdBy = models.CharField(max_length=50)
    title = models.CharField(max_length=50)
    description = models.CharField(max_length=500, blank=True, null=True)
    itemCount = models.IntegerField()
    url = models.URLField(max_length=150)
    player = models.CharField(max_length=500)
    cover =  models.URLField(max_length=50)

class CourseItem(models.Model):
    id = models.AutoField(primary_key=True)
    courseId = models.ForeignKey(Course, on_delete=models.CASCADE)
    itemId = models.CharField(max_length=50)
    title = models.CharField(max_length=50)
    description = models.CharField(max_length=500, blank=True, null=True)
    position = models.IntegerField()
    thumbnail = models.URLField(max_length=50)
    publishedAt = models.DateTimeField()

class Favorite(models.Model):
    id = models.AutoField(primary_key=True)
    userId = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    favorite_courses = models.ManyToManyField(Course, related_name='fav_courses')

class Learning(models.Model):
    STATUSES = {
        "Enrolled": "Enrolled",
        "In Progress": "In Progress",
        "Completed": "Completed"
    }

    id = models.AutoField(primary_key=True)
    uid = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    enrolled_course = models.ForeignKey(Course, on_delete=models.DO_NOTHING)
    status = models.CharField(max_length=15, choices=STATUSES, default=STATUSES["Enrolled"])