# Generated by Django 5.0.4 on 2024-10-09 15:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('invest', '0007_transaction_total_expense_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='transaction',
            name='total_expense',
            field=models.DecimalField(decimal_places=2, max_digits=10),
        ),
    ]
