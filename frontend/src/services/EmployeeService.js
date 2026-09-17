// import api from "./api";

// const API_URL = "/employees";
let mockEmployees = [
    { _id: '1', name: 'Alice Smith', position: 'Software Engineer', department: 'Engineering', salary: 95000 },
    { _id: '2', name: 'Bob Johnson', position: 'Product Manager', department: 'Product', salary: 110000 },
    { _id: '3', name: 'Charlie Brown', position: 'UX Designer', department: 'Design', salary: 85000 }
];

export const employeeServices = {
    getAllEmployees: async () => {
        // const response = await api.get(API_URL);
        // return response.data;
        return [...mockEmployees];
    },

    addEmployee: async (data) => {
        try {
            // const response = await api.post(API_URL, data);
            // return response.data;
            const newEmp = { ...data, _id: Date.now().toString() };
            mockEmployees.push(newEmp);
            return newEmp;
        } catch (error) {
            console.error("Error adding employee:", error);
            throw error;
        }
    },

    updateEmployee: async (id, data) => {
        try {
            // const response = await api.put(`${API_URL}/${id}`, data);
            // return response.data;
            const index = mockEmployees.findIndex(e => e._id === id);
            if (index !== -1) {
                mockEmployees[index] = { ...mockEmployees[index], ...data };
                return mockEmployees[index];
            }
            throw new Error("Employee not found");
        } catch (error) {
            console.error("Error updating employee:", error);
            throw error;
        }
    },

    deleteEmployee: async (id) => {
        try {
            // const response = await api.delete(`${API_URL}/${id}`);
            // return response.data;
            mockEmployees = mockEmployees.filter(e => e._id !== id);
            return { message: "Deleted" };
        } catch (error) {
            console.error("Error deleting employee:", error);
            throw error;
        }
    }
};
