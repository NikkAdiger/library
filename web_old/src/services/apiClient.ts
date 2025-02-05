import axios from 'axios';

const apiClient = axios.create({
	baseURL: process.env.API_BASE_URL || 'http://localhost:3010/v1',
	timeout: 10000, // Timeout after 10 seconds
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	},
});

export default apiClient;