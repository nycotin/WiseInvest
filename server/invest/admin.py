from django.contrib import admin
from .models import Stock, UserStock

# Register your models here.

class StockAdmin(admin.ModelAdmin):
    list_display = ("id", "symbol", "name", "market", "link")

class UserStockAdmin(admin.ModelAdmin):
    list_display = ("id", "userId")
    

admin.site.register(Stock, StockAdmin)
admin.site.register(UserStock, UserStockAdmin)
