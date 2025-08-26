from pathlib import Path

# --- Rutas del proyecto ---
BASE_DIR = Path(__file__).resolve().parent.parent

# --- Clave secreta (¡cámbiala en producción!) ---
SECRET_KEY = 'django-insecure-reemplaza-esto-en-produccion'

# --- Debug activado para desarrollo ---
DEBUG = True

# --- Permitir localhost para desarrollo ---
ALLOWED_HOSTS = ['localhost', '127.0.0.1']

# --- Apps que uso en este proyectazo ---
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # Paquetes que me hacen la vida más fácil
    'rest_framework',
    'rest_framework.authtoken',
    'corsheaders',

    # Mi app para los reportes urbanos
    'reportes',
]

# --- Middleware para controlar flujo de peticiones ---
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # Esto permite peticiones desde fuera (como React)
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',  # Para gestionar usuarios
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# --- Configuración base del proyecto ---
ROOT_URLCONF = 'backend_reportes.urls'  # <--- CORREGIDO

# --- Donde se buscan las plantillas (aunque en este proyecto usamos API) ---
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# --- Motor WSGI para producción ---
WSGI_APPLICATION = 'backend_reportes.wsgi.application'  # <--- CORREGIDO

# --- Base de datos SQLite para desarrollo (rápido y fácil) ---
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# --- Reglas de validación de contraseñas (lo dejo por defecto) ---
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# --- Config regional ---
LANGUAGE_CODE = 'es-es'
TIME_ZONE = 'Europe/Madrid'
USE_I18N = True
USE_TZ = True

# --- Config de archivos estáticos (para frontend si se despliega) ---
STATIC_URL = 'static/'

# --- Para que Django sepa dónde guardar datos por defecto ---
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# --- Permitir cualquier origen (en desarrollo) ---
CORS_ALLOW_ALL_ORIGINS = True

# --- Config de Django REST Framework ---
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticatedOrReadOnly',  # Solo autenticados crean/editar/borrar
    ]
}
