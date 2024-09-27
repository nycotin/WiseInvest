from django.db import models
from users.models import User

# Create your models here.

class Stock(models.Model):
    MARKETS = {
        "us": "us",
        "europe": "europe",
        "asia": "asia"
    }

    id = models.AutoField(primary_key=True)
    symbol = models.CharField(max_length=20)
    name = models.CharField(max_length=50)
    market = models.CharField(max_length=50, choices=MARKETS)
    link = models.URLField(max_length=150)


class UserStock(models.Model):

    id = models.AutoField(primary_key=True)
    userId = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    stock = models.ManyToManyField(Stock) # "stock" symbol from serapiApi
    priceOnPurchase = models.IntegerField()
    quantity = models.IntegerField()