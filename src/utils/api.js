import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized errors
    if (error.response?.status === 401) {
      // Clear auth data and redirect to login
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
      localStorage.removeItem('isAuthenticated');
      
      // Redirect to login page
      window.location.href = '/TenantLogin';
    }
    return Promise.reject(error);
  }
);

// Messaging API functions - Only the available endpoint
export const messagingAPI = {
  // Send a new message - Matches backend API expectations
  sendMessage: async (messageData) => {
    try {
      // Only send the fields that the backend expects
      const backendPayload = {
        receiverId: messageData.receiverId,
        content: messageData.content,
        propertyId: messageData.propertyId
      };

      console.log('📤 Sending to backend:', backendPayload);
      
      const response = await api.post('/api/v1/message/send', backendPayload);
      
      // Return the data field from the response
      return response.data.data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }
};

export default api; 