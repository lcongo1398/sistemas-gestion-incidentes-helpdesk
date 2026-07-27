import { useState, useEffect } from 'react';
import api from '../services/api';
import DOMPurify from 'dompurify';

function ListadoTickets() {
  const [tickets, setTickets] = useState([]);
  const [editando, setEditando] = useState(null);
  const [datosEdit, setDatosEdit] = useState({});

  const cargar = () => {
    api.get('/tickets').then(res => setTickets(res.data));
  };

  useEffect(cargar, []);

  const eliminar = async (id) => {
    if(window.confirm('¿Eliminar este ticket?')){
      await api.delete(`/tickets/${id}`);
      cargar();
    }
  };

  const actualizar = async () => {
    const limpio = {
      titulo: DOMPurify.sanitize(datosEdit.titulo),
      descripcion: DOMPurify.sanitize(datosEdit.descripcion),
      categoria: DOMPurify.sanitize(datosEdit.categoria),
      prioridad: DOMPurify.sanitize(datosEdit.prioridad),
      estado: DOMPurify.sanitize(datosEdit.estado)
    };
    await api.put(`/tickets/${editando}`, limpio);
    setEditando(null);
    cargar();
  };

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
              <input defaultValue={t.titulo} onChange={(e)=>setDatosEdit({...datosEdit, titulo:e.target.value})} style={estilos.inputSmall}/>
              <input defaultValue={t.categoria} onChange={(e)=>setDatosEdit({...datosEdit, categoria:e.target.value})} style={estilos.inputSmall}/>
              <select defaultValue={t.prioridad} onChange={(e)=>setDatosEdit({...datosEdit, prioridad:e.target.value})} style={estilos.inputSmall}>
                <option>Baja</option><option>Media</option><option>Alta</option><option>Urgente</option>
              </select>
              <select defaultValue={t.estado} onChange={(e)=>setDatosEdit({...datosEdit, estado:e.target.value})} style={estilos.inputSmall}>
                <option>Abierto</option><option>En proceso</option><option>Cerrado</option>
              </select>
              <div style={estilos.acciones}>
                <button onClick={actualizar} style={{...estilos.btn, background:'#27ae60'}}>Guardar</button>
                <button onClick={()=>setEditando(null)} style={{...estilos.btn, background:'#95a5a6'}}>Cancelar</button>
              </div>
            </div>
          ) : (
            <div key={t.id} style={estilos.fila}>
              <div style={estilos.celda}>{t.titulo}</div>
              <div style={estilos.celda}>{t.categoria}</div>
              <div style={estilos.celda}>{t.prioridad}</div>
              <div style={estilos.celda}>{t.estado}</div>
              <div style={estilos.acciones}>
                <button onClick={()=>{setEditando(t.id); setDatosEdit(t)}} style={{...estilos.btn, background:'#f39c12'}}>Editar</button>
                <button onClick={()=>eliminar(t.id)} style={{...estilos.btn, background:'#e74c3c'}}>Eliminar</button>
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
  celda: { padding: '0 0.5rem' },
  inputSmall: { padding: '0.4rem', width: '90%', borderRadius: '4px', border: '1px solid #ccc' },
  acciones: { display: 'flex', gap: '0.5rem' },
  btn: { padding: '0.4rem 0.8rem', border: 'none', borderRadius: '4px', color: 'white', cursor: 'pointer' }
};

export default ListadoTickets;