# Generated by Django 5.0.6 on 2025-03-22 03:51

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hospital', '0014_rename_name_department_department_name'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='appointment',
            name='appointment_type',
        ),
        migrations.AddField(
            model_name='appointment',
            name='hospital',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='hospital.hospital'),
        ),
        migrations.AlterField(
            model_name='appointment',
            name='appointment_date',
            field=models.DateTimeField(),
        ),
        migrations.AlterField(
            model_name='appointment',
            name='department',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='hospital.department'),
        ),
        migrations.AlterField(
            model_name='appointment',
            name='doctor',
            field=models.ForeignKey(default=1, limit_choices_to={'job__job_name': 'Doctor'}, null=True, on_delete=django.db.models.deletion.SET_NULL, to='hospital.employee'),
        ),
    ]
