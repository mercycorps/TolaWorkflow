# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2017-06-23 20:06
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('indicators', '0009_auto_20170601_0821'),
    ]

    operations = [
        migrations.AddField(
            model_name='historicalcollecteddata',
            name='history_change_reason',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='historicalindicator',
            name='history_change_reason',
            field=models.CharField(max_length=100, null=True),
        ),
    ]
