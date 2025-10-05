import axios from 'axios';

const API_BASE_URL = 'http://localhost:8082/api';

export const serverHealthService = {
    checkServerStatus: async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/health/status`);
            return {
                status: 'online',
                message: response.data.data || 'API is running'
            };
        } catch (error) {
            return {
                status: 'offline',
                message: 'API server is not responding'
            };
        }
    },
    
    testAuthentication: async () => {
        console.log('Testing authentication status...');
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                console.log('No token found in localStorage');
                return {
                    authenticated: false,
                    message: 'No authentication token found'
                };
            }
            
            console.log('Testing auth endpoint with token:', token);
            
            const response = await axios.get(`${API_BASE_URL}/health/auth-status`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            console.log('Auth test response:', response.data);
            
            return {
                authenticated: true,
                message: response.data.data || 'Authentication successful'
            };
        } catch (error) {
            console.error('Authentication test failed:', error);
            return {
                authenticated: false,
                message: error.response?.data?.message || 'Authentication check failed'
            };
        }
    },
    
    debugToken: async () => {
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                return {
                    valid: false,
                    message: 'No token found'
                };
            }
            
            const response = await axios.get(`${API_BASE_URL}/health/token-debug`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            return {
                valid: true,
                details: response.data.data
            };
        } catch (error) {
            return {
                valid: false,
                message: error.response?.data?.message || 'Token validation failed'
            };
        }
    }
};