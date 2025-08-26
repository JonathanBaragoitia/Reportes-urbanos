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

## 🧱 Estructura del proyecto

