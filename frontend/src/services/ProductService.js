// import api from "./api";

// const API_URL = "/products";
let mockProducts = [
    { _id: '1', name: 'MacBook Pro 16"', description: 'M3 Max, 36GB RAM, 1TB SSD', price: 3499, category: 'Electronics', stock: 15 },
    { _id: '2', name: 'Logitech MX Master 3S', description: 'Wireless Performance Mouse', price: 99, category: 'Accessories', stock: 45 },
    { _id: '3', name: 'Dell UltraSharp 27"', description: '4K USB-C Monitor', price: 550, category: 'Electronics', stock: 20 }
];

export const productServices = {
    getAllProducts: async () => {
        // const response = await api.get(API_URL);
        // return response.data;
        return [...mockProducts];
    },

    addProduct: async (data) => {
        try {
            // const response = await api.post(API_URL, data);
            // return response.data;
            const newProd = { ...data, _id: Date.now().toString() };
            mockProducts.push(newProd);
            return newProd;
        } catch (error) {
            console.error("Error adding product:", error);
            throw error;
        }
    },

    updateProduct: async (id, data) => {
        try {
            // const response = await api.put(`${API_URL}/${id}`, data);
            // return response.data;
            const index = mockProducts.findIndex(p => p._id === id);
            if (index !== -1) {
                mockProducts[index] = { ...mockProducts[index], ...data };
                return mockProducts[index];
            }
            throw new Error("Product not found");
        } catch (error) {
            console.error("Error updating product:", error);
            throw error;
        }
    },

    deleteProduct: async (id) => {
        try {
            // const response = await api.delete(`${API_URL}/${id}`);
            // return response.data;
            mockProducts = mockProducts.filter(p => p._id !== id);
            return { message: "Deleted" };
        } catch (error) {
            console.error("Error deleting product:", error);
            throw error;
        }
    }
};
