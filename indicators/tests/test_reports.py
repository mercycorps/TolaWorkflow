from datetime import datetime
from django.test import TestCase, Client
from indicators.models import Indicator
from indicators.views.views_reports import IPTT_Mixin


class IpttQuickstartTest(TestCase):

    def setup(self):
        self.client = Client()
        self.mixin = IPTT_Mixin()

    def test_page_load_returns_200(self):
        response = self.client.get('/indicators/iptt_quickstart/', follow=True)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.redirect_chain), 0)

    def test_page_loads_correct_template(self):
        response = self.client.get('/indicators/iptt_quickstart/')
        self.assertTemplateUsed('indicators/iptt_quickstart.html')
        self.assertContains(response, 'Indicator Performance Tracking Table')

    # def test_get_num_months_in_date_range(self):
    #     mixin = IPTT_Mixin()

    def test_get_num_months_annual(self):
        mixin = IPTT_Mixin()
        num_months_in_period = mixin._get_num_months(Indicator.ANNUAL)
        self.assertEqual(num_months_in_period, 12)

        todays_date = datetime.today().date()
        _get_first_period = mixin._get_first_period(todays_date, num_months_in_period)
        self.assertLessEqual(_get_first_period, todays_date)

        # The 2016 start date includes leap year in the range
        start_date = datetime.strptime("2016-01-22", "%Y-%m-%d").date()
        end_date = datetime.strptime("2018-12-31", "%Y-%m-%d").date()

        _get_num_periods = mixin._get_num_periods(start_date, end_date, Indicator.ANNUAL)
        self.assertEqual(_get_num_periods, 3)

    def test_get_num_months_semiannual(self):
        mixin = IPTT_Mixin()
        num_months_in_period = mixin._get_num_months(Indicator.SEMI_ANNUAL)
        self.assertEqual(num_months_in_period, 6)

        todays_date = datetime.today().date()
        _get_first_period = mixin._get_first_period(todays_date, num_months_in_period)
        self.assertLessEqual(_get_first_period, todays_date)

    def test_get_num_months_triannual(self):
        mixin = IPTT_Mixin()
        num_months_in_period = mixin._get_num_months(Indicator.TRI_ANNUAL)
        self.assertEqual(num_months_in_period, 4)

        todays_date = datetime.today().date()
        _get_first_period = mixin._get_first_period(todays_date, num_months_in_period)
        self.assertLessEqual(_get_first_period, todays_date)

    def test_get_num_months_quarterly(self):
        mixin = IPTT_Mixin()
        num_months_in_period = mixin._get_num_months(Indicator.QUARTERLY)
        self.assertEqual(num_months_in_period, 3)

        todays_date = datetime.today().date()
        _get_first_period = mixin._get_first_period(todays_date, num_months_in_period)
        self.assertLessEqual(_get_first_period, todays_date, )

    def test_get_num_months_monthly(self):
        mixin = IPTT_Mixin()
        num_months_in_period = mixin._get_num_months(Indicator.MONTHLY)
        self.assertEqual(num_months_in_period, 1)

        todays_date = datetime.today().date()
        _get_first_period = mixin._get_first_period(todays_date, num_months_in_period)
        self.assertLessEqual(_get_first_period, todays_date)

    def test_get_num_periods(self):
        start_date = datetime.strptime("2016-01-01", "%Y-%m-%d").date()
        end_date = datetime.strptime("2016-12-31", "%Y-%m-%d").date()

        self.assertEqual(IPTT_Mixin._get_num_periods(start_date, end_date, Indicator.ANNUAL), 1)
        self.assertEqual(IPTT_Mixin._get_num_periods(start_date, end_date, Indicator.SEMI_ANNUAL), 2)
        self.assertEqual(IPTT_Mixin._get_num_periods(start_date, end_date, Indicator.TRI_ANNUAL), 3)
        self.assertEqual(IPTT_Mixin._get_num_periods(start_date, end_date, Indicator.QUARTERLY), 4)
        self.assertEqual(IPTT_Mixin._get_num_periods(start_date, end_date, Indicator.MONTHLY), 12)

    def test_get_num_periods_rejects_reversed_date_range(self):
        start_date = datetime.strptime("2016-12-31", "%Y-%m-%d").date()
        end_date = datetime.strptime("2016-01-01", "%Y-%m-%d").date()

        self.assertEqual(IPTT_Mixin._get_num_periods(start_date, end_date, Indicator.ANNUAL), 0)
        self.assertEqual(IPTT_Mixin._get_num_periods(start_date, end_date, Indicator.SEMI_ANNUAL), 0)
        self.assertEqual(IPTT_Mixin._get_num_periods(start_date, end_date, Indicator.TRI_ANNUAL), 0)
        self.assertEqual(IPTT_Mixin._get_num_periods(start_date, end_date, Indicator.QUARTERLY), 0)
        self.assertEqual(IPTT_Mixin._get_num_periods(start_date, end_date, Indicator.MONTHLY), 0)

    def test_get_period_names(self):
        self.assertEqual(IPTT_Mixin._get_period_name(Indicator.ANNUAL), "Year")
        self.assertEqual(IPTT_Mixin._get_period_name(Indicator.SEMI_ANNUAL), "Semi-annual")
        self.assertEqual(IPTT_Mixin._get_period_name(Indicator.TRI_ANNUAL), "Tri-annual")
        self.assertEqual(IPTT_Mixin._get_period_name(Indicator.QUARTERLY), "Quarter")
        self.assertEqual(IPTT_Mixin._get_period_name(Indicator.MONTHLY), "Month")

    def test_get_first_period_annual(self):
        mixin = IPTT_Mixin()

        real_start_date = datetime.strptime("2016-02-29", "%Y-%m-%d").date()
        period_start_date = datetime.strptime("2016-01-01", "%Y-%m-%d").date()
        ret = mixin._get_num_months(Indicator.ANNUAL)
        _get_first_period = mixin._get_first_period(real_start_date, ret)
        self.assertEqual(_get_first_period, period_start_date, "Annual")

    def test_get_first_period_semiannual(self):
        mixin = IPTT_Mixin()

        real_start_date = datetime.strptime("2016-02-29", "%Y-%m-%d").date()
        period_start_date = datetime.strptime("2016-01-01", "%Y-%m-%d").date()
        ret = mixin._get_num_months(Indicator.SEMI_ANNUAL)
        _get_first_period = mixin._get_first_period(real_start_date, ret)
        self.assertEqual(_get_first_period, period_start_date, '')

        real_start_date = datetime.strptime("2016-07-15", "%Y-%m-%d").date()
        period_start_date = datetime.strptime("2016-07-01", "%Y-%m-%d").date()
        _get_first_period = mixin._get_first_period(real_start_date, ret)
        self.assertEqual(_get_first_period, period_start_date, "Semi-annual")

    def test_get_first_period_triannual(self):
        mixin = IPTT_Mixin()

        real_start_date = datetime.strptime("2016-02-29", "%Y-%m-%d").date()
        period_start_date = datetime.strptime("2016-01-01", "%Y-%m-%d").date()
        ret = mixin._get_num_months(Indicator.TRI_ANNUAL)
        _get_first_period = mixin._get_first_period(real_start_date, ret)
        self.assertEqual(_get_first_period, period_start_date, "Tri-annual")

        real_start_date = datetime.strptime("2016-05-31", "%Y-%m-%d").date()
        period_start_date = datetime.strptime("2016-05-01", "%Y-%m-%d").date()
        _get_first_period = mixin._get_first_period(real_start_date, ret)
        self.assertEqual(_get_first_period, period_start_date, "Tri-annual")

        real_start_date = datetime.strptime("2016-09-15", "%Y-%m-%d").date()
        period_start_date = datetime.strptime("2016-09-01", "%Y-%m-%d").date()
        _get_first_period = mixin._get_first_period(real_start_date, ret)
        self.assertEqual(_get_first_period, period_start_date, "Tri-annual")

    def test_get_first_period_quarterly(self):
        mixin = IPTT_Mixin()

        real_start_date = datetime.strptime("2016-02-29", "%Y-%m-%d").date()
        period_start_date = datetime.strptime("2016-01-01", "%Y-%m-%d").date()
        ret = mixin._get_num_months(Indicator.QUARTERLY)
        _get_first_period = mixin._get_first_period(real_start_date, ret)
        self.assertEqual(_get_first_period, period_start_date, "Quarterly")

        real_start_date = datetime.strptime("2016-04-15", "%Y-%m-%d").date()
        period_start_date = datetime.strptime("2016-04-01", "%Y-%m-%d").date()
        _get_first_period = mixin._get_first_period(real_start_date, ret)
        self.assertEqual(_get_first_period, period_start_date, "Quarterly")

        real_start_date = datetime.strptime("2016-07-04", "%Y-%m-%d").date()
        period_start_date = datetime.strptime("2016-07-01", "%Y-%m-%d").date()
        _get_first_period = mixin._get_first_period(real_start_date, ret)
        self.assertEqual(_get_first_period, period_start_date, "Quarterly")

        real_start_date = datetime.strptime("2016-10-31", "%Y-%m-%d").date()
        period_start_date = datetime.strptime("2016-10-01", "%Y-%m-%d").date()
        _get_first_period = mixin._get_first_period(real_start_date, ret)
        self.assertEqual(_get_first_period, period_start_date, "Quarterly")

    def test_get_first_period_monthly(self):
        mixin = IPTT_Mixin()

        real_start_date = datetime.strptime("2016-02-29", "%Y-%m-%d").date()
        period_start_date = datetime.strptime("2016-02-01", "%Y-%m-%d").date()
        ret = mixin._get_num_months(Indicator.MONTHLY)
        _get_first_period = mixin._get_first_period(real_start_date, ret)
        self.assertEqual(_get_first_period, period_start_date, "Monthly")
