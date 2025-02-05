import axios from 'axios';
import Cookies from 'js-cookie';

export const getAuthToken = () => {
  return Cookies.get('auth_token');
};

const apiClient = axios.create({
	baseURL: process.env.API_BASE_URL || 'http://localhost:3010/v1',
	timeout: 10000,
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	},
});

// Add Authorization token to every request
apiClient.interceptors.request.use(
	(config) => {
		const token = getAuthToken();
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// Handle Unauthorized (401) responses & redirect to /login
apiClient.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === 401) {
			Cookies.remove('auth_token'); // Clear invalid token
		if (typeof window !== 'undefined') {
			window.location.href = '/login'; // Redirect to login page
		}
		}

		return Promise.reject(error);
	}
);

export default apiClient;