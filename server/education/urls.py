from django.urls import path

from . import views

urlpatterns = [
    path('courses', views.get_courses, name='get_courses'),
    path('courses/<int:courseId>', views.get_course_details, name='get_course_details'),
    path('courses/<int:courseId>/toggle-favorite', views.toggle_favorite, name='toggle_favorite'),
    path('courses/<int:courseId>/toggle-enroll', views.toggle_enroll, name='toggle_enroll'),
    path('courses/get-favorites', views.get_user_favorites, name='get_user_favorites'),
    path('courses/get-learning', views.get_user_learning, name='get_user_learning'),
    path('courses/<int:courseId>/edit-status', views.edit_course_status, name='edit_course_status'),

    path('seed_db', views.seed_db, name='seed_db')
]
