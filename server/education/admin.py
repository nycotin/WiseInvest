from django.contrib import admin

from .models import Course, CourseItem, Favorite, Learning

# Register your models here.

class CourseAdmin(admin.ModelAdmin):
    list_display = ("id", "playlistId", "title", "itemCount")

class CourseItemAdmin(admin.ModelAdmin):
    list_display = ("id", "itemId", "courseId", "title")
    
class LearningAdmin(admin.ModelAdmin):
    list_display = ("id", "status")

admin.site.register(Course, CourseAdmin)
admin.site.register(CourseItem, CourseItemAdmin)
admin.site.register(Favorite)
admin.site.register(Learning, LearningAdmin)