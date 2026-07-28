import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL || 'https://sistemas-gestion-incidentes-helpdesk-h8dy.vercel.app/api';

const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
});

export default api;