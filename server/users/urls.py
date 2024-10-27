from django.urls import path

from . import views

urlpatterns = [
    path('login', views.login_view, name='login_view'),
    path('logout', views.logout_view, name='logout_view'),
    path('register', views.register_view, name='register_view'),
    path('get-userprofile', views.get_user_profile, name='get_user_profile'),
    path('edit-userprofile', views.edit_user_profile, name='edit_user_profile')
]