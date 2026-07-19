import axios from "axios";

const API_URL = "http://localhost:5000/employees";

export const employeeServices = {
    getAllEmployees: async () => {
        const response = await axios.get(API_URL);
        return response.data;
    },

    addEmployee: async (data) => {
        try {
            const response = await axios.post(API_URL, data);
            return response.data;
        } catch (error) {
            console.error("Error adding employee:", error);
            throw error;
        }
    },

    updateEmployee: async (id, data) => {
        try {
            const response = await axios.put(`${API_URL}/${id}`, data);
            return response.data;
        } catch (error) {
            console.error("Error updating employee:", error);
            throw error;
        }
    },

    deleteEmployee: async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error deleting employee:", error);
            throw error;
        }
    }
};
