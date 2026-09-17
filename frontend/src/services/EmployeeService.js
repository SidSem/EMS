// import api from "./api";

// const API_URL = "/employees";
const STORAGE_KEY = 'ems_mock_employees';

const initialMockEmployees = [
    {
        id: '1',
        _id: '1',
        name: 'Alice Smith',
        email: 'alice.smith@enterprise.com',
        phone: '9876543210',
        department: 'Engineering',
        role: 'Software Engineer',
        position: 'Software Engineer',
        salary: 95000,
        joining_date: '2023-01-15',
        status: 'Active'
    },
    {
        id: '2',
        _id: '2',
        name: 'Bob Johnson',
        email: 'bob.johnson@enterprise.com',
        phone: '9876543211',
        department: 'Product',
        role: 'Product Manager',
        position: 'Product Manager',
        salary: 110000,
        joining_date: '2022-06-20',
        status: 'Active'
    },
    {
        id: '3',
        _id: '3',
        name: 'Charlie Brown',
        email: 'charlie.brown@enterprise.com',
        phone: '9876543212',
        department: 'Design',
        role: 'UX Designer',
        position: 'UX Designer',
        salary: 85000,
        joining_date: '2023-09-01',
        status: 'Active'
    }
];

function getStoredEmployees() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed) && parsed.length > 0) {
                return parsed.map(e => ({
                    ...e,
                    id: e.id || e._id,
                    _id: e._id || e.id,
                    role: e.role || e.position || 'Staff',
                    position: e.position || e.role || 'Staff'
                }));
            }
        }
    } catch (e) {
        console.warn("Failed to load employees from localStorage", e);
    }
    return [...initialMockEmployees];
}

function saveEmployees(employees) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
    } catch (e) {
        console.warn("Failed to save employees to localStorage", e);
    }
}

export const employeeServices = {
    getAllEmployees: async () => {
        return getStoredEmployees();
    },

    addEmployee: async (data) => {
        try {
            const employees = getStoredEmployees();
            const newId = String(Date.now());
            const newEmp = {
                id: newId,
                _id: newId,
                name: data.name,
                email: data.email || '',
                phone: data.phone || '',
                department: data.department || 'General',
                role: data.role || data.position || 'Staff',
                position: data.position || data.role || 'Staff',
                salary: Number(data.salary) || 0,
                joining_date: data.joining_date || new Date().toISOString().substring(0, 10),
                status: data.status || 'Active'
            };
            employees.push(newEmp);
            saveEmployees(employees);
            return newEmp;
        } catch (error) {
            console.error("Error adding employee:", error);
            throw error;
        }
    },

    updateEmployee: async (id, data) => {
        try {
            const employees = getStoredEmployees();
            const targetId = String(id);
            const index = employees.findIndex(e => String(e.id) === targetId || String(e._id) === targetId);
            if (index !== -1) {
                const updated = {
                    ...employees[index],
                    ...data,
                    id: employees[index].id || targetId,
                    _id: employees[index]._id || targetId,
                    role: data.role || data.position || employees[index].role,
                    position: data.position || data.role || employees[index].position,
                    salary: data.salary !== undefined ? Number(data.salary) : employees[index].salary
                };
                employees[index] = updated;
                saveEmployees(employees);
                return updated;
            }
            throw new Error("Employee not found");
        } catch (error) {
            console.error("Error updating employee:", error);
            throw error;
        }
    },

    deleteEmployee: async (id) => {
        try {
            const employees = getStoredEmployees();
            const targetId = String(id);
            const filtered = employees.filter(e => String(e.id) !== targetId && String(e._id) !== targetId);
            saveEmployees(filtered);
            return { message: "Deleted" };
        } catch (error) {
            console.error("Error deleting employee:", error);
            throw error;
        }
    }
};

