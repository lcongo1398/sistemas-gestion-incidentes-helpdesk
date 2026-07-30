import { useState } from 'react';
import { createTicket } from '../services/ticketService';
import DOMPurify from 'dompurify';

function RegistroTicket() {
  const [form, setForm] = useState({
    titulo: '',
    descripcion: '',
    categoria: 'Red',
    prioridad: 'Media'
  });

  const cambioCampo = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const enviar = async (e) => {
    e.preventDefault();
    const datosLimpios = {
      titulo: DOMPurify.sanitize(form.titulo),
      descripcion: DOMPurify.sanitize(form.descripcion),
      categoria: DOMPurify.sanitize(form.categoria),
      prioridad: DOMPurify.sanitize(form.prioridad),
      estado: 'Abierto'
    };

    try {
      await createTicket(datosLimpios);
      alert('✅ Incidente registrado correctamente');
      setForm({ titulo: '', descripcion: '', categoria: 'Red', prioridad: 'Media' });
    } catch (err) {
      alert('❌ Error: revisa que llenes todo y uses las opciones correctas');
      console.error(err);
    }
  };

  return (
    <div style={estilos.contenedor}>
      <h1 style={estilos.tituloPagina}>Reportar Nuevo Incidente</h1>
      <form onSubmit={enviar} style={estilos.formulario}>
        <div style={estilos.campo}>
          <label style={estilos.etiqueta}>Título del problema:</label>
          <input
            type="text"
            name="titulo"
            placeholder="Título del problema"
            value={form.titulo}
            onChange={cambioCampo}
            required
            style={estilos.entrada}
          />
        </div>

        <div style={estilos.campo}>
          <label style={estilos.etiqueta}>Descripción detallada:</label>
          <textarea
            name="descripcion"
            placeholder="Describe qué sucede..."
            value={form.descripcion}
            onChange={cambioCampo}
            required
            rows="4"
            style={estilos.areaTexto}
          ></textarea>
        </div>

        <div style={estilos.campo}>
          <label style={estilos.etiqueta}>Categoría:</label>
          <select name="categoria" value={form.categoria} onChange={cambioCampo} required style={estilos.seleccion}>
            <option value="Red">Red</option>
            <option value="Hardware">Hardware</option>
            <option value="Software">Software</option>
          </select>
        </div>

        <div style={estilos.campo}>
          <label style={estilos.etiqueta}>Prioridad:</label>
          <select name="prioridad" value={form.prioridad} onChange={cambioCampo} required style={estilos.seleccion}>
            <option value="Alta">Alta</option>
            <option value="Media">Media</option>
            <option value="Baja">Baja</option>
          </select>
        </div>

        <button type="submit" style={estilos.boton}>Guardar Incidente</button>
      </form>
    </div>
  );
}

const estilos = {
  contenedor: {
    padding: '2rem',
    maxWidth: '800px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif'
  },
  tituloPagina: {
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: '2rem'
  },
  formulario: {
    backgroundColor: '#f8f9fa',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  campo: { marginBottom: '1.5rem' },
  etiqueta: { display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#34495e' },
  entrada: { width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px', fontSize: '1rem' },
  areaTexto: { width: '100%', padding: '0.75rem', border: '1px solid '#ddd', borderRadius: '4px', fontSize: '1rem', resize: 'vertical' },
  seleccion: { width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px', fontSize: '1rem', backgroundColor: 'white' },
  boton: { backgroundColor: '#3498db', color: 'white', padding: '0.75rem 1.5rem', border: 'none', borderRadius: '4px', fontSize: '1rem', cursor: 'pointer', width: '100%' }
};

export default RegistroTicket;
