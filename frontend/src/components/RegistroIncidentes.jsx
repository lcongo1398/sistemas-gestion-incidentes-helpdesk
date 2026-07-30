import React, { useState } from 'react';

export const RegistroIncidentes = ({ onCrear }) => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [prioridad, setPrioridad] = useState('Media');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!titulo || !descripcion) return;
    onCrear({ titulo, descripcion, prioridad });
    setTitulo('');
    setDescripcion('');
  };

  return (
    <div className="card">
      <h3>Registrar Incidencia</h3>
      <form onSubmit={handleSubmit}>
        <input 
          placeholder="Título del Incidente" 
          value={titulo} 
          onChange={(e) => setTitulo(e.target.value)} 
          required 
        />
        <textarea 
          placeholder="Descripción detallada" 
          value={descripcion} 
          onChange={(e) => setDescripcion(e.target.value)} 
          required 
        />
        <select value={prioridad} onChange={(e) => setPrioridad(e.target.value)}>
          <option value="Baja">Prioridad Baja</option>
          <option value="Media">Prioridad Media</option>
          <option value="Alta">Prioridad Alta</option>
        </select>
        <button type="submit">Crear Ticket</button>
      </form>
    </div>
  );
};