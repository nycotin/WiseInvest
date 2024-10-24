from django.contrib import admin

from .models import StockExchange, Stock, Transaction

# Register your models here.

class StockExchangeAdmin(admin.ModelAdmin):
    list_display = ("mic", "exchange_name", "city", "region")

class StockAdmin(admin.ModelAdmin):
    list_display = ("symbol", "company_name", "market_area", "exchange", "currency", "link")

class TransactionAdmin(admin.ModelAdmin):
    list_display = ("user", "stock", "price_on_purchase", "quantity", "purchased_on")
    

admin.site.register(StockExchange, StockExchangeAdmin)
admin.site.register(Transaction, TransactionAdmin)
admin.site.register(Stock, StockAdmin)