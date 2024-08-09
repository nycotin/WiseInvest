from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),


    path('seed_db', views.seed_db, name='seed_db')
]
