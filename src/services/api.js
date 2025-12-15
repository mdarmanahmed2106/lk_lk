import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add token to requests if available
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Auth API
export const authAPI = {
    register: (userData) => api.post('/auth/register', userData),
    login: (credentials) => api.post('/auth/login', credentials),
    getMe: () => api.get('/auth/me'),
    updateProfile: (userData) => api.put('/auth/updatedetails', userData)
};

// Booking API
export const bookingAPI = {
    create: (bookingData) => api.post('/bookings', bookingData),
    getAll: () => api.get('/bookings'),
    getMyBookings: () => api.get('/bookings/my-bookings'),
    getById: (id) => api.get(`/bookings/${id}`),
    update: (id, data) => api.patch(`/bookings/${id}`, data),
    cancel: (id) => api.delete(`/bookings/${id}`)
};

// Service API
export const serviceAPI = {
    getAll: (params) => api.get('/services', { params }),
    getByCategory: (category) => api.get(`/services/category/${category}`),
    getById: (id) => api.get(`/services/${id}`),
    create: (data) => api.post('/services', data),
    update: (id, data) => api.put(`/services/${id}`, data),
    delete: (id) => api.delete(`/services/${id}`),
    toggleStatus: (id) => api.patch(`/services/${id}/toggle`)
};

export default api;
