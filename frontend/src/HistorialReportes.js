import React from "react";

function HistorialReportes({ reportes, eliminarReporte }) {
  return (
    <div>
      <h2>📋 Historial de Reportes</h2>
      {reportes.length === 0 ? (
        <p>No hay reportes aún.</p>
      ) : (
        <ul>
          {reportes.map((reporte) => (
            <li key={reporte.id}>
              <strong>{reporte.titulo}</strong> - {reporte.descripcion}
              <br />
              📍 {reporte.ubicacion} | Estado: {reporte.estado}
              <br />
              📅 Fecha: {new Date(reporte.fecha_reporte).toLocaleString("es-ES")}
              <br />
              <button onClick={() => eliminarReporte(reporte.id)}>
                Eliminar ❌
              </button>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default HistorialReportes;
