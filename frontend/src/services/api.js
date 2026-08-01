import axios from "axios";

// Create a pre-configured Axios instance pointing to the backend
const api = axios.create({
    baseURL: "http://localhost:5000"
});

// Request interceptor to dynamically inject the JWT token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle token expiry / unauthorized states globally
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            // Token expired or invalid, purge auth session
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            // If in browser context, trigger page refresh to force redirect to login
            if (typeof window !== "undefined") {
                window.location.reload();
            }
        }
        return Promise.reject(error);
    }
);

export default api;
