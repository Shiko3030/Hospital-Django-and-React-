# Generated by Django 5.0.6 on 2025-03-12 12:58

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('hospital', '0002_remove_department_description_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='employee',
            name='user',
        ),
    ]
