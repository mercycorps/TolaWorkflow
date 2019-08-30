# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2018-11-08 20:33
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion

def fix_old_multi_level_indicators(apps, schema_editor):
    """ clear any indicators with multiple levels assigned"""
    Indicator = apps.get_model('indicators', 'Indicator')
    for indicator in Indicator.objects.all():
        if indicator.level.count() > 1:
            indicator.level.clear()

def set_temp_level_id(apps, schema_editor):
    Indicator = apps.get_model('indicators', 'Indicator')
    for indicator in Indicator.objects.all():
        if indicator.level.count() == 0:
            level_id = None
        else:
            level_id = indicator.level.first().id
        indicator.level_temp = level_id
        indicator.save()

def move_temp_level_id(apps, schema_editor):
    Indicator = apps.get_model('indicators', 'Indicator')
    for indicator in Indicator.objects.all():
        indicator.level_id = indicator.level_temp
        indicator.save()


class Migration(migrations.Migration):

    dependencies = [
        ('indicators', '0035_make_indicators_programs_foreignkey'),
    ]
    # cleanup (removed help text from foreign key):
    operations = [
        migrations.RunPython(fix_old_multi_level_indicators),
        migrations.AlterField(
            model_name='indicator',
            name='program',
            field=models.ForeignKey(
                blank=True, null=True,
                on_delete=django.db.models.deletion.CASCADE,
                to='workflow.Program', verbose_name='Program'),
        ),
        # add historical item:
        migrations.AddField(
            model_name='historicalindicator',
            name='level',
            field=models.ForeignKey(
                blank=True, db_constraint=False, null=True,
                on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to='indicators.Level'),
        ),
        # first add a temp field to hold the foreign key
        migrations.AddField(
            model_name='indicator',
            name='level_temp',
            field=models.IntegerField(
                null=True, blank=True,
                verbose_name='Level Temp'),
            preserve_default=False,
        ),
        # put the value of the level the indicator is assigned to there
        migrations.RunPython(set_temp_level_id),
        migrations.RemoveField(
            model_name='indicator',
            name='level',
        ),
        migrations.AddField(
            model_name='indicator',
            name='level',
            field=models.ForeignKey(
                blank=True, null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                to='indicators.Level', verbose_name='Level'),
        ),
        # copy the temp key over
        migrations.RunPython(move_temp_level_id),
        migrations.RemoveField(
            model_name='indicator',
            name='level_temp',
        ),
    ]