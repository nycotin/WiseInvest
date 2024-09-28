from django.contrib import admin
from .models import Stock, UserStock

# Register your models here.

class StockAdmin(admin.ModelAdmin):
    list_display = ("id", "symbol", "name", "market", "link")

class UserStockAdmin(admin.ModelAdmin):
    list_display = ("id", "user_id", "stock_id", "price_on_purchase", "quantity")
    

admin.site.register(Stock, StockAdmin)
admin.site.register(UserStock, UserStockAdmin)
