from tola import views
from tola.views import *
from feed.views import (
    ProgramTargetFrequencies,
)
from tola_management.views import (
    UserAdminViewSet,
    OrganizationAdminViewSet,
)
from tola_management.programadmin import (
    ProgramAdminViewSet,
)
from tola_management.countryadmin import (
    CountryAdminViewSet,
    CountryObjectiveViewset,
    CountryDisaggregationViewSet,
)
from django.conf.urls import include, url
# Import i18n_patterns
from django.views.i18n import JavaScriptCatalog
from django.views.generic import TemplateView
from rest_framework import routers
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.authtoken import views as authtoken_views
from django.contrib.auth import views as authviews

from tola import views as tolaviews
from indicators.views.views_indicators import ProgramPage, old_program_page
from indicators.views.views_results_framework import (
    LevelViewSet, insert_new_level, save_leveltiers, reorder_indicators, indicator_list)
from indicators.views import views_program

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()
admin.site.site_header = 'Tola Activity administration'
from workflow.views import dated_target_info, ProgramDash

#REST FRAMEWORK
router = routers.DefaultRouter()
# router.register(r'users', UserViewSet)
# router.register(r'programs', ProgramViewSet)
# router.register(r'sector', SectorViewSet, base_name='sectors')
# router.register(r'projecttype', ProjectTypeViewSet)
# router.register(r'office', OfficeViewSet)
# router.register(r'siteprofile', SiteProfileViewSet)
# router.register(r'country', CountryViewSet)
# router.register(r'initiations', AgreementViewSet)
# router.register(r'tracking', CompleteViewSet)
# router.register(r'indicator', IndicatorViewSet)
# router.register(r'reportingfrequency', ReportingFrequencyViewSet)
# router.register(r'tolauser', TolaUserViewSet)
# router.register(r'indicatortype', IndicatorTypeViewSet)
# router.register(r'objective', ObjectiveViewSet)
# router.register(r'disaggregationtype', DisaggregationTypeViewSet)
router.register(r'level', LevelViewSet)
# router.register(r'externalservice', ExternalServiceViewSet)
# router.register(r'externalservicerecord', ExternalServiceRecordViewSet)
# router.register(r'strategicobjective', StrategicObjectiveViewSet)
# router.register(r'stakeholder', StakeholderViewSet)
# router.register(r'stakeholdertype', StakeholderTypeViewSet)
# router.register(r'capacity', CapacityViewSet)
# router.register(r'evaluate', EvaluateViewSet)
# router.register(r'profiletype', ProfileTypeViewSet)
# router.register(r'province', ProvinceViewSet)
# router.register(r'district', DistrictViewSet)
# router.register(r'adminlevelthree', AdminLevelThreeViewSet)
# router.register(r'village', VillageViewSet)
# router.register(r'contact', ContactViewSet)
# router.register(r'documentation', DocumentationViewSet)
# router.register(r'result', ResultViewSet)
# router.register(r'tolatable', TolaTableViewSet, base_name='tolatable')
# router.register(r'disaggregationvalue', DisaggregationValueViewSet)
# router.register(r'projectagreements', ProjectAgreementViewSet)
# router.register(r'loggedusers', LoggedUserViewSet)
# router.register(r'checklist', ChecklistViewSet)
# router.register(r'organization', OrganizationViewSet)
# router.register(r'pindicators', PogramIndicatorReadOnlyViewSet, base_name='pindicators')
# router.register(r'periodictargets', PeriodicTargetReadOnlyViewSet, base_name='periodictargets')
router.register(r'programtargetfrequencies', ProgramTargetFrequencies, base_name='programtargetfrequencies')

#tola admin
router.register(r'tola_management/user', UserAdminViewSet, base_name='tolamanagementuser')
router.register(r'tola_management/organization', OrganizationAdminViewSet, base_name='tolamanagementorganization')
router.register(r'tola_management/program', ProgramAdminViewSet, base_name='tolamanagementprograms')
router.register(r'tola_management/country', CountryAdminViewSet, base_name='tolamanagementcountry')
router.register(r'tola_management/countryobjective', CountryObjectiveViewset, base_name='tolamanagementcountryobjective')
router.register(r'tola_management/countrydisaggregation', CountryDisaggregationViewSet, base_name='tolamanagementcountrydisaggregation')


urlpatterns = [
                url(r'^jsi18n/$', JavaScriptCatalog.as_view(), name='javascript-catalog'),

                # rest framework
                url(r'^api/', include(router.urls)),
                url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
                url(r'^api-token-auth/', authtoken_views.obtain_auth_token),

                # enable the admin:
                url(r'^admin/', include(admin.site.urls)),

                # enable admin documentation:
                url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

                # api used  by reporting period modal
                url(r'^datedtargetinfo/(?P<pk>\w+)/$', dated_target_info, name='datedtargetinfo'),

                # internationalization
                url(r'^i18n/', include('django.conf.urls.i18n')),

                url(r'^tola_management/', include('tola_management.urls')),
                url(r'^saml_metadata/$', tolaviews.saml_metadata_view, name="saml_metadata"),

                # Site home page filtered by country
                url(r'^(?P<selected_country>\w+)/$', views.index, name='index'),

                # Program page
                url(r'^program/(?P<program>\d+)/$',
                    ProgramPage.as_view(), name='program_page'),

                url(r'^program/(?P<program>\d+)/logframe/$',
                    views_program.logframe_view, name='logframe'),

                url(r'^program/(?P<program>\d+)/logframe_excel/$',
                    views_program.logframe_excel_view, name='logframe_excel'),

                # Results framework builder
                url(r'^api/insert_new_level', insert_new_level, name='insert_new_level'),
                url(r'^api/save_leveltiers', save_leveltiers, name='save_leveltiers'),
                url(r'^api/reorder_indicators', reorder_indicators, name='reorder_indicators'),
                url(r'^api/indicator_list/(?P<program_id>\d+)/$', indicator_list, name='indicator_list'),

                # url redirect for people with old bookmarks
                url(r'^program/(?P<program_id>\d+)/(?P<indicator_id>\d+)/(?P<indicator_type_id>\d+)/$',
                    old_program_page, name='old_program_page'),

                # app include of workflow urls
                url(r'^workflow/', include('workflow.urls')),

                # app include of indicator urls
                url(r'^indicators/', include('indicators.urls')),

                # app include of customdashboard urls
                url(r'^customdashboard/', include('customdashboard.urls')),

                # app include of workflow urls
                url(r'^formlibrary/', include('formlibrary.urls')),

                # local login
                url(r'^login/$', tolaviews.TolaLoginView.as_view(), name='login'),
                url(r'^accounts/login/$', tolaviews.TolaLoginView.as_view(), name='login'),
                url(r'^accounts/logout/$', views.logout_view, name='logout'),

                # accounts
                url(r'^accounts/profile/$', views.profile, name='profile'),

                # Auth backend URL's
                url(r'^accounts/invalid_user/$', views.invalid_user_view, name='invalid_user'),
                url(r'^accounts/invalid_user/okta/$', TemplateView.as_view(template_name='registration/invalid_okta_user.html'), name='invalid_user_okta'),
                url(r'^accounts/password_reset/$', views.TolaPasswordResetView.as_view(), name='password_reset'),
                url(r'accounts/', include('django.contrib.auth.urls')),
                url('', include('social_django.urls', namespace='social')),

                #url(r'^oauth/', include('social_django.urls', namespace='social')),
                # Site home page
                url(r'^$', ProgramDash.as_view(), name='index'),


    ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


if settings.DEBUG:
    urlpatterns = [
        url(r'^500/$', TemplateView.as_view(template_name='500.html')),
        url(r'^404/$', TemplateView.as_view(template_name='404.html')),
    ] + urlpatterns
