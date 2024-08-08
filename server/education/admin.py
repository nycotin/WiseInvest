from django.contrib import admin

from .models import Course, Thumbnail, CourseItem, Favorite, Learning

# Register your models here.

class CourseAdmin(admin.ModelAdmin):
    list_display = ("id", "playlistId", "title", "itemCount")

class CourseItemAdmin(admin.ModelAdmin):
    list_display = ("id", "itemId", "courseId", "title")

admin.site.register(Course, CourseAdmin)
admin.site.register(CourseItem, CourseItemAdmin)
admin.site.register(Thumbnail)
admin.site.register(Favorite)
admin.site.register(Learning)