from django.urls import path

from . import views

urlpatterns = [
    path('login', views.login_view, name='login_view'),
    path('logout', views.logout_view, name='logout_view'),
    path('register', views.register_view, name='register_view'),
    path('userprofile', views.user_profile, name='user_profile'),
    path('userprofile/edit', views.update_user_profile, name='update_user_profile')
]
