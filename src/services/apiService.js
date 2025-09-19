const API_BASE_URL = import.meta.env.DEV
  ? '' // i hosting bruger jeg Vite's proxy da ulr er forskellige
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

// API CRUD for trips
export const apiService = {
  // Trip
  async getTrips() {
    return apiFetch('/api/trips');
  },

  async getTrip(id) {
    return apiFetch(`/api/trips/${id}`);
  },

  async createTrip(tripData) {
    return apiFetch('/api/trips', {
      method: 'POST',
      body: JSON.stringify(tripData),
    });
  },

  async updateTrip(id, tripData) {
    return apiFetch(`/api/trips/${id}`, {
      method: 'PUT',
      body: JSON.stringify(tripData),
    });
  },

  async deleteTrip(id) {
    return apiFetch(`/api/trips/${id}`, {
      method: 'DELETE',
    });
  },

  async getUserTrips(userId) {
    return apiFetch(`/api/users/${userId}/trips`);
  },


  // Anmeldelse
  async getReviews() {
    return apiFetch('/api/reviews');
  },

  async getReviewsByTrip(tripId) {
    return apiFetch(`/api/reviews/trip/${tripId}`);
  },

  // anmeldelse efter ID
  async getReview(id) {
    return apiFetch(`/api/reviews/byId/${id}`);
  },

  async createReview(reviewData) {
    return apiFetch('/api/reviews', {
      method: 'POST',
      body: JSON.stringify(reviewData),
    });
  },

  async updateReview(id, reviewData) {
    return apiFetch(`/api/reviews/${id}`, {
      method: 'PUT',
      body: JSON.stringify(reviewData),
    });
  },

  async deleteReview(id) {
    return apiFetch(`/api/reviews/${id}`, {
      method: 'DELETE',
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

  // henter brugerens anmeldelser
  async getUserReviews(userId) {
    return apiFetch(`/api/reviews/byUser/${userId}`);
  },

  async getMyWrittenReviews() {
    return apiFetch('/api/reviews');
  },

  // Henter anmeldelser for en specifik bruger
  async getReviewsByUser(userId) {
    return apiFetch(`/api/reviews/byUser/${userId}`);
  },

  async createBooking(bookingData) {
    return apiFetch('/api/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    });
  },

  async deleteBooking(id) {
    return apiFetch(`/api/bookings/${id}`, {
      method: 'DELETE',
    });
  },

  async getBookingsByUser() {
    return apiFetch(`/api/bookings/byUser`);
  },

  // Slides
  async getSlides() {
    return apiFetch('/api/slides');
  },
  async getContent(id) {
    return apiFetch(`/api/content/${id}`);  
  }
}; 