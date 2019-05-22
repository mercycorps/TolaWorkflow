import json
import logging
import re
from datetime import datetime, timedelta
import dateparser
import requests
from weasyprint import HTML, CSS

from django.contrib import messages
from django.core import serializers
from django.core.serializers.json import DjangoJSONEncoder
from django.core.urlresolvers import reverse_lazy
from django.core.exceptions import PermissionDenied
from django.db import connection, transaction
from django.db.models import (
    Count, Q, Sum, Avg, Max
)
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render, render_to_response, get_object_or_404, redirect, reverse
from django.template.loader import render_to_string
from django.utils import timezone
from django.utils.decorators import method_decorator
from django.utils.translation import gettext as _
from django.views.generic import TemplateView
from django.views.generic.detail import View
from django.views.generic.edit import CreateView, DeleteView, UpdateView
from django.views.generic.list import ListView

from feed.serializers import FlatJsonSerializer
from tola.util import getCountry, group_excluded

from indicators.serializers import IndicatorSerializer, ProgramSerializer
from indicators.views.view_utils import (
    import_indicator,
    generate_periodic_targets,
    generate_periodic_target_single,
    dictfetchall
)
from workflow.models import (
    Program, Sector, TolaSites, FormGuidance
)
from ..forms import IndicatorForm, ResultForm, PTFormInputsForm
from ..models import (
    Indicator, PeriodicTarget, DisaggregationLabel, DisaggregationValue,
    Result, IndicatorType, Level, ExternalServiceRecord,
    ExternalService, TolaTable, PinnedReport
)
from indicators.queries import ProgramWithMetrics, ResultsIndicator
from .views_reports import IPTT_ReportView

from tola_management.models import (
    ProgramAuditLog
)

from tola_management.permissions import (
    indicator_pk_adapter,
    indicator_adapter,
    periodic_target_pk_adapter,
    has_indicator_read_access,
    has_indicator_write_access,
    result_pk_adapter,
    has_result_read_access,
    has_result_write_access,
    has_program_read_access,
    verify_program_access_level_of_any_program,
    verify_program_access_level
)

import indicators.indicator_plan as ip

logger = logging.getLogger(__name__)


# INDICATOR VIEWS:

@login_required
@has_indicator_write_access
def periodic_targets_form(request, program):
    """
    Returns a form for the periodic targets sub-section,
    used by the Indicator Form

    For historical reasons, the input is a POST of the whole indicator form sent via ajax
    from which a subset of fields are used to generate the returned template
    """
    if not request.has_write_access:
        raise PermissionDenied

    program = get_object_or_404(Program, pk=program)

    form = PTFormInputsForm(data=request.POST)

    if not form.is_valid():
        return JsonResponse(form.errors)

    event_name = ''
    start_date = ''
    target_frequency_num_periods = 1
    target_frequency_type = form.cleaned_data.get('target_frequency', 1)

    if target_frequency_type in Indicator.REGULAR_TARGET_FREQUENCIES:
        start_date = program.reporting_period_start
        target_frequency_num_periods = IPTT_ReportView._get_num_periods(
            start_date, program.reporting_period_end, target_frequency_type)

    generated_targets = generate_periodic_targets(
        target_frequency_type, start_date, target_frequency_num_periods, event_name)

    dummy_indicator = Indicator(
        target_frequency=target_frequency_type,
        unit_of_measure_type=form.cleaned_data.get('unit_of_measure_type'),
        lop_target=form.cleaned_data.get('lop_target'),
        is_cumulative=form.cleaned_data.get('is_cumulative'),
    )

    content = render_to_string('indicators/indicatortargets.html', {
        'indicator': dummy_indicator,
        'periodic_targets': generated_targets
    })

    return JsonResponse({
        'content': content,
    })


class IndicatorFormMixin(object):
    model = Indicator
    form_class = IndicatorForm

    def __init__(self):
        self.guidance = None

    def set_form_guidance(self):
        self.guidance = FormGuidance.objects.filter(form="Indicator").first()

    def get_template_names(self):
        return 'indicators/indicator_form_modal.html'

    def form_invalid(self, form):
        return JsonResponse(form.errors, status=400)


class IndicatorCreate(IndicatorFormMixin, CreateView):

    @method_decorator(login_required)
    @method_decorator(has_indicator_write_access)
    @transaction.atomic
    def dispatch(self, request, *args, **kwargs):
        self.set_form_guidance()
        self.program = Program.objects.get(pk=kwargs['program'])
        return super(IndicatorCreate, self).dispatch(request, *args, **kwargs)

    def get_context_data(self, **kwargs):
        context = super(IndicatorCreate, self).get_context_data(**kwargs)

        context['program'] = self.program

        context['periodic_targets'] = []
        context['targets_sum'] = 0

        return context

    def get_initial(self):
        return {
            'unit_of_measure_type': Indicator.NUMBER,
            'program': self.program,
        }

    def get_form_kwargs(self):
        kwargs = super(IndicatorCreate, self).get_form_kwargs()
        kwargs['request'] = self.request
        kwargs['program'] = self.program
        return kwargs

    def form_valid(self, form, **kwargs):
        indicator = form.save()

        periodic_targets = self.request.POST.get('periodic_targets')

        # Save completed PeriodicTargets to the DB (will be empty [] for LoP)
        if periodic_targets:
            # now create/update periodic targets
            pt_json = json.loads(periodic_targets)

            for i, pt in enumerate(pt_json):
                try:
                    start_date = dateparser.parse(pt.get('start_date', None))
                    start_date = datetime.strftime(start_date, '%Y-%m-%d')
                except (ValueError, TypeError):
                    # raise ValueError("Incorrect data value")
                    start_date = None

                try:
                    end_date = dateparser.parse(pt.get('end_date', None))
                    end_date = datetime.strftime(end_date, '%Y-%m-%d')
                except (ValueError, TypeError):
                    # raise ValueError("Incorrect data value")
                    end_date = None

                values = dict(
                    period=pt.get('period', ''),
                    target=pt.get('target', 0),
                    start_date=start_date,
                    end_date=end_date,
                )

                # Validate PeriodicTarget target field is > 0... throws with ValidationError
                # Needed to be done here since the form itself does not check
                # Front-end validation exists which is why we are not bothering with UI feedback
                PeriodicTarget(indicator=indicator, **values).clean_fields()

                PeriodicTarget.objects.create(
                    indicator=indicator,
                    customsort=i,
                    create_date=timezone.now(),
                    **values
                )
        else:
            assert indicator.target_frequency == Indicator.LOP
            PeriodicTarget.objects.create(
                indicator=indicator,
                period=PeriodicTarget.LOP_PERIOD,
                target=indicator.lop_target,
                create_date=timezone.now(),
            )

        ProgramAuditLog.log_indicator_created(
            self.request.user,
            indicator,
            'N/A'
        )

        return JsonResponse({'success': True})


class IndicatorUpdate(IndicatorFormMixin, UpdateView):
    """
    Update and Edit Indicators.
    url: indicator_update/<pk>
    """

    @method_decorator(login_required)
    @method_decorator(group_excluded('ViewOnly', url='workflow/permission'))
    @method_decorator(indicator_pk_adapter(has_indicator_write_access))
    @transaction.atomic
    def dispatch(self, request, *args, **kwargs):
        if request.method == 'GET':
            # If target_frequency is set but not targets are saved then
            # unset target_frequency too.
            indicator = self.get_object()
            reset_indicator_target_frequency(indicator)

        self.set_form_guidance()

        return super(IndicatorUpdate, self).dispatch(request, *args, **kwargs)

    def get_context_data(self, **kwargs):
        context = super(IndicatorUpdate, self).get_context_data(**kwargs)
        context.update({'id': self.kwargs['pk']})
        indicator = Indicator.objects.get(id=self.kwargs['pk'])
        program = indicator.program

        context.update({'i_name': indicator.name})
        # context['programId'] = program.id

        pts = PeriodicTarget.objects.filter(indicator=indicator) \
            .annotate(num_data=Count('result')).order_by('customsort', 'create_date', 'period')

        ptargets = []
        for pt in pts:
            ptargets.append({
                'id': pt.pk,
                'num_data': pt.num_data,
                'start_date': pt.start_date,
                'end_date': pt.end_date,
                'period': pt.period, # period is deprecated, this should move to .period_name
                'period_name': pt.period_name,
                'target': pt.target
            })

        # if the modal is loaded (not submitted) and the indicator frequency is a periodic
        if self.request.method == 'GET' and indicator.target_frequency in [
                Indicator.ANNUAL, Indicator.SEMI_ANNUAL, Indicator.TRI_ANNUAL,
                Indicator.QUARTERLY, Indicator.MONTHLY]:

            latest_pt_end_date = indicator.periodictargets.aggregate(lastpt=Max('end_date'))['lastpt']
            if latest_pt_end_date is None or latest_pt_end_date == 'None':
                latest_pt_end_date = program.reporting_period_start
            else:
                latest_pt_end_date += timedelta(days=1)

            target_frequency_num_periods = IPTT_ReportView._get_num_periods(
                latest_pt_end_date, program.reporting_period_end, indicator.target_frequency)

            num_existing_targets = pts.count()
            event_name = ''

            generated_targets = generate_periodic_targets(
                indicator.target_frequency, latest_pt_end_date, target_frequency_num_periods, event_name,
                num_existing_targets)

            # combine the list of existing periodic_targets with the newly generated placeholder for missing targets
            ptargets += generated_targets

        context['periodic_targets'] = ptargets
        context['targets_sum'] = PeriodicTarget.objects \
            .filter(indicator=indicator).aggregate(Sum('target'))['target__sum']

        # redirect user to certain tabs of the form given GET params
        if self.request.GET.get('targetsactive') == 'true':
            context['targetsactive'] = True

        context['readonly'] = not self.request.has_write_access

        return context

    def get_initial(self):
        target_frequency_num_periods = self.get_object().target_frequency_num_periods
        if not target_frequency_num_periods:
            target_frequency_num_periods = 1

        initial = {
            'target_frequency_num_periods': target_frequency_num_periods
        }
        return initial

    # add the request to the kwargs
    def get_form_kwargs(self):
        kwargs = super(IndicatorUpdate, self).get_form_kwargs()
        kwargs['request'] = self.request
        program = self.object.program
        kwargs['program'] = program
        return kwargs

    def form_valid(self, form, **kwargs):
        periodic_targets = self.request.POST.get('periodic_targets')
        old_indicator = Indicator.objects.get(pk=self.kwargs.get('pk'))
        existing_target_frequency = old_indicator.target_frequency
        new_target_frequency = form.cleaned_data.get('target_frequency')
        lop = form.cleaned_data.get('lop_target')
        rationale = form.cleaned_data.get('rationale')
        old_indicator_values = old_indicator.logged_fields

        # if existing_target_frequency != new_target_frequency
        # then either existing_target_frequency is None or LoP
        # It shouldn't be anything else as the user should have to delete all targets first

        # Disassociate existing records and delete old PeriodicTargets
        if existing_target_frequency != new_target_frequency:
            PeriodicTarget.objects.filter(indicator=old_indicator).delete()

        # Save completed PeriodicTargets to the DB)
        if new_target_frequency == Indicator.LOP:
            lop_pt, created = PeriodicTarget.objects.update_or_create(
                indicator=old_indicator,
                period=PeriodicTarget.LOP_PERIOD,
                defaults={
                    'target': lop,

                }
            )

            if created:
                lop_pt.create_date = timezone.now()
                lop_pt.save()

                # Redirect results to new LoP target
                Result.objects.filter(indicator=old_indicator).update(periodic_target=lop_pt)
        else:
            # now create/update periodic targets (will be empty u'[]' for LoP)
            pt_json = json.loads(periodic_targets)
            generated_pt_ids = []
            for i, pt in enumerate(pt_json):
                pk = int(pt.get('id'))
                if pk == 0:
                    pk = None

                try:
                    start_date = dateparser.parse(pt.get('start_date', None))
                    start_date = datetime.strftime(start_date, '%Y-%m-%d')
                except (ValueError, TypeError):
                    # raise ValueError("Incorrect data value")
                    start_date = None

                try:
                    end_date = dateparser.parse(pt.get('end_date', None))
                    end_date = datetime.strftime(end_date, '%Y-%m-%d')
                except (ValueError, TypeError):
                    # raise ValueError("Incorrect data value")
                    end_date = None

                defaults = {
                    'period': pt.get('period', ''),
                    'target': pt.get('target', 0), 'customsort': i,
                    'start_date': start_date, 'end_date': end_date,
                    'edit_date': timezone.now()
                }

                # Validate PeriodicTarget target field is > 0... throws with ValidationError
                # Needed to be done here since the form itself does not check
                # Front-end validation exists which is why we are not bothering with UI feedback
                PeriodicTarget(indicator=old_indicator, **defaults).clean_fields()

                periodic_target, created = PeriodicTarget.objects \
                    .update_or_create(indicator=old_indicator, id=pk, defaults=defaults)

                if created:
                    periodic_target.create_date = timezone.now()
                    periodic_target.save()
                    generated_pt_ids.append(periodic_target.id)

            # Reassign results to newly created PTs
            if generated_pt_ids:
                pts = PeriodicTarget.objects.filter(indicator=old_indicator, pk__in=generated_pt_ids)
                for pt in pts:
                    Result.objects.filter(
                        indicator=old_indicator,
                        date_collected__range=[pt.start_date, pt.end_date]
                    ).update(periodic_target=pt)


        # save the indicator form
        form.save()
        self.object.refresh_from_db()

        # Write to audit log if results attached
        results_count = Result.objects.filter(indicator=self.object).count()
        if results_count > 0:
            ProgramAuditLog.log_indicator_updated(
                self.request.user,
                self.object,
                old_indicator_values,
                self.object.logged_fields,
                rationale
            )

        # refresh the periodic targets form such that pkids of new PeriodicTargets are submitted in the future
        content = render_to_string('indicators/indicatortargets.html', {
            'indicator': self.object,
            'periodic_targets': PeriodicTarget.objects.filter(indicator=self.object).annotate(num_data=Count('result'))
        })

        return JsonResponse({
            'content': content,
        })


class IndicatorDelete(DeleteView):
    model = Indicator
    form_class = IndicatorForm

    @method_decorator(login_required)
    @method_decorator(group_excluded('ViewOnly', url='workflow/permission'))
    @method_decorator(indicator_pk_adapter(has_indicator_write_access))
    def dispatch(self, request, *args, **kwargs):
        return super(IndicatorDelete, self).dispatch(request, *args, **kwargs)

    def form_invalid(self, form):
        messages.error(self.request, 'Invalid Form', fail_silently=False)
        return self.render_to_response(self.get_context_data(form=form))

    def form_valid(self, form):
        form.save()
        messages.success(self.request, _('Success, Indicator Deleted!'))
        return self.render_to_response(self.get_context_data(form=form))

    def delete(self, request, *args, **kwargs):
        if request.is_ajax():
            indicator = self.get_object()
            if not request.POST.get('rationale'):
                # if an indicator has results and no rationale is provided, fail:
                if indicator.result_set.all().count() > 0:
                    return JsonResponse(
                        {"status": "failed", "msg": _("Reason for change is required.")},
                        status=400
                    )
                # otherwise the rationale is this default:
                else:
                    rationale = "Reason for change is not required when deleting an indicator with no linked results."
            else:
                rationale = request.POST.get('rationale')
            indicator_values = indicator.logged_fields
            program_page_url = indicator.program.program_page_url
            indicator.delete()
            ProgramAuditLog.log_indicator_deleted(self.request.user, indicator, indicator_values, rationale)
            success_message = _("The indicator was successfully deleted.")
            response_context = {'status': 'success'}
            if request.POST.get('redirect'):
                response_context['redirect_url'] = program_page_url
                # message tagged "pnotify" to display a success popup after redirect
                messages.success(request, success_message, extra_tags="pnotify pnotify-success")
            else:
                response_context['msg'] = success_message
            return JsonResponse(response_context)
        else:
            return super(IndicatorDelete, self).delete(request, *args, **kwargs)

    def get_success_url(self):
        return self.object.program.program_page_url

# PERIODIC TARGET VIEWS:


@method_decorator(login_required, name='dispatch')
@method_decorator(indicator_adapter(has_indicator_write_access), name='dispatch')
class PeriodicTargetView(View):
    """
    This view generates periodic targets or deleting them (via POST)

    Seems to only be used for adding an event. All other PTs are generated elsewhere.
    """
    model = PeriodicTarget

    def get(self, request, *args, **kwargs):
        indicator = Indicator.objects.get(
            pk=self.kwargs.get('indicator', None))

        if request.GET.get('existingTargetsOnly'):
            pts = FlatJsonSerializer().serialize(
                indicator.periodictargets.all()
                .order_by('customsort', 'create_date', 'period'))

            return HttpResponse(pts)
        try:
            numTargets = int(request.GET.get('numTargets', None))
        except Exception:
            numTargets = PeriodicTarget.objects.filter(
                indicator=indicator).count() + 1

        # If this is ever false, a real start date should be given to generate_periodic_target_single()
        assert indicator.target_frequency == Indicator.EVENT

        pt_generated = generate_periodic_target_single(
            indicator.target_frequency, None,
            (numTargets - 1), ''
        )

        pt_generated_json = json.dumps(pt_generated, cls=DjangoJSONEncoder)
        return HttpResponse(pt_generated_json)

    def post(self, request, *args, **kwargs):
        indicator = Indicator.objects.get(
            pk=self.kwargs.get('indicator', None))

        rationale = request.POST.get('rationale')
        if not rationale:
            if indicator.result_set.all().exists():
                return JsonResponse(
                    {"status": "failed", "msg": _("Reason for change is required")},
                    status=400
                )
            else:
                rationale = 'No reason for change required.'

        deleteall = self.kwargs.get('deleteall', None)
        if deleteall == 'true':
            periodic_targets = PeriodicTarget.objects.filter(
                indicator=indicator)

            old = indicator.logged_fields

            for pt in periodic_targets:
                pt.result_set.all().update(periodic_target=None)
                pt.delete()
            indicator.target_frequency = None
            indicator.target_frequency_num_periods = 1
            indicator.target_frequency_start = None
            indicator.target_frequency_custom = None
            indicator.save()
            ProgramAuditLog.log_indicator_updated(self.request.user, indicator, old, indicator.logged_fields, rationale)

        return HttpResponse('{"status": "success", \
                            "message": "Request processed successfully!"}')


def reset_indicator_target_frequency(ind):
    if ind.target_frequency and ind.target_frequency != 1 and not ind.periodictargets.count():
        ind.target_frequency = None
        ind.target_frequency_start = None
        ind.target_frequency_num_periods = 1
        ind.save()
        return True
    return False


@method_decorator(login_required, name='dispatch')
@method_decorator(periodic_target_pk_adapter(has_indicator_write_access), name='dispatch')
class PeriodicTargetDeleteView(DeleteView):
    """
    url periodic_target_delete/<pk>
    """
    model = PeriodicTarget

    def delete(self, request, *args, **kwargs):
        result_count = self.get_object().result_set.count()
        rationale = request.POST.get('rationale')
        indicator = self.get_object().indicator
        old_indicator_values = indicator.logged_fields
        if result_count > 0:
            if not rationale:
                return JsonResponse(
                    {"status": "failed", "msg": _("Reason for change is required")},
                    status=400
                )
            else:
                self.get_object().result_set.all().update(
                    periodic_target=None)
        if not rationale and result_count == 0:
            rationale = 'No reason for change required.'
        self.get_object().delete()
        if indicator.periodictargets.count() == 0:
            indicator.target_frequency = None
            indicator.target_frequency_num_periods = 1
            indicator.target_frequency_start = None
            indicator.target_frequency_custom = None
            indicator.save()
        ProgramAuditLog.log_indicator_updated(
                request.user,
                indicator,
                old_indicator_values,
                indicator.logged_fields,
                rationale
            )

        indicator = None
        return JsonResponse({"status": "success"})


class ResultFormMixin(object):
    def get_template_names(self):
        return 'indicators/result_form_modal.html'

    def form_invalid(self, form):
        if self.request.is_ajax():
            return JsonResponse(form.errors, status=400)
        messages.error(self.request, 'Invalid Form', fail_silently=False)
        return self.render_to_response(self.get_context_data(form=form))


class ResultCreate(ResultFormMixin, CreateView):
    """Create new Result called by result_add as modal"""
    model = Result
    form_class = ResultForm

    @method_decorator(login_required)
    @method_decorator(group_excluded('ViewOnly', url='workflow/permission'))
    @method_decorator(indicator_adapter(has_result_write_access))
    def dispatch(self, request, *args, **kwargs):
        if not request.has_write_access:
            raise PermissionDenied

        self.indicator = get_object_or_404(Indicator, pk=self.kwargs['indicator'])
        return super(ResultCreate, self).dispatch(request, *args, **kwargs)

    def get_context_data(self, **kwargs):
        custom_disaggregation_labels = DisaggregationLabel.objects.filter(disaggregation_type__indicator=self.indicator.id)
        standard_disaggregation_labels = DisaggregationLabel.get_standard_labels()

        context = super(ResultCreate, self).get_context_data(**kwargs)
        context['indicator'] = self.indicator
        context['custom_disaggregation_labels'] = custom_disaggregation_labels
        context['standard_disaggregation_labels'] = standard_disaggregation_labels
        return context

    def get_form_kwargs(self):
        kwargs = super(ResultCreate, self).get_form_kwargs()
        kwargs['user'] = self.request.user
        kwargs['indicator'] = self.indicator
        kwargs['program'] = self.indicator.program
        kwargs['request'] = self.request
        return kwargs

    def form_valid(self, form):
        indicator = self.request.POST['indicator']
        disaggregation_labels = DisaggregationLabel.objects.filter(
            Q(disaggregation_type__indicator__id=indicator) |
            Q(disaggregation_type__standard=True))

        # update the count with the value of Table unique count
        if form.instance.update_count_tola_table and form.instance.tola_table:
            try:
                tola_table_id = self.request.POST['tola_table']
                table = TolaTable.objects.get(id=tola_table_id)
            except DisaggregationLabel.DoesNotExist:
                table = None

            if table:
                # remove trailing slash since TT api does not like it.
                url = table.url if table.url[-1:] != "/" else table.url[:-1]
                url = url if url[-5:] != "/data" else url[:-5]
                count = getTableCount(url, table.table_id)
            else:
                count = 0
            form.instance.achieved = count

        new = form.save()

        # The following code appears to be accomplishing the following
        # The for submitted contains key/vals for all disaggregation_labels on creation
        # if 1 or more values are present, create values in the DB for all key/vals
        # otherwise leave the disaggregation_value associates completely empty
        # In other words, save key/vals as all or nothing

        disaggregation_label_ids = set([str(dl.id) for dl in disaggregation_labels])
        process_disaggregation = False
        for k, v in self.request.POST.iteritems():
            if k in disaggregation_label_ids and v:
                process_disaggregation = True
                break

        if process_disaggregation is True:
            for label in disaggregation_labels:
                form_id_for_label = str(label.id)
                form_disagg_value = self.request.POST.get(form_id_for_label, '')
                new.disaggregation_value.create(disaggregation_label=label, value=form_disagg_value)

        ProgramAuditLog.log_result_created(self.request.user, new.indicator, new)

        if self.request.is_ajax():
            data = {
                'pk' : new.pk,
                'url': reverse('result_update', kwargs={'pk': new.pk})
            }
            return JsonResponse(data)

        messages.success(self.request, _('Success, Data Created!'))
        redirect_url = new.indicator.program.program_page_url
        return HttpResponseRedirect(redirect_url)


class ResultUpdate(ResultFormMixin, UpdateView):
    """Update Result view called by result_update as modal"""
    model = Result
    form_class = ResultForm

    @method_decorator(login_required)
    @method_decorator(group_excluded('ViewOnly', url='workflow/permission'))
    @method_decorator(result_pk_adapter(has_result_write_access))
    def dispatch(self, request, *args, **kwargs):
        self.result = get_object_or_404(Result, pk=self.kwargs.get('pk'))
        self.indicator = self.result.indicator
        return super(ResultUpdate, self).dispatch(request, *args, **kwargs)

    def get_context_data(self, **kwargs):
        custom_disaggregation_values = DisaggregationValue.objects.filter(
            result=self.result).exclude(
            disaggregation_label__disaggregation_type__standard=True)

        standard_disaggregation_values = DisaggregationValue.objects.filter(
            result=self.result).filter(
            disaggregation_label__disaggregation_type__standard=True)
        standard_disaggregation_labels = DisaggregationLabel.get_standard_labels()
        custom_disaggregation_labels = DisaggregationLabel.objects.filter(
            disaggregation_type__indicator=self.indicator.id)
        context = super(ResultUpdate, self).get_context_data(**kwargs)
        context['indicator'] = self.indicator

        context['readonly'] = not self.request.has_write_access
        context['custom_disaggregation_labels'] = custom_disaggregation_labels
        context['custom_disaggregation_values'] = custom_disaggregation_values
        context['standard_disaggregation_labels'] = standard_disaggregation_labels
        context['standard_disaggregation_values'] = standard_disaggregation_values
        return context

    def get_form_kwargs(self):
        kwargs = super(ResultUpdate, self).get_form_kwargs()
        kwargs['user'] = self.request.user
        kwargs['indicator'] = self.indicator
        kwargs['program'] = self.indicator.program
        kwargs['request'] = self.request
        return kwargs

    def form_valid(self, form):
        old_result = Result.objects.get(id=self.kwargs['pk'])

        getDisaggregationLabel = DisaggregationLabel.objects.filter(
            Q(disaggregation_type__indicator__id=old_result.indicator_id) |
            Q(disaggregation_type__standard=True)).distinct()

        # update the count with the value of Table unique count
        if form.instance.update_count_tola_table and form.instance.tola_table:
            try:
                table = TolaTable.objects.get(
                    id=self.request.POST['tola_table'])

            except TolaTable.DoesNotExist:
                table = None
            if table:
                # remove trainling slash since TT api does not like it.
                url = table.url if table.url[-1:] != "/" else table.url[:-1]
                url = url if url[-5:] != "/data" else url[:-5]
                count = getTableCount(url, table.table_id)
            else:
                count = 0
            form.instance.achieved = count

        # save the form then update manytomany relationships
        old_values = old_result.logged_fields
        new_result = form.save()  # internally this clears disaggregation_value m2m relationships!

        # like the create view, create disaggregation values as all or nothing

        disaggregation_label_ids = set([str(dl.id) for dl in getDisaggregationLabel])
        process_disaggregation = False
        for k, v in self.request.POST.iteritems():
            if k in disaggregation_label_ids and v:
                process_disaggregation = True
                break

        if process_disaggregation:
            for label in getDisaggregationLabel:
                form_id_for_label = str(label.id)
                form_disagg_value = self.request.POST.get(form_id_for_label, '')
                new_result.disaggregation_value.create(
                    disaggregation_label=label, value=form_disagg_value)

        # Result.achieved comes back different from the DB than from the ResultForm
        new_result.refresh_from_db()
        ProgramAuditLog.log_result_updated(self.request.user, new_result.indicator, old_values,
                                           new_result.logged_fields, form.cleaned_data.get('rationale'))

        if self.request.is_ajax():
            data = serializers.serialize('json', [self.object])
            return HttpResponse(data)

        messages.success(self.request, _('Success, Data Updated!'))
        redirect_url = new_result.program.program_page_url

        return HttpResponseRedirect(redirect_url)


class ResultDelete(DeleteView):
    """TODO: This should handle GET differently - currently returns a nonexistent template"""
    model = Result

    @method_decorator(login_required)
    @method_decorator(group_excluded('ViewOnly', url='workflow/permission'))
    @method_decorator(result_pk_adapter(has_result_write_access))
    def dispatch(self, request, *args, **kwargs):
        return super(ResultDelete, self).dispatch(
            request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        if request.is_ajax():
            if not request.POST.get('rationale'):
                return JsonResponse(
                    {"status": "failed", "msg": _("Reason for change is required")},
                    status=401
                )

            result = self.get_object()
            result_values = result.logged_fields
            result.delete()
            ProgramAuditLog.log_result_deleted(self.request.user, result.indicator, result_values, self.request.POST['rationale'])

            return JsonResponse(
                {"status": "success", "msg": "Result Deleted"}
            )
        else:
            return super(ResultDelete, self).delete(request, *args, **kwargs)

    def get_success_url(self):
        return self.object.program.program_page_url


def getTableCount(url, table_id):
    """
    Count the number of rowns in a TolaTable
    """
    token = TolaSites.objects.get(site_id=1)
    if token.tola_tables_token:
        headers = {
            'content-type': 'application/json',
            'Authorization': 'Token %s' % token.tola_tables_token
        }
    else:
        headers = {
            'content-type': 'application/json'
        }
        print "Token Not Found"

    response = requests.get(url, headers=headers, verify=True)
    data = json.loads(response.content)
    count = None

    try:
        count = data['data_count']
        TolaTable.objects.filter(table_id=table_id).update(unique_count=count)
    except KeyError:
        pass

    return count


def merge_two_dicts(x, y):
    """
    merges two dictionaries -- shallow
    """
    z = x.copy()
    z.update(y)
    return z


@login_required
def service_json(request, service):
    """
    For populating service indicators in dropdown
    :param service: The remote data service
    :return: JSON object of the indicators from the service
    """
    if service == 0:
        # no service (this is selecting a custom indicator)
        return HttpResponse(status=204)

    # Permission check
    verify_program_access_level_of_any_program(request, 'high')

    service_indicators = import_indicator(service)
    return JsonResponse(service_indicators, safe=False)


@login_required
@indicator_adapter(has_result_read_access)
def result_view(request, indicator, program):
    """Returns the results table for an indicator - used to expand rows on the Program Page"""
    indicator = ResultsIndicator.results_view.get(pk=indicator)
    reset_indicator_target_frequency(indicator)
    template_name = 'indicators/result_table.html'
    program_obj = indicator.program
    program = program_obj.id
    periodictargets = indicator.annotated_targets
    on_track_lower = 100 - 100 * Indicator.ONSCOPE_MARGIN
    on_track_upper = 100 + 100 * Indicator.ONSCOPE_MARGIN
    on_track = True if (on_track_lower <= indicator.lop_percent_met <= on_track_upper) else False
    is_editable = False if request.GET.get('edit') == 'false' else True

    readonly = not request.has_write_access

    return render_to_response(
        template_name, {
            'indicator': indicator,
            'periodictargets': periodictargets,
            'program_id': program,
            'program': program_obj,
            'is_editable': is_editable,
            'on_track': on_track,
            'readonly': readonly
        }
    )


@login_required
def indicator_plan(request, program):
    """
    This is the GRID report or indicator plan for a program.
    Shows a simple list of indicators sorted by level
    and number. Lives in the "Indicator" home page as a link.
    """
    program = get_object_or_404(Program, id=program)

    verify_program_access_level(request, program.id, 'low')

    indicators = ip.indicator_queryset(program.pk)

    return render(request, "indicators/indicator_plan.html", {
        'program': program,
        'column_names': ip.column_names(),
        'rows': [ip.row(i) for i in indicators]
    })



@login_required
def old_program_page(request, program_id, indicator_id, indicator_type_id):
    """ redirect for old /program/<program_id>/<indicator_id>/<indicator_type_id>/ urls to new program page url"""
    program = get_object_or_404(Program, pk=program_id)
    if indicator_id != 0 or indicator_type_id != 0:
        logger.warn('attempt to access program page with filters indicator id {0} and indicator type id {1}'.format(
            indicator_id, indicator_type_id))
    return redirect(program.program_page_url, permanent=True)


@method_decorator(login_required, name='dispatch')
@method_decorator(has_program_read_access, name='dispatch')
class ProgramPage(ListView):
    model = Indicator
    template_name = 'indicators/program_page.html'

    def get(self, request, *args, **kwargs):
        # countries = request.user.tola_user.countries.all()
        program_id = int(self.kwargs['program'])
        if request.user.is_anonymous:
            return HttpResponseRedirect('/')
        unannotated_program = Program.objects.only(
            'reporting_period_start', 'reporting_period_end',
            'start_date', 'end_date'
            ).get(pk=program_id)
        if unannotated_program.reporting_period_start is None or unannotated_program.reporting_period_end is None:
            context = {
                'program': unannotated_program,
                'redirect_url': request.path
            }
            return render(
                request, 'indicators/program_setup_incomplete.html', context
                )
        program = ProgramWithMetrics.program_page.get(pk=program_id)
        program.indicator_filters = {}

        indicators = program.annotated_indicators\
            .annotate(target_period_last_end_date=Max('periodictargets__end_date')).select_related('level')
        site_count = len(program.get_sites())

        pinned_reports = list(program.pinned_reports.filter(tola_user=request.user.tola_user)) + \
                         [PinnedReport.default_report(program.id)]

        readonly = not request.has_write_access

        js_context = {
            'delete_pinned_report_url': str(reverse_lazy('delete_pinned_report')),
            'program': ProgramSerializer(program).data,
            'indicators': IndicatorSerializer(indicators, many=True).data,
            'indicator_on_scope_margin': Indicator.ONSCOPE_MARGIN,
            'readonly': readonly,  # controls "Add indicator" link
        }

        #program.set_metrics(indicators)
        c_data = {
            'program': program,
            'site_count': site_count,
            'percent_complete': program.percent_complete,
            'pinned_reports': pinned_reports,
            'js_context': js_context,
            "readonly": readonly  # controls "Add sites" link, and Program period modal
        }
        return render(request, self.template_name, c_data)


class DisaggregationReportMixin(object):
    def get_context_data(self, **kwargs):
        context = super(DisaggregationReportMixin, self) \
            .get_context_data(**kwargs)
        programs = self.request.user.tola_user.available_programs
        indicators = Indicator.objects.filter(program__in=programs)

        programId = int(kwargs.get('program', 0))
        program_selected = None
        if programId:
            program_selected = Program.objects.filter(id=programId).first()
            if program_selected.indicator_set.count() > 0:
                indicators = indicators.filter(program=programId)

        disagg_query = "SELECT \
                i.id AS IndicatorID, \
                dt.disaggregation_type AS DType,\
                l.customsort AS customsort, \
                l.label AS Disaggregation, \
                SUM(dv.value) AS Actuals \
            FROM indicators_result_disaggregation_value AS cdv \
            INNER JOIN indicators_result AS c \
                ON c.id = cdv.result_id \
            INNER JOIN indicators_indicator AS i ON i.id = c.indicator_id\
            INNER JOIN workflow_program AS p ON p.id = i.program_id \
            INNER JOIN indicators_disaggregationvalue AS dv \
                ON dv.id = cdv.disaggregationvalue_id \
            INNER JOIN indicators_disaggregationlabel AS l \
                ON l.id = dv.disaggregation_label_id \
            INNER JOIN indicators_disaggregationtype AS dt \
                ON dt.id = l.disaggregation_type_id \
            WHERE p.id = %s \
            GROUP BY IndicatorID, DType, customsort, Disaggregation \
            ORDER BY IndicatorID, DType, customsort, Disaggregation;" \
                % programId

        cursor = connection.cursor()
        cursor.execute(disagg_query)
        disdata = dictfetchall(cursor)

        indicator_query = "SELECT DISTINCT \
                p.id as PID, \
                i.id AS IndicatorID, \
                i.number AS INumber, \
                i.name AS Indicator, \
                i.lop_target AS LOP_Target, \
                SUM(cd.achieved) AS Overall \
            FROM indicators_indicator AS i \
            INNER JOIN workflow_program AS p ON p.id = i.program_id \
            LEFT OUTER JOIN indicators_result AS cd \
                ON i.id = cd.indicator_id \
            WHERE p.id = %s \
            GROUP BY PID, IndicatorID \
            ORDER BY Indicator; " % programId

        cursor.execute(indicator_query)
        idata = dictfetchall(cursor)

        for indicator in idata:
            indicator["disdata"] = []
            for i, dis in enumerate(disdata):
                if dis['IndicatorID'] == indicator['IndicatorID']:
                    indicator["disdata"].append(disdata[i])

        context['program_id'] = programId
        context['data'] = idata
        context['getPrograms'] = programs
        context['getIndicators'] = indicators
        context['program_selected'] = program_selected
        if program_selected:
            context['program_name'] = program_selected.name

        return context

@method_decorator(login_required, name='dispatch')
class DisaggregationReportQuickstart(TemplateView):
    template_name = 'indicators/disaggregation_report.html'

    def get_context_data(self, **kwargs):
        context = super(DisaggregationReportQuickstart, self).get_context_data(**kwargs)
        context['program_id'] = 0
        context['data'] = []
        context['getPrograms'] = self.request.user.tola_user.available_programs
        context['disaggregationprint_button'] = False
        context['disaggregationcsv_button'] = False
        return context

@method_decorator(login_required, name='dispatch')
@method_decorator(has_program_read_access, name='dispatch')
class DisaggregationReport(DisaggregationReportMixin, TemplateView):
    template_name = 'indicators/disaggregation_report.html'

    def get_context_data(self, **kwargs):
        context = super(DisaggregationReport, self).get_context_data(**kwargs)
        context['disaggregationprint_button'] = True
        context['disaggregationcsv_button'] = True
        return context


@method_decorator(login_required, name='dispatch')
@method_decorator(has_program_read_access, name='dispatch')
class DisaggregationPrint(DisaggregationReportMixin, TemplateView):
    template_name = 'indicators/disaggregation_print.html'

    def get(self, request, *args, **kwargs):
        context = super(DisaggregationPrint, self).get_context_data(**kwargs)
        hmtl_string = render(request, self.template_name,
                             {'data': context['data'],
                              'program_selected': context['program_selected']
                              })
        pdffile = HTML(string=hmtl_string.content)

        result = pdffile.write_pdf(stylesheets=[CSS(
            string='@page {\
                size: letter; margin: 1cm;\
                @bottom-right{\
                    content: "Page " counter(page) " of " counter(pages);\
                };\
            }'
        )])
        res = HttpResponse(result, content_type='application/pdf')
        res['Content-Disposition'] = 'attachment; \
            filename=indicators_disaggregation_report.pdf'

        res['Content-Transfer-Encoding'] = 'binary'
        # return super(DisaggregationReport, self).get(
        #   request, *args, **kwargs)
        return res


@method_decorator(login_required, name='dispatch')
@method_decorator(has_program_read_access, name='dispatch')
class IndicatorExport(View):
    """
    Export all indicators to an XLS file
    """
    def get(self, request, *args, **kwargs):
        queryset = ip.indicator_queryset(kwargs['program'])
        wb = ip.create_workbook(queryset)

        response = HttpResponse(content_type='application/ms-excel')
        response['Content-Disposition'] = 'attachment; filename="{}"'.format('indicator_plan.xlsx')
        wb.save(response)
        return response


@login_required
@indicator_adapter(has_program_read_access)
def api_indicator_view(request, indicator, program):
    """
    API call for viewing an indicator for the program page
    """
    indicator = Indicator.objects.only('program_id', 'sector_id').get(pk=indicator)
    program = ProgramWithMetrics.program_page.get(pk=indicator.program_id)
    program.indicator_filters = {}

    indicator = program.annotated_indicators \
        .annotate(target_period_last_end_date=Max('periodictargets__end_date')).get(pk=indicator.pk)

    return JsonResponse(IndicatorSerializer(indicator).data)
