# -*- coding: utf-8 -*-
# Generated by Django 1.11.21 on 2019-06-24 15:40
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('indicators', '0062_merge_20190614_1923'),
    ]

    operations = [
        migrations.AlterField(
            model_name='level',
            name='customsort',
            field=models.IntegerField(blank=True, null=True, verbose_name='Sort order'),
        ),
    ]
