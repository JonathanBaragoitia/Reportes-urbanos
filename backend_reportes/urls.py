from django.urls import path, include
from rest_framework.routers import DefaultRouter
from reportes.views import ReporteViewSet, register_user, login_user  # <- uso mis propias vistas

router = DefaultRouter()
router.register(r'reportes', ReporteViewSet)

urlpatterns = [
    path('api/', include([
        path('', include(router.urls)),
        path('auth/login/', login_user),         # <- login personalizado con validación
        path('auth/register/', register_user),   # <- registro que devuelve token automáticamente
    ])),
]
