# Generated by Django 5.0.6 on 2025-03-17 23:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hospital', '0004_alter_appointment_appointment_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appointment',
            name='appointment_date',
            field=models.DateField(),
        ),
        migrations.AlterField(
            model_name='operation',
            name='operation_date',
            field=models.DateField(),
        ),
    ]
