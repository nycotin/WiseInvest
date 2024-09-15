# Generated by Django 5.0.4 on 2024-08-15 15:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('education', '0003_rename_favorites_favorite_alter_course_description_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='thumbnail',
            name='height',
        ),
        migrations.RemoveField(
            model_name='thumbnail',
            name='width',
        ),
        migrations.AlterField(
            model_name='course',
            name='player',
            field=models.CharField(max_length=500),
        ),
        migrations.AlterField(
            model_name='courseitem',
            name='thumbnail',
            field=models.URLField(max_length=50),
        ),
    ]