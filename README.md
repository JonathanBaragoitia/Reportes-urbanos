# Aplicación de Reportes Urbanos

[![React](https://img.shields.io/badge/React-17-61DAFB?logo=react&logoColor=222)](https://react.dev/)
[![Django](https://img.shields.io/badge/Django-5.2-092E20?logo=django&logoColor=fff)](https://www.djangoproject.com/)
[![DRF](https://img.shields.io/badge/REST%20Framework-API-red)](https://www.django-rest-framework.org/)
[![SQLite](https://img.shields.io/badge/SQLite-DB-003B57?logo=sqlite&logoColor=fff)](https://www.sqlite.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwindcss&logoColor=fff)](https://tailwindcss.com/)
[![Axios](https://img.shields.io/badge/Axios-HTTP-5A29E4)](https://axios-http.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](#licencia)

Aplicación Full Stack para reportar incidencias urbanas. El **frontend** (React + Tailwind) permite crear y consultar reportes; el **backend** (Django + DRF) expone la API, autentica por token y persiste en **SQLite**.

---

## ✨ Funcionalidades

- Registro e inicio de sesión con **autenticación por token**
- Crear, editar, eliminar y listar **reportes** (con imagen opcional)
- **Historial** de reportes paginado
- **Exportación CSV** (FileSaver en frontend)
- UI simple y responsive (Tailwind + React Icons)
- Panel de admin de Django para gestionar datos

---

## 🧰 Stack Técnico

**Frontend**
- React 17
- Tailwind CSS
- Axios
- FileSaver
- React Icons

**Backend**
- Django 5.2
- Django REST Framework
- Token Authentication
- django-cors-headers

**Base de datos**
- SQLite (desarrollo local)

---



## 📂 Estructura del proyecto

```ReportesUsuario/
├── backend_reportes/         # Configuración del backend Django
│   ├── settings.py           # Config principal de Django
│   ├── urls.py               # Rutas principales del backend
│   └── wsgi.py / asgi.py     # Arranque del servidor
│
├── reportes/                 # App de reportes urbanos en Django
│   ├── models.py             # Modelos de la base de datos
│   ├── serializers.py        # Serializadores para la API
│   ├── views.py              # Vistas de la API
│   └── urls.py               # Endpoints de reportes
│
├── frontend/                 # Interfaz en React
│   ├── public/               # Archivos estáticos
│   └── src/                  # Código fuente de React
│       ├── services/api.js   # Configuración de Axios
│       ├── App.js            # Componente principal
│       └── components/...    # Componentes de UI
│
├── docs/                     # Capturas y documentación (opcional)
│   ├── frontend.png
│   └── backend.png
│
├── manage.py                 # Comando principal de Django
├── requirements.txt          # Dependencias del backend
├── package.json              # Dependencias del frontend
├── README.md                 # Documentación del proyecto
└── .github/workflows/        # CI/CD con GitHub Actions
    └── node-django.yml ```
    
    ## 📄 Licencia

Este proyecto está bajo la licencia [MIT](LICENSE).
