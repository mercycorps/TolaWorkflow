# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2019-02-28 21:56
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('workflow', '0024_remove_qmark_from_verbose_name'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='organization',
            name='level_1_label',
        ),
        migrations.RemoveField(
            model_name='organization',
            name='level_2_label',
        ),
        migrations.RemoveField(
            model_name='organization',
            name='level_3_label',
        ),
        migrations.RemoveField(
            model_name='organization',
            name='level_4_label',
        ),
    ]