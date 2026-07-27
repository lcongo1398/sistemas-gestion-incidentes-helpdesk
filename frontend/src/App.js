import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navegacion from './components/Navegacion';
import Dashboard from './components/Dashboard';
import RegistroTicket from './components/RegistroTicket';
import ListadoTickets from './components/ListadoTickets';

function App() {
  return (
    <Router>
      <Navegacion />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/registrar" element={<RegistroTicket />} />
        <Route path="/tickets" element={<ListadoTickets />} />
      </Routes>
    </Router>
  );
}

export default App;