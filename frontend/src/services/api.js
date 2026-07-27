 import axios from 'axios';

// Cuando desplegues el backend, cambia esta URL por la pública
const api = axios.create({
  baseURL: 'http://localhost:3000'
});

export default api;