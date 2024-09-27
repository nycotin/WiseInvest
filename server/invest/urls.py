from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('seed-stocks', views.seedStocks, name="seed-stocks")
    
]
