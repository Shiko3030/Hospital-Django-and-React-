# Generated by Django 5.0.6 on 2025-03-24 17:04

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_remove_useraccount_email_useraccount_username'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='useraccount',
            name='name',
        ),
    ]
