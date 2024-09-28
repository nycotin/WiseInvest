from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('get-live-stocks', views.get_live_stocks, name="get-live-stocks"),
    path('get-user-stocks', views.get_user_stocks, name="get-user-stocks"),


    path('seed-stocks', views.seedStocks, name="seed-stocks")
]
