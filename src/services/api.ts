import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = (email: string, password: string) => 
  api.post('/auth/login', { email, password });

export const getProducts = () => 
  api.get('/products');

export const getProduct = (id: string) => 
  api.get(`/products/${id}`);

export const getCart = () => 
  api.get('/cart');

export const addToCart = (productId: string, quantity: number = 1) => 
  api.post('/cart', { productId, quantity });

export default api;

