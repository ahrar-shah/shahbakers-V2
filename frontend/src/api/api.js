import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
});

// attach token
API.interceptors.request.use(req => {
  const token = localStorage.getItem('token');
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default {
  // auth
  register: (data) => API.post('/auth/register', data),
  login: (data) => API.post('/auth/login', data),

  // menu
  getMenu: () => API.get('/menu'),
  getMenuItem: (id) => API.get(`/menu/${id}`),

  // orders
  createOrder: (data) => API.post('/orders', data),
  getMyOrders: () => API.get('/orders/my'),

  // admin protected
  adminGetOrders: () => API.get('/orders'),
  adminUpdateOrderStatus: (id, data) => API.put(`/orders/${id}/status`, data),
  adminCreateMenu: (data) => API.post('/menu', data),
  adminUpdateMenu: (id, data) => API.put(`/menu/${id}`, data),
  adminDeleteMenu: (id) => API.delete(`/menu/${id}`)
};
