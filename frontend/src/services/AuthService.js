import api from "./api";

export const authService = {
    login: async (username, password) => {
        try {
            const response = await api.post("/auth/login", { username, password });
            if (response.data && response.data.token) {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("user", JSON.stringify(response.data.user));
            }
            return response.data;
        } catch (error) {
            console.error("Login service error:", error);
            throw error;
        }
    },

    register: async (username, email, password, role = "User") => {
        try {
            const response = await api.post("/auth/register", { username, email, password, role });
            return response.data;
        } catch (error) {
            console.error("Registration service error:", error);
            throw error;
        }
    },

    logout: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    },

    getCurrentUser: () => {
        const user = localStorage.getItem("user");
        return user ? JSON.parse(user) : null;
    },

    isAuthenticated: () => {
        return !!localStorage.getItem("token");
    }
};
