"""Development settings and globals."""
import os, yaml

from base import *

def read_yaml(path):
    with open(path) as f:
        data = yaml.load(f, Loader=yaml.FullLoader)
    return data

SETTINGS_DIR = os.path.dirname(os.path.abspath(__file__))
CONFIG_DIR = os.path.abspath(os.path.join(SETTINGS_DIR, os.pardir, os.pardir, 'config'))
app_settings = read_yaml(os.path.join(CONFIG_DIR, 'settings.secret.yml'))

# MANAGER CONFIGURATION
# See: https://docs.djangoproject.com/en/dev/ref/settings/#admins
ADMINS = app_settings['ADMINS']
# See: https://docs.djangoproject.com/en/dev/ref/settings/#managers
MANAGERS = app_settings['ADMINS']

# ALLOWED HOSTS
# Hosts/domain names that are valid for this site; required if DEBUG is False
# See https://docs.djangoproject.com/en/1.5/ref/settings/#allowed-hosts
ALLOWED_HOSTS = app_settings['ALLOWED_HOSTS']

# CACHE CONFIGURATION
# See: https://docs.djangoproject.com/en/dev/ref/settings/#caches
CACHES = app_settings['CACHES']

# DATABASE CONFIGURATION
# See: https://docs.djangoproject.com/en/dev/ref/settings/#databases
DATABASES = app_settings['DATABASES']

# DEBUG CONFIGURATION
# See: https://docs.djangoproject.com/en/dev/ref/settings/#debug
DEBUG = app_settings['DEBUG']
# See: https://docs.djangoproject.com/en/dev/ref/settings/#template-debug

TEMPLATES[0]['OPTIONS']['debug'] = app_settings['TEMPLATE_DEBUG']

# EMAIL CONFIGURATION
# See: https://docs.djangoproject.com/en/dev/ref/settings/#email-backend
EMAIL_USE_TLS = app_settings['EMAIL_USE_TLS']
EMAIL_HOST = app_settings['EMAIL_HOST']
EMAIL_PORT = app_settings['EMAIL_PORT']
EMAIL_HOST_USER = app_settings['EMAIL_HOST_USER']
EMAIL_HOST_PASSWORD = app_settings['EMAIL_HOST_PASSWORD']
DEFAULT_FROM_EMAIL = app_settings['DEFAULT_FROM_EMAIL']
SERVER_EMAIL = app_settings['SERVER_EMAIL']
EMAIL_BACKEND = app_settings['EMAIL_BACKEND']
EMAIL_FILE_PATH = app_settings['EMAIL_FILE_PATH']

# GOOGLE CLIENT CONFIG
# GOOGLE_CLIENT_ID = app_settings['GOOGLE_CLIENT_ID']
# GOOGLE_CLIENT_SECRET = app_settings['GOOGLE_CLIENT_SECRET']
# GOOGLE_STEP2_URI = app_settings['GOOGLE_STEP2_URI']

# SOCIAL GOOGLE AUTH
SOCIAL_AUTH_GOOGLE_OAUTH2_KEY = app_settings['SOCIAL_AUTH_GOOGLE_OAUTH2_KEY']
SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET = app_settings['SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET']
# whitelisted domains no longer whitelisted because mercycorps.org should be okta, and we are allowing non-
#  mercycorps domains to access as partners using google
# SOCIAL_AUTH_GOOGLE_OAUTH2_WHITELISTED_DOMAINS = app_settings['SOCIAL_AUTH_GOOGLE_OAUTH2_WHITELISTED_DOMAINS']
# domains listed here will fail auth IF settings.DEBUG is off (mercycorps users should use Okta on production)
SOCIAL_AUTH_GOOGLE_OAUTH2_OKTA_DOMAINS = ["mercycorps.org"]

# TOLA TABLES AUTH
# TOLA_TABLES_TOKEN = app_settings['TOLA_TABLES_TOKEN']
# TOLA_TABLES_USER = app_settings['TOLA_TABLES_USER']

# LOCAL APPS DEPENDING ON SERVER DEBUG FOR DEV BOXES,
# REPORT BUILDER FOR REPORT SERVER
DEV_APPS = app_settings.get('DEV_APPS', None)

# silk only for testing locally:
# LOCAL_APPS = (
#    'silk',
# )
LOCAL_APPS = ()

#INSTALLED_APPS = INSTALLED_APPS #+ tuple(DEV_APPS)
INSTALLED_APPS = INSTALLED_APPS + LOCAL_APPS

# silk only for testing:
# LOCAL_MIDDLEWARE = (
#     'silk.middleware.SilkyMiddleware',
# )
LOCAL_MIDDLEWARE = ()

MIDDLEWARE =  LOCAL_MIDDLEWARE + MIDDLEWARE
# SILK_ENABLED = True
# SILKY_PYTHON_PROFILER = True

MIDDLEWARE =  LOCAL_MIDDLEWARE + MIDDLEWARE
SILK_ENABLED = True

# LDAP_LOGIN = app_settings['LDAP_LOGIN']
# LDAP_SERVER = app_settings['LDAP_SERVER']
# LDAP_PASSWORD = app_settings['LDAP_PASSWORD']
# LDAP_USER_GROUP = app_settings['LDAP_USER_GROUP']
# LDAP_ADMIN_GROUP = app_settings['LDAP_ADMIN_GROUP']

AUTHENTICATION_BACKENDS = app_settings['AUTHENTICATION_BACKENDS']

# If report server then limit navigation and allow access to public dashboards
REPORT_SERVER = app_settings['REPORT_SERVER']
OFFLINE_MODE = app_settings['OFFLINE_MODE']
NON_LDAP = app_settings['NON_LDAP']

########## EMAIL SETTINGS
EMAIL_USE_TLS = app_settings.get('EMAIL_USE_TLS', True)
EMAIL_HOST = app_settings.get('EMAIL_HOST', 'smtp.gmail.com')
EMAIL_PORT = app_settings.get('EMAIL_PORT', 587)
EMAIL_HOST_USER = app_settings['EMAIL_HOST_USER']
EMAIL_HOST_PASSWORD = app_settings['EMAIL_HOST_PASSWORD']
DEFAULT_FROM_EMAIL = app_settings.get('DEFAULT_FROM_EMAIL', 'systems@mercycorps.org')
SERVER_EMAIL = app_settings['SERVER_EMAIL']
#DEFAULT_TO_EMAIL = 'to email'
EMAIL_BACKEND = app_settings.get('EMAIL_BACKEND', 'django.core.mail.backends.smtp.EmailBackend')


CORS_ORIGIN_ALLOW_ALL = True
CORS_ORIGIN_WHITELIST = (
    'http://127.0.0.1:8000',
    'http://localhost:8000',
)

GOOGLE_ANALYTICS_PROPERTY_ID = app_settings.get('GOOGLE_ANALYTICS_PROPERTY_ID', None)
GOOGLE_ANALYTICS_DOMAIN = app_settings.get('GOOGLE_ANALYTICS_DOMAIN', None)

SECRET_KEY = app_settings['SECRET_KEY']

LOGGING['handlers']['file']['filename'] = app_settings['LOGFILE']

# use webpack dev server
WEBPACK_LOADER = {
    'DEFAULT': {
        'BUNDLE_DIR_NAME': app_settings.get('WEBPACK_BUNDLE_DIR_NAME', 'dist/'),
		'STATS_FILE': os.path.join(SITE_ROOT, app_settings.get('WEBPACK_STATS_FILE', 'webpack-stats-local.json')),
    }
}

SOCIAL_AUTH_SAML_SP_ENTITY_ID = app_settings['SOCIAL_AUTH_SAML_SP_ENTITY_ID']
SOCIAL_AUTH_SAML_SP_PUBLIC_CERT = app_settings['SOCIAL_AUTH_SAML_SP_PUBLIC_CERT']
SOCIAL_AUTH_SAML_SP_PRIVATE_KEY = app_settings['SOCIAL_AUTH_SAML_SP_PRIVATE_KEY']
SOCIAL_AUTH_SAML_ORG_INFO = app_settings['SOCIAL_AUTH_SAML_ORG_INFO']
SOCIAL_AUTH_SAML_TECHNICAL_CONTACT = app_settings['SOCIAL_AUTH_SAML_TECHNICAL_CONTACT']
SOCIAL_AUTH_SAML_SUPPORT_CONTACT = app_settings['SOCIAL_AUTH_SAML_SUPPORT_CONTACT']
SOCIAL_AUTH_SAML_ENABLED_IDPS = app_settings['SOCIAL_AUTH_SAML_ENABLED_IDPS']
