# Generated by Django 5.0.4 on 2024-08-15 15:07

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('education', '0004_remove_thumbnail_height_remove_thumbnail_width_and_more'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Thumbnail',
        ),
    ]
