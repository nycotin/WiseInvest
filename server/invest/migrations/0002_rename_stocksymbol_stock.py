# Generated by Django 5.0.4 on 2024-09-27 21:03

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('invest', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='StockSymbol',
            new_name='Stock',
        ),
    ]
