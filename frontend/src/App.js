import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaMapMarkerAlt, FaCalendarAlt, FaTrash, FaEdit, FaUpload } from "react-icons/fa";
import { saveAs } from "file-saver";
import "./App.css";

const App = () => {
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("success");
  const [reportes, setReportes] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [estado, setEstado] = useState(1);
  const [imagen, setImagen] = useState(null);
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [usuarioActivo, setUsuarioActivo] = useState(null);
  const [editandoId, setEditandoId] = useState(null);
  const [pagina, setPagina] = useState(1);
  const porPagina = 5;

  useEffect(() => {
    obtenerReportes();
  }, []);

  const Alerta = () =>
    mensaje && (
      <div className={`mb-4 p-3 rounded text-white ${tipoMensaje === "success" ? "bg-green-600" : "bg-red-600"}`}>
        {mensaje}
      </div>
    );

  const obtenerReportes = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/reportes/");
      setReportes(response.data.reverse());
    } catch (error) {
      setMensaje("Error al cargar los reportes.");
      setTipoMensaje("error");
    }
  };

  const handleRegister = async () => {
    if (!usuario || !contrasena) return mostrarError("Usuario y contraseña obligatorios");
    try {
      const response = await axios.post("http://localhost:8000/api/auth/register/", {
        username: usuario,
        password: contrasena,
      });
      localStorage.setItem("token", response.data.token);
      setUsuarioActivo(usuario);
      setUsuario("");
      setContrasena("");
      mostrarExito("Registro exitoso. ¡Bienvenido!");
    } catch (error) {
      mostrarError("No se pudo registrar el usuario.");
    }
  };

  const handleLogin = async () => {
    if (!usuario || !contrasena) return mostrarError("Usuario y contraseña obligatorios");
    try {
      const response = await axios.post("http://localhost:8000/api/auth/login/", {
        username: usuario,
        password: contrasena,
      });
      localStorage.setItem("token", response.data.token);
      setUsuarioActivo(usuario);
      setUsuario("");
      setContrasena("");
      mostrarExito("Inicio de sesión exitoso.");
    } catch (error) {
      mostrarError("Credenciales incorrectas.");
    }
  };

  const enviarReporte = async () => {
    if (!titulo || !descripcion || !ubicacion) return mostrarError("Completa todos los campos");
    const token = localStorage.getItem("token");
    if (!token) return mostrarError("Necesitas iniciar sesión");

    try {
      const formData = new FormData();
      formData.append("titulo", titulo);
      formData.append("descripcion", descripcion);
      formData.append("ubicacion", ubicacion);
      formData.append("estado", estado);
      if (imagen) formData.append("imagen", imagen);

      await axios.post("http://localhost:8000/api/reportes/", formData, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      obtenerReportes();
      resetFormulario();
      mostrarExito("Reporte enviado");
    } catch (error) {
      mostrarError("Error al enviar el reporte");
    }
  };

  const guardarCambios = async () => {
    const token = localStorage.getItem("token");
    if (!token || !editandoId) return;

    try {
      const formData = new FormData();
      formData.append("titulo", titulo);
      formData.append("descripcion", descripcion);
      formData.append("ubicacion", ubicacion);
      formData.append("estado", estado);
      if (imagen) formData.append("imagen", imagen);

      await axios.put(`http://localhost:8000/api/reportes/${editandoId}/`, formData, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      obtenerReportes();
      resetFormulario();
      mostrarExito("Reporte actualizado");
    } catch (error) {
      mostrarError("No se pudo actualizar");
    }
  };

  const eliminarReporte = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) return mostrarError("Inicia sesión para eliminar");

    try {
      await axios.delete(`http://localhost:8000/api/reportes/${id}/`, {
        headers: { Authorization: `Token ${token}` },
      });
      obtenerReportes();
      mostrarExito("Reporte eliminado");
    } catch {
      mostrarError("Error al eliminar");
    }
  };

  const editarReporte = (reporte) => {
    setTitulo(reporte.titulo);
    setDescripcion(reporte.descripcion);
    setUbicacion(reporte.ubicacion);
    setEstado(reporte.estado);
    setEditandoId(reporte.id);
    setImagen(null);
  };

  const resetFormulario = () => {
    setTitulo("");
    setDescripcion("");
    setUbicacion("");
    setEstado(1);
    setImagen(null);
    setEditandoId(null);
  };

  const mostrarError = (msg) => {
    setMensaje(msg);
    setTipoMensaje("error");
  };

  const mostrarExito = (msg) => {
    setMensaje(msg);
    setTipoMensaje("success");
  };

  const exportarCSV = () => {
    const filas = reportes.map(
      (r) => `${r.titulo},${r.descripcion},${r.ubicacion},${r.estado},${r.fecha}`
    );
    const csv = `Título,Descripción,Ubicación,Estado,Fecha\n${filas.join("\n")}`;
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "reportes.csv");
  };

  const paginados = reportes.slice((pagina - 1) * porPagina, pagina * porPagina);
  const totalPaginas = Math.ceil(reportes.length / porPagina);

  return (
    <div className="min-h-screen bg-zinc-900 text-white px-4 py-10">
      <div className="max-w-3xl mx-auto bg-zinc-800 p-6 rounded-xl shadow-lg space-y-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">🛠️ Reportar Incidencia Urbana</h1>
        <Alerta />

        {/* Login y registro */}
        <div className="flex flex-col md:flex-row gap-2 mb-4">
          <input placeholder="Usuario" value={usuario} onChange={(e) => setUsuario(e.target.value)} className="bg-zinc-800 p-2 rounded" />
          <input type="password" placeholder="Contraseña" value={contrasena} onChange={(e) => setContrasena(e.target.value)} className="bg-zinc-800 p-2 rounded" />
          <button onClick={handleLogin} className="bg-green-600 px-4 py-2 rounded">Iniciar Sesión</button>
          <button onClick={handleRegister} className="bg-blue-600 px-4 py-2 rounded">Registrarse</button>
        </div>

        {/* Formulario de creación de reporte */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
          <input placeholder="Título" value={titulo} onChange={(e) => setTitulo(e.target.value)} className="bg-zinc-800 p-2 rounded" />
          <input placeholder="Descripción" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} className="bg-zinc-800 p-2 rounded" />
          <input placeholder="Ubicación" value={ubicacion} onChange={(e) => setUbicacion(e.target.value)} className="bg-zinc-800 p-2 rounded" />
          <select value={estado} onChange={(e) => setEstado(parseInt(e.target.value))} className="bg-zinc-800 p-2 rounded">
            <option value={1}>Pendiente</option>
            <option value={2}>En proceso</option>
            <option value={3}>Resuelto</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="flex items-center gap-2">
            <FaUpload /> <input type="file" onChange={(e) => setImagen(e.target.files[0])} className="text-white" />
          </label>
        </div>

        <button
          onClick={editandoId ? guardarCambios : enviarReporte}
          className="bg-green-700 hover:bg-green-800 px-4 py-2 rounded mb-6"
        >
          {editandoId ? "Guardar Cambios" : "Enviar Reporte"}
        </button>

        {/* Listado  */}
        <div className="space-y-6">
          {paginados.map((r) => (
            <div key={r.id} className="bg-zinc-800 p-4 rounded shadow">
              <h3 className="font-bold text-lg">{r.titulo}</h3>
              <p>{r.descripcion}</p>
              <p className="flex items-center gap-2"><FaMapMarkerAlt /> {r.ubicacion} - Estado: {r.estado}</p>
              <p className="flex items-center gap-2"><FaCalendarAlt /> {new Date(r.fecha).toLocaleString()}</p>
              {r.imagen && <img src={r.imagen} alt="Reporte" className="mt-2 rounded w-full max-h-48 object-cover" />}
              <div className="flex gap-4 mt-4">
                <button onClick={() => editarReporte(r)} className="bg-yellow-600 px-3 py-1 rounded flex items-center gap-1"><FaEdit />Editar</button>
                <button onClick={() => eliminarReporte(r.id)} className="bg-red-600 px-3 py-1 rounded flex items-center gap-1"><FaTrash />Eliminar</button>
              </div>
            </div>
          ))}
        </div>

        {/* Paginación  */}
        
<div className="mt-10 pt-6 border-t border-zinc-700 mb-16">
  <div className="botones-paginacion">
    <button
      disabled={pagina === 1}
      onClick={() => setPagina(pagina - 1)}
      className={`px-4 py-2 rounded transition ${
        pagina === 1 ? "bg-gray-600 cursor-not-allowed" : "bg-gray-700 hover:bg-gray-600"
      }`}
    >
      Anterior
    </button>
    <button
      disabled={pagina === totalPaginas}
      onClick={() => setPagina(pagina + 1)}
      className={`px-4 py-2 rounded transition ${
        pagina === totalPaginas ? "bg-gray-600 cursor-not-allowed" : "bg-gray-700 hover:bg-gray-600"
      }`}
    >
      Siguiente
    </button>
  </div>
  <span className="text-sm opacity-70 text-center block mt-2">
    Página {pagina} de {totalPaginas}
  </span>
        </div>
      </div>
    </div>
  );
};

export default App;


