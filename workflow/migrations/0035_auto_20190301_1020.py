# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2019-03-01 18:20
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


def associate_all_program_countries(apps, schema_editor):
    Program = apps.get_model('workflow', 'Program')
    Country = apps.get_model('workflow', 'Country')
    TolaUser = apps.get_model('workflow', 'TolaUser')
    ProgramAccess = apps.get_model('workflow', 'ProgramAccess')

    for user in TolaUser.objects.all():
        for program_access in user.programaccess_set.all():
            program = program_access.program
            if program.country.all().count() > 1:
                countries = list(program.country.all())
                program_access.country = countries.pop(0)
                program_access.save()
                for country in countries:
                    ProgramAccess(
                        tolauser=user,
                        program=program,
                        country=country,
                        role='low'
                    ).save()
            else:
                program_access.country = list(program.country.all())[0]
                program_access.save()

def deassociate_all_program_countries(apps, schema_editor):
    pass

def associate_all_staff_to_countries_and_remove_staff(apps, schema_editor):
    CountryAccess = apps.get_model('workflow', 'ProgramAccess')
    User = apps.get_model('auth', 'User')

    for auth_user in User.objects.filter(is_staff=True).exclude(tola_user__country__isnull=True):
        auth_user.is_staff = False
        auth_user.save()
        access = CountryAccess(tolauser=auth_user.tola_user, country=auth_user.tola_user.country)
        access.save()


class Migration(migrations.Migration):

    dependencies = [
        ('workflow', '0034_auto_20190301_0918'),
    ]

    operations = [
        migrations.AddField(
            model_name='programaccess',
            name='country',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='workflow.Country'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='programaccess',
            name='role',
            field=models.CharField(choices=[('low', 'Low'), ('medium', 'Medium'), ('high', 'High')], default='low', max_length=100),
        ),
        migrations.AlterUniqueTogether(
            name='programaccess',
            unique_together=set([('program', 'tolauser', 'country')]),
        ),
        migrations.RunPython(associate_all_program_countries, deassociate_all_program_countries),
        migrations.RunPython(associate_all_staff_to_countries_and_remove_staff),
    ]
