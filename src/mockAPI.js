// Mock API for demonstration purposes
const mockUsers = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "admin" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "user" },
];

const mockProducts = [
  { id: 1, name: "Pizza Margherita", price: 12.99, category: "Pizza" },
  { id: 2, name: "Burger", price: 8.99, category: "Burgers" },
  { id: 3, name: "Pasta Carbonara", price: 14.99, category: "Pasta" },
];

const mockOrders = [
  { id: 1, customer: "John Doe", total: 25.98, status: "completed", date: "2024-01-15" },
  { id: 2, customer: "Jane Smith", total: 18.99, status: "pending", date: "2024-01-16" },
];

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const mockAPI = {
  // Auth endpoints
  login: async (email, password) => {
    await delay(500);
    if (email === "admin@example.com" && password === "password") {
      return {
        data: {
          success: true,
          token: "mock-jwt-token",
          user: { name: "Admin User", email: "admin@example.com" }
        }
      };
    }
    throw new Error("Invalid credentials");
  },

  register: async (userData) => {
    await delay(500);
    return {
      data: {
        success: true,
        token: "mock-jwt-token",
        user: userData
      }
    };
  },

  logout: async () => {
    await delay(200);
    return { data: { success: true } };
  },

  getUser: async () => {
    await delay(300);
    return {
      data: {
        name: "Admin User",
        email: "admin@example.com",
        role: "admin"
      }
    };
  },

  // Users endpoints
  getUsers: async () => {
    await delay(400);
    return { data: mockUsers };
  },

  createUser: async (userData) => {
    await delay(500);
    const newUser = { id: mockUsers.length + 1, ...userData };
    mockUsers.push(newUser);
    return { data: newUser };
  },

  // Products endpoints
  getProducts: async () => {
    await delay(400);
    return { data: mockProducts };
  },

  createProduct: async (productData) => {
    await delay(500);
    const newProduct = { id: mockProducts.length + 1, ...productData };
    mockProducts.push(newProduct);
    return { data: newProduct };
  },

  // Orders endpoints
  getOrders: async () => {
    await delay(400);
    return { data: mockOrders };
  },

  createOrder: async (orderData) => {
    await delay(500);
    const newOrder = { id: mockOrders.length + 1, ...orderData };
    mockOrders.push(newOrder);
    return { data: newOrder };
  },

  // Analytics endpoints
  getAnalytics: async () => {
    await delay(300);
    return {
      data: {
        totalSales: 15420.50,
        totalOrders: 245,
        averageOrderValue: 62.94,
        topProducts: [
          { name: "Pizza Margherita", sales: 45 },
          { name: "Burger", sales: 38 },
          { name: "Pasta Carbonara", sales: 32 }
        ]
      }
    };
  }
}; 