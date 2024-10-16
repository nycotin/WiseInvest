# Generated by Django 5.0.4 on 2024-09-27 16:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('education', '0007_favorite_userid_learning_uid'),
    ]

    operations = [
        migrations.AlterField(
            model_name='learning',
            name='status',
            field=models.CharField(choices=[('Enrolled', 'Enrolled'), ('In Progress', 'In Progress'), ('Completed', 'Completed')], default='Enrolled', max_length=15),
        ),
    ]