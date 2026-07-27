import { Link } from 'react-router-dom';

function Navegacion() {
  return (
    <nav style={estilos.nav}>
      <h2>Help Desk - Gestión de Incidentes</h2>
      <div style={estilos.enlaces}>
        <Link to="/" style={estilos.link}>Inicio</Link>
        <Link to="/registrar" style={estilos.link}>Reportar Incidente</Link>
        <Link to="/tickets" style={estilos.link}>Ver Todos</Link>
      </div>
    </nav>
  );
}

const estilos = {
  nav: { padding: '1rem', background: '#2c3e50', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' },
  enlaces: { display: 'flex', gap: '1.5rem' },
  link: { color: 'white', textDecoration: 'none', fontWeight: '500' }
};

export default Navegacion;