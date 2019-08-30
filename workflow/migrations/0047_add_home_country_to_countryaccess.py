# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2019-05-09 15:44
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('workflow', '0046_fill_tolauser_username_field'),
    ]

    operations = [
        migrations.AlterField(
            model_name='countryaccess',
            name='role',
            field=models.CharField(choices=[('user', 'User (all programs)'), ('basic_admin', 'Basic Admin (all programs)')], default='user', max_length=100),
        ),
    ]