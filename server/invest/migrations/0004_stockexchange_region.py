# Generated by Django 5.0.4 on 2024-10-04 13:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('invest', '0003_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='stockexchange',
            name='region',
            field=models.CharField(default=None, max_length=20),
            preserve_default=False,
        ),
    ]
