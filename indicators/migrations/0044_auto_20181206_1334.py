# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2018-12-06 21:34
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('indicators', '0043_auto_20181206_1326'),
    ]

    operations = [
        migrations.RenameField(
            model_name='indicator',
            old_name='lop_target',
            new_name='lop_target_new_thing',
        ),
    ]
