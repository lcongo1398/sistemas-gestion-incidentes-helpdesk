import api from './api';

export const listTickets = () => api.get('/tickets').then(res => res.data);
export const createTicket = (payload) => api.post('/tickets', payload).then(res => res.data);
export const updateTicket = (id, payload) => api.put(`/tickets/${id}`, payload).then(res => res.data);
export const deleteTicket = (id) => api.delete(`/tickets/${id}`);
