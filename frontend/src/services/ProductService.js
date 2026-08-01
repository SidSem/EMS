import api from "./api";

const API_URL = "/products";

export const productServices = {
    getAllProducts: async () => {
        const response = await api.get(API_URL);
        return response.data;
    },

    addProduct: async (data) => {
        try {
            const response = await api.post(API_URL, data);
            return response.data;
        } catch (error) {
            console.error("Error adding product:", error);
            throw error;
        }
    },

    updateProduct: async (id, data) => {
        try {
            const response = await api.put(`${API_URL}/${id}`, data);
            return response.data;
        } catch (error) {
            console.error("Error updating product:", error);
            throw error;
        }
    },

    deleteProduct: async (id) => {
        try {
            const response = await api.delete(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error deleting product:", error);
            throw error;
        }
    }
};
