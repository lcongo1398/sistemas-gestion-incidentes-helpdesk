import React from 'react';

export const ListadoTickets = ({ tickets, onActualizar, onEliminar }) => {
  return (
    <div className="card">
      <h3>Listado de Tickets</h3>
      {tickets.length === 0 ? <p>No hay registros.</p> : tickets.map((t) => (
        <div key={t._id} className="card ticket-item">
          <div>
            <h4>{t.titulo}</h4>
            <p>{t.descripcion}</p>
            <span className={`badge badge-${t.estado.replace(' ', '-')}`}>{t.estado}</span>
            <small> | Prioridad: {t.prioridad}</small>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexDirection: 'column' }}>
            <select value={t.estado} onChange={(e) => onActualizar(t._id, e.target.value)}>
              <option value="Abierto">Abierto</option>
              <option value="En Proceso">En Proceso</option>
              <option value="Cerrado">Cerrado</option>
            </select>
            <button onClick={() => onEliminar(t._id)} style={{ background: '#dc2626' }}>
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};