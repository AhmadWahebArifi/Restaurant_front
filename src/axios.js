// src/axios.js
import axios from "axios";
import { mockAPI } from "./mockAPI.js";

// Use environment variable or fallback to localhost for development
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  // Add timeout to prevent hanging requests
  timeout: 10000,
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
    // Handle network errors and timeouts
    if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
      console.log("Request timeout - API server might be unavailable");
      return Promise.reject(new Error("API server is not available"));
    }
    
    // Handle 401 Unauthorized - clear token and redirect to login
    if (error.response?.status === 401) {
      localStorage.removeItem("auth-token");
      localStorage.removeItem("loggedIn");
      console.log("Session expired, please login again");
    }
    
    // Handle 404 and other server errors
    if (error.response?.status >= 500) {
      console.log("Server error:", error.response.status);
    }
    
    return Promise.reject(error);
  }
);

// Helper methods for common API calls with fallback to mock API
export const authAPI = {
  // Login
  login: async (email, password) => {
    try {
      return await api.post("/api/login", { email, password });
    } catch (error) {
      console.log("Using mock API for login");
      return await mockAPI.login(email, password);
    }
  },

  // Register
  register: async (userData) => {
    try {
      return await api.post("/api/register", userData);
    } catch (error) {
      console.log("Using mock API for register");
      return await mockAPI.register(userData);
    }
  },

  // Logout
  logout: async () => {
    try {
      return await api.post("/api/logout");
    } catch (error) {
      console.log("Using mock API for logout");
      return await mockAPI.logout();
    }
  },

  // Get user profile
  getUser: async () => {
    try {
      return await api.get("/api/user");
    } catch (error) {
      console.log("Using mock API for getUser");
      return await mockAPI.getUser();
    }
  },
};

// Export the main api instance for custom requests
export default api;
