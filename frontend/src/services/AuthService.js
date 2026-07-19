// Placeholder AuthService.js
export const authService = {
    login: async (username, password) => {
        return { success: true, user: { username } };
    },
    logout: () => {
        console.log("Logged out");
    }
};
