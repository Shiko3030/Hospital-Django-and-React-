# Generated by Django 5.0.6 on 2025-03-22 10:51

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hospital', '0015_remove_appointment_appointment_type_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='employee',
            old_name='specialization',
            new_name='specialty',
        ),
        migrations.RemoveField(
            model_name='employee',
            name='hire_date',
        ),
        migrations.RemoveField(
            model_name='employee',
            name='job_type',
        ),
        migrations.RemoveField(
            model_name='employee',
            name='name',
        ),
        migrations.RemoveField(
            model_name='employee',
            name='national_id',
        ),
        migrations.RemoveField(
            model_name='employee',
            name='phone',
        ),
        migrations.AddField(
            model_name='employee',
            name='first_name',
            field=models.CharField(default=1, max_length=50),
        ),
        migrations.AddField(
            model_name='employee',
            name='hospital',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='hospital.hospital'),
        ),
        migrations.AddField(
            model_name='employee',
            name='job',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='hospital.jobtype'),
        ),
        migrations.AddField(
            model_name='employee',
            name='last_name',
            field=models.CharField(default=1, max_length=50),
        ),
        migrations.AddField(
            model_name='employee',
            name='license_number',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='employee',
            name='department',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='hospital.department'),
        ),
    ]
