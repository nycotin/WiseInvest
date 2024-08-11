from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('courses', views.get_courses, name='get_courses'),
    path('courses/<int:courseId>', views.get_course_details, name='get_course_details'),


    path('seed_db', views.seed_db, name='seed_db')
]
