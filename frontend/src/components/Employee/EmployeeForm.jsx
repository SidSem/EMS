import React, { useState, useEffect } from 'react'
import { employeeServices } from '../../services/EmployeeService';

function EmployeeForm({ onEmployeeAdded, selectedEmployee, clearSelection, showNotification }) {
    const INITIAL_FORM_STATE = {
        name: "",
        email: "",
        phone: "",
        department: "",
        role: "",
        salary: "",
        joining_date: "",
        status: "Active"
    };

    const [data, setData] = useState(INITIAL_FORM_STATE);

    useEffect(() => {
        if (selectedEmployee) {
            setData({
                ...selectedEmployee,
                joining_date: selectedEmployee.joining_date ? selectedEmployee.joining_date.substring(0, 10) : "",
                phone: selectedEmployee.phone ? String(selectedEmployee.phone) : "",
                salary: selectedEmployee.salary ? String(selectedEmployee.salary) : ""
            });
        } else {
            setData(INITIAL_FORM_STATE);
        }
    }, [selectedEmployee]);

    function handleChange(e) {
        const { name, value } = e.target;
        setData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            // Form payload validation formatting
            const payload = {
                ...data,
                phone: Number(data.phone),
                salary: parseFloat(data.salary)
            };

            if (selectedEmployee) {
                await employeeServices.updateEmployee(selectedEmployee.id, payload);
                showNotification("✅ Employee Updated Successfully", "success");
                clearSelection();
            } else {
                await employeeServices.addEmployee(payload);
                showNotification("✅ Employee Added Successfully", "success");
            }
            onEmployeeAdded();
            setData(INITIAL_FORM_STATE);
        } catch (error) {
            showNotification("❌ Failed to save employee info", "error");
            console.error("Failed to save employee:", error);
        }
    }

    return (
        <div className="form-card">
            <h2>{selectedEmployee ? '✏️ Modify Employee Details' : '➕ Add New Employee'}</h2>
            <form onSubmit={handleSubmit} className="employee-form-layout">
                <div className="form-group">
                    <label htmlFor="input-name">Full Name</label>
                    <input 
                        id="input-name"
                        type="text" 
                        name="name" 
                        value={data.name} 
                        onChange={handleChange} 
                        placeholder="Enter full name"
                        required
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="input-email">Email Address</label>
                        <input 
                            id="input-email"
                            type="email" 
                            name="email" 
                            value={data.email} 
                            onChange={handleChange} 
                            placeholder="name@company.com"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="input-phone">Phone Number</label>
                        <input 
                            id="input-phone"
                            type="tel" 
                            name="phone" 
                            value={data.phone} 
                            onChange={handleChange} 
                            placeholder="Enter 10-digit number"
                            pattern="[0-9]{10,15}"
                            title="Please enter a valid phone number (10 to 15 digits)"
                            required
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="input-department">Department</label>
                        <select 
                            id="input-department"
                            name="department"
                            value={data.department}
                            onChange={handleChange}
                            required
                        >
                            <option value="">-- Select Department --</option>
                            <option value="Engineering">Engineering</option>
                            <option value="HR">HR</option>
                            <option value="Finance">Finance</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Sales">Sales</option>
                            <option value="Operations">Operations</option>
                            <option value="Design">Design</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="input-role">Job Title / Role</label>
                        <input 
                            id="input-role"
                            type="text" 
                            name="role" 
                            value={data.role} 
                            onChange={handleChange} 
                            placeholder="e.g. Software Engineer"
                            required
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="input-salary">Annual Salary ($)</label>
                        <input 
                            id="input-salary"
                            type="number" 
                            name="salary" 
                            value={data.salary} 
                            onChange={handleChange} 
                            placeholder="0.00"
                            step="0.01"
                            min="0"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="input-joining-date">Joining Date</label>
                        <input 
                            id="input-joining-date"
                            type="date" 
                            name="joining_date" 
                            value={data.joining_date} 
                            onChange={handleChange} 
                            required
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="input-status">Employment Status</label>
                    <select 
                        id="input-status"
                        name="status"
                        value={data.status}
                        onChange={handleChange}
                        required
                    >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="On Leave">On Leave</option>
                        <option value="Suspended">Suspended</option>
                    </select>
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn btn-primary">
                        {selectedEmployee ? '✏ Update Employee' : '➕ Add Employee'}
                    </button>
                    {selectedEmployee && (
                        <button 
                            type="button" 
                            className="btn btn-secondary" 
                            onClick={() => {
                                clearSelection();
                                setData(INITIAL_FORM_STATE);
                            }}
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}

export default EmployeeForm;
