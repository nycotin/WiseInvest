# Generated by Django 5.0.4 on 2024-08-08 16:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('education', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='course',
            name='cover',
            field=models.URLField(max_length=50),
        ),
    ]
