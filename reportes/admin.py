from django.contrib import admin
from .models import Reporte
from django.utils.html import format_html

class ReporteAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'ubicacion', 'estado', 'fecha', 'mostrar_imagen')
    list_filter = ('estado', 'ubicacion')
    search_fields = ('titulo', 'descripcion', 'ubicacion')

    def mostrar_imagen(self, obj):
        if obj.imagen:
            return format_html('<img src="{}" width="80" height="60" style="object-fit: cover;" />', obj.imagen.url)
        return "Sin imagen"
    mostrar_imagen.short_description = "Imagen"

admin.site.register(Reporte, ReporteAdmin)
