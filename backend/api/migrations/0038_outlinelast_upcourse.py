# Generated by Django 5.0.1 on 2024-05-20 12:57

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0037_outlinelast'),
    ]

    operations = [
        migrations.AddField(
            model_name='outlinelast',
            name='upCourse',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='api.course'),
        ),
    ]