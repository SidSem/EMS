import axios from "axios";

const API_URL = "http://localhost:5000/products";

export const productServices = {
    getAllProducts: async () => {
        const response = await axios.get(API_URL);
        return response.data;
    },

    addProduct: async (data) => {
        try {
            const response = await axios.post(API_URL, data);
            return response.data;
        } catch (error) {
            console.error("Error adding product:", error);
            throw error;
        }
    }
};