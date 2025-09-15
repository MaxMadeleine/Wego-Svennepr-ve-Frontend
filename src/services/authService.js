import axios from 'axios';

const API_BASE_URL = import.meta.env.DEV
  ? ''
  : import.meta.env.VITE_API_URL;

// her bruger jeg axios blandt andet pga den automatisk parser mit data i json :D
// Laver axios instance med base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 sek
});

// Laver en "request interceptor" for at inkludere en auth token
api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Laver en "response interceptor" for at håndtere fornyelse af token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = sessionStorage.getItem('refreshToken');
        if (refreshToken) {
          const response = await axios.post(`${API_BASE_URL}/api/auth/refresh`, {
            refreshToken: refreshToken, // Ændret til at matche backend
          });

          const { accessToken } = response.data; // Ændret til at matche backend
          sessionStorage.setItem('accessToken', accessToken);

          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Clear tokens og redirect til login
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('refreshToken');
        sessionStorage.removeItem('user');
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export const authService = {
  async login(email, password) {
    try {
      const response = await api.post('api/auth/login', {
        username: email, // Backend forventer 'username'
        password,
      });

      const { accessToken, refreshToken, user } = response.data;

      // Gem tokens i sessionStorage
      sessionStorage.setItem('accessToken', accessToken);
      sessionStorage.setItem('refreshToken', refreshToken);
      sessionStorage.setItem('user', JSON.stringify(user));

      return {
        accessToken,
        refreshToken,
        user: {
          id: user.id,
          name: user.name,
          email: email
        }
      };
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login fejlede');
    }
  },

  async register(userData) {
    try {
      const response = await api.post('api/users', userData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Registrering fejlede');
    }
  },

  async verifyToken() {
    try {
      const response = await api.get('api/auth/verify');
      const { userId } = response.data;
      return { userId };
    } catch (error) {
      throw new Error('Token verifikation fejlede');
    }
  },

  async refreshToken(refreshToken) {
    try {
      const response = await api.post('api/auth/refresh', {
        refreshToken: refreshToken // Ændret til at matche backend
      });
      return response.data;
    } catch (error) {
      throw new Error('Token fornyelse fejlede');
    }
  },

  logout() {
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');
    sessionStorage.removeItem('user');
  }
}; 