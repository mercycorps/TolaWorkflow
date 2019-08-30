# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2019-02-21 21:41
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('workflow', '0032_auto_20190127_1536'),
        ('tola_management', '0005_merge_20190212_1339'),
    ]

    operations = [
        migrations.CreateModel(
            name='OrganizationAdminAuditLog',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateTimeField(auto_now_add=True, verbose_name='Modification Date')),
                ('change_type', models.CharField(max_length=255, verbose_name='Modification Type')),
                ('previous_entry', models.TextField()),
                ('new_entry', models.TextField()),
                ('admin_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='+', to='workflow.TolaUser')),
                ('organization', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='+', to='workflow.Organization')),
            ],
        ),
    ]