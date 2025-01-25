import axios from 'axios';

const apiClient = axios.create({
	baseURL: process.env.API_BASE_URL || 'http://localhost:3010/v1',
	timeout: 10000, // Timeout after 10 seconds
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	},
});

// Add a request interceptor
// apiClient.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('authToken'); // Example: Get token from localStorage
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Add a response interceptor
// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       // Handle unauthorized error
//       console.error('Unauthorized! Redirecting to login...');
//     }
//     return Promise.reject(error);
//   }
// );

export default apiClient;