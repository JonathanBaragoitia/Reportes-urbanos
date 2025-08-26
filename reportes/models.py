from django.db import models

class Reporte(models.Model):
    titulo = models.CharField(max_length=200)
    descripcion = models.TextField()
    ubicacion = models.CharField(max_length=100)
    estado = models.IntegerField(default=1)
    fecha = models.DateTimeField(auto_now_add=True)
    imagen = models.ImageField(upload_to='reportes/', blank=True, null=True)  # Campo nuevo para imagen

    def __str__(self):
        return self.titulo
