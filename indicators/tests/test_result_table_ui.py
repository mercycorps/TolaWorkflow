# -*- coding: utf-8 -*-
"""
Test result table view for common regressions
"""
import datetime
from mock import patch

from django import test
from django.urls import reverse_lazy

from factories import (
    ProgramFactory,
    IndicatorFactory,
    ResultFactory,
    PeriodicTargetFactory,
    UserFactory,
    TolaUserFactory
)
from indicators.models import Indicator


class TestResultUnassignedUIDateFallsOutsideProgramPeriod(test.TestCase):
    """
    A result is unassigned because its "date collected" falls outside of the program period AND targets are time-aware

    When a result is unassigned because its "date collected" falls outside of the program period AND
    targets are time-aware, the following are true:

    1. The result is displayed in the table underneath the target period rows.
    2. Under the table, we display error message: This date falls outside the range of your target periods.
       Please select a date between [localized program start date] and [localized program end date].
    """

    def setUp(self):
        self.program = ProgramFactory(
            reporting_period_start=datetime.date(2018, 1, 1),
            reporting_period_end=datetime.date(2019, 1, 1),
        )
        self.indicator = IndicatorFactory(
            program=self.program,
            target_frequency=Indicator.ANNUAL,
        )
        PeriodicTargetFactory(
            indicator=self.indicator,
            start_date=datetime.date(2018, 1, 1),
            end_date=datetime.date(2018, 12, 31),
        )
        self.result = ResultFactory(
            indicator=self.indicator,
            date_collected=datetime.date(2017, 1, 1),
            achieved=42,
            record_name='My Test Record',
            evidence_url='http://my_evidence_url',
        )
        self.user = UserFactory(first_name="FN", last_name="LN", username="tester", is_superuser=True)
        self.user.set_password('password')
        self.user.save()
        self.tola_user = TolaUserFactory(user=self.user)
        self.client.login(username='tester', password='password')

    @patch('webpack_loader.loader.WebpackLoader.get_bundle')
    def test_result_table_html(self, webpack_mock):
        url = reverse_lazy('result_view', args=[self.indicator.id,])
        response = self.client.get(url)
        # result is displayed
        self.assertContains(
            response,
            'Jan 1, 2017',
        )
        # only 1 expected now as no longer displaying the value for unassigned indicators
        self.assertContains(response, '42', count=1, msg_prefix=response.content.decode('utf-8'))
        # expected warning message
        self.assertContains(
            response,
            'This date falls outside the range of your target periods. Please select a date between Jan 1, 2018 and Jan 1, 2019.'
        )


class TestResultUnassignedUITargetsMidlineEndline(test.TestCase):
    """
    A result is unassigned because its "date collected" falls outside of the program period AND
    targets are midline/endline or event

    When a result is unassigned AND targets are Midline/Endline or Event, the following are true:

    1. The result is displayed in the table.
    2. Under the table, we display error message: This record is not associated with a target.
       Open the data record and select an option from the "Measure against target" menu.
    """

    def setUp(self):
        self.program = ProgramFactory(
            reporting_period_start=datetime.date(2018, 1, 1),
            reporting_period_end=datetime.date(2019, 1, 1),
        )
        self.indicator = IndicatorFactory(
            program=self.program,
            target_frequency=Indicator.MID_END,
        )
        PeriodicTargetFactory(
            indicator=self.indicator,
            start_date=datetime.date(2018, 1, 1),
            end_date=datetime.date(2018, 12, 31),
        )
        self.result = ResultFactory(
            indicator=self.indicator,
            date_collected=datetime.date(2017, 1, 1),
            achieved=42,
            record_name='My Test Record',
            evidence_url='http://my_evidence_url',
        )
        self.user = UserFactory(first_name="FN", last_name="LN", username="tester", is_superuser=True)
        self.user.set_password('password')
        self.user.save()
        self.tola_user = TolaUserFactory(user=self.user)
        self.client.login(username='tester', password='password')

    @patch('webpack_loader.loader.WebpackLoader.get_bundle')
    def test_result_table_html(self, webpack_mock):
        url = reverse_lazy('result_view', args=[self.indicator.id,])
        response = self.client.get(url)
        # result is displayed
        self.assertContains(
            response,
            'Jan 1, 2017',
        )
        self.assertContains(response, '42', count=1, msg_prefix=response.content.decode('utf-8'))
        # expected warning message
        self.assertContains(
            response,
            'This record is not associated with a target. Open the data record and select an option from the “Measure against target” menu.'
        )


class TestResultUnassignedUITargetsNotSetup(test.TestCase):
    """
    When a result is unassigned because no targets are set up, the following are true:

    1. The result is displayed in the table.
    2. Under the table, we display error message: Targets are not set up for this indicator. Start by selecting a target frequency.
    3. The string "Start by selecting a target frequency" links to the Targets tab of the indicator setup form.
    """

    def setUp(self):
        self.program = ProgramFactory(
            reporting_period_start=datetime.date(2018, 1, 1),
            reporting_period_end=datetime.date(2019, 1, 1),
        )
        self.indicator = IndicatorFactory(
            program=self.program,
            target_frequency=Indicator.MID_END,
        )
        self.result = ResultFactory(
            indicator=self.indicator,
            date_collected=datetime.date(2017, 1, 1),
            achieved=42,
            record_name='My Test Record',
            evidence_url='http://my_evidence_url',
        )
        self.user = UserFactory(first_name="FN", last_name="LN", username="tester", is_superuser=True)
        self.user.set_password('password')
        self.user.save()
        self.tola_user = TolaUserFactory(user=self.user)
        self.client.login(username='tester', password='password')

    @patch('webpack_loader.loader.WebpackLoader.get_bundle')
    def test_result_table_html(self, webpack_mock):
        url = reverse_lazy('result_view', args=[self.indicator.id,])
        response = self.client.get(url)
        # result is displayed
        self.assertContains(
            response,
            'Jan 1, 2017',
        )
        self.assertContains(response, '42', count=1, msg_prefix=response.content.decode('utf-8'))
        # expected warning message
        self.assertContains(
            response,
            'Targets are not set up for this indicator.'
        )
        self.assertContains(
            response,
            'Start by selecting a target frequency.'
        )
