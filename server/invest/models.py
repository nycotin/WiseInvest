from django.db import models

from users.models import User

# Create your models here.

class StockExchange(models.Model):
    mic = models.CharField(primary_key=True, max_length=10)
    exchange_name = models.CharField(max_length=50)
    city = models.CharField(max_length=20)
    region = models.CharField(max_length=20)

class Stock(models.Model):    
    symbol = models.CharField(primary_key=True, max_length=20)
    company_name = models.CharField(max_length=50)
    exchange = models.ForeignKey(StockExchange, on_delete=models.DO_NOTHING)
    currency = models.CharField(max_length=10)
    currency_symbol = models.CharField(max_length=10)
    link = models.URLField(max_length=200)
    market_area = models.CharField(max_length=20)

class Transaction(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    stock = models.ForeignKey(Stock, on_delete=models.DO_NOTHING)
    price_on_purchase = models.DecimalField(decimal_places=2, max_digits=10)
    quantity = models.IntegerField()
    total_expense = models.DecimalField(decimal_places=2, max_digits=10)
    purchased_on = models.DateTimeField(auto_now_add=True, blank=True)

    def save(self, *args, **kwargs):
        self.total_expense = float(self.price_on_purchase) * float(self.quantity)
        super(Transaction, self).save(*args, **kwargs)