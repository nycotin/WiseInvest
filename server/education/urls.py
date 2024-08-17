from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('courses', views.get_courses, name='get_courses'),
    path('courses/<int:courseId>', views.get_course_details, name='get_course_details'),
    path('courses/<int:courseId>/toggle-favorite', views.toggle_favorite, name='toggle_favorite'),
    path('courses/<int:courseId>/toggle-enroll', views.toggle_enroll, name='toggle_enroll'),
    path('courses/user-<int:userId>', views.get_user_courses, name='get_user_courses'),


    path('seed_db', views.seed_db, name='seed_db')
]
