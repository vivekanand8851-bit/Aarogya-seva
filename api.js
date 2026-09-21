import axios from 'axios';

const BASE = process.env.REACT_APP_BACKEND_URL;
export const API = `${BASE}/api`;

const http = axios.create({ baseURL: API });

http.interceptors.request.use((cfg) => {
  const token = localStorage.getItem('aarogya_token');
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

export const api = {
  // auth
  signup: (data) => http.post('/auth/signup', data).then((r) => r.data),
  login: (data) => http.post('/auth/login', data).then((r) => r.data),
  me: () => http.get('/auth/me').then((r) => r.data),

  // products
  listProducts: (params = {}) => http.get('/products', { params }).then((r) => r.data),
  getProduct: (slug) => http.get(`/products/${slug}`).then((r) => r.data),

  // orders
  previewOrder: (data) => http.post('/orders/preview', data).then((r) => r.data),
  createOrder: (data) => http.post('/orders', data).then((r) => r.data),
  verifyPayment: (data) => http.post('/payment/verify', data).then((r) => r.data),
  myOrders: () => http.get('/orders').then((r) => r.data),
  getOrder: (orderNumber) => http.get(`/orders/${orderNumber}`).then((r) => r.data),

  // admin
  adminStats: () => http.get('/admin/stats').then((r) => r.data),
  adminOrders: () => http.get('/admin/orders').then((r) => r.data),
  adminUsers: () => http.get('/admin/users').then((r) => r.data),
  adminUpdateStatus: (orderId, status) =>
    http.put(`/admin/orders/${orderId}/status`, null, { params: { status } }).then((r) => r.data),
  createProduct: (data) => http.post('/products', data).then((r) => r.data),
  updateProduct: (id, data) => http.put(`/products/${id}`, data).then((r) => r.data),
  deleteProduct: (id) => http.delete(`/products/${id}`).then((r) => r.data),
};

export default api;
