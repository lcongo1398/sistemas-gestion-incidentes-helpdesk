import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

// 🛠️ Se quitaron las llaves { } de las importaciones para coincidir con export default
import Navegacion from './components/Navegacion';
import Dashboard from './components/Dashboard';
import RegistroIncidentes from './components/RegistroIncidentes';
import ListadoTickets from './components/ListadoTickets';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/tickets';

function App() {
  const [tickets, setTickets] = useState([]);

  const cargarTickets = async () => {
    try {
      const res = await axios.get(API_URL);
      setTickets(res.data);
    } catch (err) {
      console.error("Error al cargar tickets", err);
    }
  };

  useEffect(() => { cargarTickets(); }, []);

  const crearTicket = async (nuevoTicket) => {
    await axios.post(API_URL, nuevoTicket);
    cargarTickets();
  };

  const actualizarEstado = async (id, nuevoEstado) => {
    await axios.put(`${API_URL}/${id}`, { estado: nuevoEstado });
    cargarTickets();
  };

  const eliminarTicket = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    cargarTickets();
  };

  return (
    <div>
      <Navegacion />
      <div className="container">
        <Dashboard tickets={tickets} />
        <div className="main-layout">
          <RegistroIncidentes onCrear={crearTicket} />
          <ListadoTickets
            tickets={tickets}
            onActualizar={actualizarEstado}
            onEliminar={eliminarTicket}
          />
        </div>
      </div>
    </div>
  );
}

export default App;