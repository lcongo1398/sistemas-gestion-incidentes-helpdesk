import { useState, useEffect } from 'react';
import api from '../services/api';

function Dashboard() {
  const [estadisticas, setEstadisticas] = useState({ abiertos: 0, cerrados: 0, total: 0 });

  useEffect(() => {
    api.get('/tickets').then(res => {
      const tickets = res.data;
      setEstadisticas({
        total: tickets.length,
        abiertos: tickets.filter(t => t.estado === 'Abierto').length,
        cerrados: tickets.filter(t => t.estado === 'Cerrado').length
      });
    });
  }, []);

  return (
    <div style={estilos.contenedor}>
      <h1>Panel de Control</h1>
      <div style={estilos.tarjetas}>
        <div style={estilos.tarjeta}>
          <h3>Total Tickets</h3>
          <p style={estilos.numero}>{estadisticas.total}</p>
        </div>
        <div style={{...estilos.tarjeta, background: '#e74c3c'}}>
          <h3>Abiertos</h3>
          <p style={estilos.numero}>{estadisticas.abiertos}</p>
        </div>
        <div style={{...estilos.tarjeta, background: '#27ae60'}}>
          <h3>Cerrados</h3>
          <p style={estilos.numero}>{estadisticas.cerrados}</p>
        </div>
      </div>
    </div>
  );
}

const estilos = {
  contenedor: { padding: '2rem', maxWidth: '1200px', margin: '0 auto' },
  tarjetas: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginTop: '2rem' },
  tarjeta: { padding: '1.5rem', borderRadius: '8px', background: '#3498db', color: 'white', textAlign: 'center' },
  numero: { fontSize: '2.5rem', fontWeight: 'bold', margin: 0 }
};

export default Dashboard;