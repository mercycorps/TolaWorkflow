# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2019-01-21 00:46
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('workflow', '0027_tolausercountryroles_tolauserprogramroles'),
    ]

    operations = [
        migrations.AddField(
            model_name='organization',
            name='mode_of_contact',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Primary Mode of Contact'),
        ),
        migrations.AddField(
            model_name='organization',
            name='primary_address',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Primary Address'),
        ),
        migrations.AddField(
            model_name='organization',
            name='primary_contact_email',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Primary Contact Email'),
        ),
        migrations.AddField(
            model_name='organization',
            name='primary_contact_name',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Primary Contact Name'),
        ),
        migrations.AddField(
            model_name='organization',
            name='primary_contact_phone',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Primary Contact Phone'),
        ),
    ]