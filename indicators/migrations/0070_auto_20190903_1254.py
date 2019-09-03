# -*- coding: utf-8 -*-
# Generated by Django 1.11.21 on 2019-09-03 19:54
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tola_management', '0009_auto_20190903_1254'),
        ('indicators', '0069_merge_20190821_1922'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='disaggregationlabel',
            name='disaggregation_type',
        ),
        migrations.RemoveField(
            model_name='disaggregationtype',
            name='country',
        ),
        migrations.RemoveField(
            model_name='disaggregationvalue',
            name='disaggregation_label',
        ),
        migrations.RemoveField(
            model_name='externalservicerecord',
            name='external_service',
        ),
        migrations.RemoveField(
            model_name='historicalresult',
            name='agreement',
        ),
        migrations.RemoveField(
            model_name='historicalresult',
            name='approved_by',
        ),
        migrations.RemoveField(
            model_name='historicalresult',
            name='complete',
        ),
        migrations.RemoveField(
            model_name='historicalresult',
            name='evidence',
        ),
        migrations.RemoveField(
            model_name='historicalresult',
            name='history_user',
        ),
        migrations.RemoveField(
            model_name='historicalresult',
            name='indicator',
        ),
        migrations.RemoveField(
            model_name='historicalresult',
            name='periodic_target',
        ),
        migrations.RemoveField(
            model_name='historicalresult',
            name='program',
        ),
        migrations.RemoveField(
            model_name='historicalresult',
            name='tola_table',
        ),
        migrations.AlterUniqueTogether(
            name='indicator',
            unique_together=set([]),
        ),
        migrations.RemoveField(
            model_name='indicator',
            name='approval_submitted_by',
        ),
        migrations.RemoveField(
            model_name='indicator',
            name='approved_by',
        ),
        migrations.RemoveField(
            model_name='indicator',
            name='data_collection_frequency',
        ),
        migrations.RemoveField(
            model_name='indicator',
            name='disaggregation',
        ),
        migrations.RemoveField(
            model_name='indicator',
            name='external_service_record',
        ),
        migrations.RemoveField(
            model_name='indicator',
            name='indicator_type',
        ),
        migrations.RemoveField(
            model_name='indicator',
            name='level',
        ),
        migrations.RemoveField(
            model_name='indicator',
            name='objectives',
        ),
        migrations.RemoveField(
            model_name='indicator',
            name='program',
        ),
        migrations.RemoveField(
            model_name='indicator',
            name='reporting_frequency',
        ),
        migrations.RemoveField(
            model_name='indicator',
            name='sector',
        ),
        migrations.RemoveField(
            model_name='indicator',
            name='strategic_objectives',
        ),
        migrations.AlterUniqueTogether(
            name='level',
            unique_together=set([]),
        ),
        migrations.RemoveField(
            model_name='level',
            name='parent',
        ),
        migrations.RemoveField(
            model_name='level',
            name='program',
        ),
        migrations.AlterUniqueTogether(
            name='leveltier',
            unique_together=set([]),
        ),
        migrations.RemoveField(
            model_name='leveltier',
            name='program',
        ),
        migrations.RemoveField(
            model_name='leveltiertemplate',
            name='program',
        ),
        migrations.RemoveField(
            model_name='objective',
            name='program',
        ),
        migrations.AlterUniqueTogether(
            name='periodictarget',
            unique_together=set([]),
        ),
        migrations.RemoveField(
            model_name='periodictarget',
            name='indicator',
        ),
        migrations.RemoveField(
            model_name='pinnedreport',
            name='program',
        ),
        migrations.RemoveField(
            model_name='pinnedreport',
            name='tola_user',
        ),
        migrations.RemoveField(
            model_name='reportingperiod',
            name='frequency',
        ),
        migrations.RemoveField(
            model_name='result',
            name='agreement',
        ),
        migrations.RemoveField(
            model_name='result',
            name='approved_by',
        ),
        migrations.RemoveField(
            model_name='result',
            name='complete',
        ),
        migrations.RemoveField(
            model_name='result',
            name='disaggregation_value',
        ),
        migrations.RemoveField(
            model_name='result',
            name='evidence',
        ),
        migrations.RemoveField(
            model_name='result',
            name='indicator',
        ),
        migrations.RemoveField(
            model_name='result',
            name='periodic_target',
        ),
        migrations.RemoveField(
            model_name='result',
            name='program',
        ),
        migrations.RemoveField(
            model_name='result',
            name='site',
        ),
        migrations.RemoveField(
            model_name='result',
            name='tola_table',
        ),
        migrations.RemoveField(
            model_name='strategicobjective',
            name='country',
        ),
        migrations.RemoveField(
            model_name='tolatable',
            name='country',
        ),
        migrations.RemoveField(
            model_name='tolatable',
            name='owner',
        ),
        migrations.DeleteModel(
            name='IPTTIndicator',
        ),
        migrations.DeleteModel(
            name='MetricsIndicator',
        ),
        migrations.DeleteModel(
            name='ProgramWithMetrics',
        ),
        migrations.DeleteModel(
            name='ResultsIndicator',
        ),
        migrations.DeleteModel(
            name='ResultsTarget',
        ),
        migrations.DeleteModel(
            name='DataCollectionFrequency',
        ),
        migrations.DeleteModel(
            name='DisaggregationLabel',
        ),
        migrations.DeleteModel(
            name='DisaggregationType',
        ),
        migrations.DeleteModel(
            name='DisaggregationValue',
        ),
        migrations.DeleteModel(
            name='ExternalService',
        ),
        migrations.DeleteModel(
            name='ExternalServiceRecord',
        ),
        migrations.DeleteModel(
            name='HistoricalResult',
        ),
        migrations.DeleteModel(
            name='Indicator',
        ),
        migrations.DeleteModel(
            name='IndicatorType',
        ),
        migrations.DeleteModel(
            name='Level',
        ),
        migrations.DeleteModel(
            name='LevelTier',
        ),
        migrations.DeleteModel(
            name='LevelTierTemplate',
        ),
        migrations.DeleteModel(
            name='Objective',
        ),
        migrations.DeleteModel(
            name='PeriodicTarget',
        ),
        migrations.DeleteModel(
            name='PinnedReport',
        ),
        migrations.DeleteModel(
            name='ReportingFrequency',
        ),
        migrations.DeleteModel(
            name='ReportingPeriod',
        ),
        migrations.DeleteModel(
            name='Result',
        ),
        migrations.DeleteModel(
            name='StrategicObjective',
        ),
        migrations.DeleteModel(
            name='TolaTable',
        ),
    ]