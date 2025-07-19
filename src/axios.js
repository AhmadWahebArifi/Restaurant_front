// src/axios.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor to automatically add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth-token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("Token added to request:", config.url);
    } else {
      console.log("No token found for request:", config.url);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized - clear token and redirect to login
    if (error.response?.status === 401) {
      localStorage.removeItem("auth-token");
      localStorage.removeItem("loggedIn");
      // You can add redirect logic here if needed
      console.log("Session expired, please login again");
    }
    return Promise.reject(error);
  }
);

// Helper methods for common API calls
export const authAPI = {
  // Login
  login: (email, password) => api.post("/api/login", { email, password }),

  // Register
  register: (userData) => api.post("/api/register", userData),

  // Logout
  logout: () => api.post("/api/logout"),

  // Get user profile
  getUser: () => api.get("/api/user"),
};

// Export the main api instance for custom requests
export default api;
