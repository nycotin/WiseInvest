from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('get-stocks', views.get_stocks, name='get-stocks'),
    path('get-transactions', views.get_transactions, name='get-transactions'),
    path('get-portfolio', views.get_portfolio, name='get-portfolio'),
    path('get-current-price/<str:stock_symbol>', views.get_current_price, name='get-current-price'),


    path('seed-db', views.seedDB, name="seed-db")
]
