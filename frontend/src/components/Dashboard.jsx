import React from 'react';

export const Dashboard = ({ tickets }) => {
  const total = tickets.length;
  const abiertos = tickets.filter(t => t.estado === 'Abierto').length;
  const enProceso = tickets.filter(t => t.estado === 'En Proceso').length;
  const cerrados = tickets.filter(t => t.estado === 'Cerrado').length;

  return (
    <div className="dashboard-grid">
      <div className="card"><h3>Total Tickets</h3><p>{total}</p></div>
      <div className="card"><h3>Abiertos</h3><p>{abiertos}</p></div>
      <div className="card"><h3>En Proceso</h3><p>{enProceso}</p></div>
      <div className="card"><h3>Cerrados</h3><p>{cerrados}</p></div>
    </div>
  );
};