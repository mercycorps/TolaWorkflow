# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2019-04-23 18:12
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('workflow', '0042_auto_20190418_1245'),
    ]

    operations = [
        migrations.AlterField(
            model_name='programaccess',
            name='role',
            field=models.CharField(choices=[('low', 'Low (view only)'), ('medium', 'Medium (add and edit results)'), ('high', 'High (edit anything)')], default='low', max_length=100),
        ),
    ]
