// frontend/src/services/api.js
import axios from 'axios';

const api = axios.create({
  // Usa la variable del .env y, si no existe, cae a localhost:8000/api/
  baseURL: process.env.REACT_APP_API_BASE || 'http://127.0.0.1:8000/api/',
  timeout: 10000,
});

// Añade el token automáticamente si existe
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Token ${token}`;
  return config;
});

// === Helpers ===

// Login -> guarda token
export async function login(username, password) {
  const { data } = await api.post('auth/login/', { username, password });
  if (data?.token) localStorage.setItem('token', data.token);
  return data;
}

// Logout -> borra token
export function logout() {
  localStorage.removeItem('token');
}

// Obtener reportes (lista)
export function fetchReportes(params = {}) {
  return api.get('reportes/', { params }).then((r) => r.data);
}

// Crear reporte (con imagen opcional)
export function crearReporte({ titulo, descripcion, ubicacion, estado, imagen }) {
  const form = new FormData();
  form.append('titulo', titulo);
  form.append('descripcion', descripcion);
  form.append('ubicacion', ubicacion);
  form.append('estado', estado);
  if (imagen) form.append('imagen', imagen);

  return api.post('reportes/', form).then((r) => r.data);
}

export default api;
