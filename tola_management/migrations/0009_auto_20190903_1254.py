# -*- coding: utf-8 -*-
# Generated by Django 1.11.21 on 2019-09-03 19:54
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tola_management', '0008_programauditlog_level'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='programauditlog',
            name='indicator',
        ),
        migrations.RemoveField(
            model_name='programauditlog',
            name='level',
        ),
    ]
