const API_BASE_URL = import.meta.env.DEV
  ? '' // In development, rely on Vite's proxy, so base URL is relative
  : import.meta.env.VITE_API_URL ;

// auth-token fra sessionStorage
const getAuthToken = () => {
  return sessionStorage.getItem('accessToken');
};

// check API-svar og kast fejl hvis ikke ok
const handleResponse = async (response) => {
  if (!response.ok) {
    // parse fejlbeskeden, eller send besked
    const error = await response.json().catch(() => ({ message: 'Netværksfejl' }));
    // opret og kast error
    throw new Error(error.message || `HTTP fejl! status: ${response.status}`);
  }
  return response.json(); 
};

const apiFetch = async (endpoint, options = {}) => {
  const token = getAuthToken();
  const config = {
    headers: {
      'Content-Type': 'application/json', // Standard header for JSON og custom headers kan jeg tilføje her
      ...(token && { Authorization: `Bearer ${token}` }), // adder auth-header, hvis token findes
      ...options.headers, // til ekstra headers (evt admin)
    },
    ...options, // Tilføjer andre fetch-indstillinger (bruges som prop så de altid kommer med)
  };

  // Udfører fetch-kald til API'et
  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  return handleResponse(response); 
};

// API CRUD for produkter
export const apiService = {
  // Produkt
  async getProducts() {
    return apiFetch('/api/products');
  },

  async getProduct(slug) {
    return apiFetch(`/api/products/${slug}`);
  },

  async getProductsByCategory(slug) {
    return apiFetch(`/api/products/category/${slug}`);
  },

  async createProduct(productData) {
    return apiFetch('/api/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  },

  async updateProduct(id, productData) {
    return apiFetch(`/api/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    });
  },

  async deleteProduct(id) {
    return apiFetch(`/api/products/${id}`, {
      method: 'DELETE',
    });
  },

  async getUserProducts(userId) {
    return apiFetch(`/api/products/user/${userId}`);
  },

  // Kategori
  async getCategories() {
    return apiFetch('/api/categories');
  },

  async getCategory(id) {
    return apiFetch(`/api/categories/${id}`);
  },

  // Anmeldelse
  async getReviews() {
    return apiFetch('/api/comments');
  },

  async getReviewsByProduct(productId) {
    return apiFetch(`/api/comments/${productId}`);
  },

  async createReview(reviewData) {
    return apiFetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify(reviewData),
    });
  },

  async updateReview(id, reviewData) {
    return apiFetch(`/api/comments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(reviewData),
    });
  },

  async deleteReview(id) {
    return apiFetch(`/api/comments/${id}`, {
      method: 'DELETE',
    });
  },


  // Newsletter
  async subscribeToNewsletter(email) {
    return apiFetch('/api/newsletters', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },

  // Bruger
  async getUser(id) {
    return apiFetch(`/api/users/${id}`);
  },

  async updateUser(id, userData) {
    return apiFetch(`/api/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  },

  async deleteUser(id) {
    return apiFetch(`/api/users/${id}`, {
      method: 'DELETE',
    });
  },

  // henter brugerens kommentare
  async getUserReviews() {
    return apiFetch('/api/comments');
  }
}; 