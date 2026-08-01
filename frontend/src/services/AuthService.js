import api from "./api";

export const authService = {
    /**
     * Authenticates a user and saves the token to localStorage.
     */
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

    /**
     * Registers a new user.
     */
    register: async (username, email, password, role = "User") => {
        try {
            const response = await api.post("/auth/register", { username, email, password, role });
            return response.data;
        } catch (error) {
            console.error("Registration service error:", error);
            throw error;
        }
    },

    /**
     * Clears session storage and logs the user out.
     */
    logout: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        console.log("Session terminated: User logged out.");
    },

    /**
     * Retrieves currently logged in user info.
     */
    getCurrentUser: () => {
        const user = localStorage.getItem("user");
        return user ? JSON.parse(user) : null;
    },

    /**
     * Checks if a user is currently authenticated.
     */
    isAuthenticated: () => {
        return !!localStorage.getItem("token");
    }
};
