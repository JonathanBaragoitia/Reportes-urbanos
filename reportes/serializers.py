from rest_framework import serializers
from .models import Reporte
from django.contrib.auth.models import User

# Serializador de los reportes urbanos
class ReporteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reporte
        fields = '__all__'

# Serializador para registro de usuarios
class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'password')

    def create(self, validated_data):
        # Creamos el user con contraseña encriptada
        user = User.objects.create_user(**validated_data)
        return user
