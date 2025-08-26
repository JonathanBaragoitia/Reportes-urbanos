# 🏙️ Aplicación de Reportes Urbanos

Proyecto de Fin de Ciclo (DAW) – Jonathan Baragoitia  
App desarrollada con Django REST Framework + React

## 🚀 Funcionalidades principales

- Registro e inicio de sesión con autenticación por token
- Creación, edición y eliminación de reportes urbanos
- Subida de imágenes asociadas al reporte
- Paginación del historial de reportes
- Exportación a CSV
- Interfaz visual adaptada con Tailwind y React Icons
- Backend administrable desde panel Django admin

## ⚙️ Tecnologías utilizadas

- **Frontend**: React, Tailwind CSS, Axios, FileSaver
- **Backend**: Django, Django REST Framework, Token Authentication
- **Base de datos**: SQLite (desarrollo local)
- **Otros**: Admin personalizado, gestión de imágenes con `ImageField`

## 🛠️ Requisitos del sistema

- Python 3.10+
- Node.js + npm
- Django 4+
- Django REST Framework
- React 18

## 🔧 Instalación del backend

1. Clonar el repositorio o descargar el código.
2. Crear entorno virtual:
   ```bash
   python -m venv venv
   source venv/bin/activate  # o venv\\Scripts\\activate en Windows
