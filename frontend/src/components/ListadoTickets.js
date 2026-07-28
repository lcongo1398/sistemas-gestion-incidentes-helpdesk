import { useState, useEffect } from 'react';
import { listTickets, updateTicket, deleteTicket } from '../services/ticketService';
import DOMPurify from 'dompurify';

function ListadoTickets() {
  const [tickets, setTickets] = useState([]);
  const [editando, setEditando] = useState(null);
  const [datosEdit, setDatosEdit] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const cargar = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await listTickets();
      setTickets(data);
    } catch (err) {
      console.error(err);
      setError('Error al cargar tickets');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  const eliminar = async (id) => {
    if (window.confirm('¿Eliminar este ticket?')) {
      try {
        await deleteTicket(id);
        await cargar();
      } catch (err) {
        console.error(err);
        alert('Error al eliminar');
      }
    }
  };

  const iniciarEdicion = (t) => {
    setEditando(t.id);
    setDatosEdit({
      titulo: t.titulo || '',
      descripcion: t.descripcion || '',
      categoria: t.categoria || 'Red',
      prioridad: t.prioridad || 'Media',
      estado: t.estado || 'Abierto'
    });
  };

  const actualizar = async () => {
    const limpio = {
      titulo: DOMPurify.sanitize(datosEdit.titulo || ''),
      descripcion: DOMPurify.sanitize(datosEdit.descripcion || ''),
      categoria: DOMPurify.sanitize(datosEdit.categoria || ''),
      prioridad: DOMPurify.sanitize(datosEdit.prioridad || ''),
      estado: DOMPurify.sanitize(datosEdit.estado || '')
    };

    try {
      await updateTicket(editando, limpio);
      setEditando(null);
      await cargar();
    } catch (err) {
      console.error(err);
      alert('Error al actualizar');
    }
  };

  if (loading) return <div style={{ padding: '2rem' }}>Cargando tickets...</div>;
  if (error) return <div style={{ padding: '2rem', color: 'red' }}>{error}</div>;

  return (
    <div style={estilos.contenedor}>
      <h1>Listado de Incidentes</h1>
      <div style={estilos.tabla}>
        <div style={estilos.filaCabecera}>
          <div style={estilos.celda}>Título</div>
          <div style={estilos.celda}>Categoría</div>
          <div style={estilos.celda}>Prioridad</div>
          <div style={estilos.celda}>Estado</div>
          <div style={estilos.celda}>Acciones</div>
        </div>

        {tickets.map(t => (
          editando === t.id ? (
            <div key={t.id} style={estilos.fila}>
              <input value={datosEdit.titulo} onChange={(e) => setDatosEdit({ ...datosEdit, titulo: e.target.value })} style={estilos.inputSmall} />
              <input value={datosEdit.categoria} onChange={(e) => setDatosEdit({ ...datosEdit, categoria: e.target.value })} style={estilos.inputSmall} />
              <select value={datosEdit.prioridad} onChange={(e) => setDatosEdit({ ...datosEdit, prioridad: e.target.value })} style={estilos.inputSmall}>
                <option value="Baja">Baja</option>
                <option value="Media">Media</option>
                <option value="Alta">Alta</option>
              </select>
              <select value={datosEdit.estado} onChange={(e) => setDatosEdit({ ...datosEdit, estado: e.target.value })} style={estilos.inputSmall}>
                <option value="Abierto">Abierto</option>
                <option value="En proceso">En proceso</option>
                <option value="Cerrado">Cerrado</option>
              </select>
              <div style={estilos.acciones}>
                <button onClick={actualizar} style={{ ...estilos.btn, background: '#27ae60' }}>Guardar</button>
                <button onClick={() => setEditando(null)} style={{ ...estilos.btn, background: '#95a5a6' }}>Cancelar</button>
              </div>
            </div>
          ) : (
            <div key={t.id} style={estilos.fila}>
              <div style={estilos.celda}>{t.titulo}</div>
              <div style={estilos.celda}>{t.categoria}</div>
              <div style={estilos.celda}>{t.prioridad}</div>
              <div style={estilos.celda}>{t.estado}</div>
              <div style={estilos.acciones}>
                <button onClick={() => iniciarEdicion(t)} style={{ ...estilos.btn, background: '#f39c12' }}>Editar</button>
                <button onClick={() => eliminar(t.id)} style={{ ...estilos.btn, background: '#e74c3c' }}>Eliminar</button>
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
}

const estilos = {
  contenedor: { padding: '2rem', maxWidth: '1200px', margin: '0 auto' },
  tabla: { marginTop: '2rem', borderRadius: '8px', overflow: 'hidden', border: '1px solid #ddd' },
  filaCabecera: { display: 'grid', gridTemplateColumns: '2fr 1.5fr 1fr 1fr 1.5fr', padding: '1rem', background: '#2c3e50', color: 'white', fontWeight: 'bold' },
  fila: { display: 'grid', gridTemplateColumns: '2fr 1.5fr 1fr 1fr 1.5fr', padding: '1rem', borderBottom: '1px solid #eee', alignItems: 'center' },
  celda: { padding: '0 0.5rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
  inputSmall: { padding: '0.4rem', width: '90%', borderRadius: '4px', border: '1px solid #ccc' },
  acciones: { display: 'flex', gap: '0.5rem' },
  btn: { padding: '0.4rem 0.8rem', border: 'none', borderRadius: '4px', color: 'white', cursor: 'pointer' }
};

export default ListadoTickets;
