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
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 p-6">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6 pb-3 border-b border-slate-100 dark:border-slate-800/80 flex items-center gap-2">
                {selectedEmployee ? '✏️ Modify Employee Details' : '➕ Add New Employee'}
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="input-name" className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Full Name</label>
                    <input 
                        id="input-name"
                        type="text" 
                        name="name" 
                        value={data.name} 
                        onChange={handleChange} 
                        placeholder="Enter full name"
                        className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
                        required
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="input-email" className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Email Address</label>
                        <input 
                            id="input-email"
                            type="email" 
                            name="email" 
                            value={data.email} 
                            onChange={handleChange} 
                            placeholder="name@company.com"
                            className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="input-phone" className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Phone Number</label>
                        <input 
                            id="input-phone"
                            type="tel" 
                            name="phone" 
                            value={data.phone} 
                            onChange={handleChange} 
                            placeholder="Enter 10-digit number"
                            pattern="[0-9]{10,15}"
                            title="Please enter a valid phone number (10 to 15 digits)"
                            className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
                            required
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="input-department" className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Department</label>
                        <select 
                            id="input-department"
                            name="department"
                            value={data.department}
                            onChange={handleChange}
                            className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all"
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

                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="input-role" className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Job Title / Role</label>
                        <input 
                            id="input-role"
                            type="text" 
                            name="role" 
                            value={data.role} 
                            onChange={handleChange} 
                            placeholder="e.g. Software Engineer"
                            className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
                            required
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="input-salary" className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Annual Salary ($)</label>
                        <input 
                            id="input-salary"
                            type="number" 
                            name="salary" 
                            value={data.salary} 
                            onChange={handleChange} 
                            placeholder="0.00"
                            step="0.01"
                            min="0"
                            className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="input-joining-date" className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Joining Date</label>
                        <input 
                            id="input-joining-date"
                            type="date" 
                            name="joining_date" 
                            value={data.joining_date} 
                            onChange={handleChange} 
                            className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all"
                            required
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-1.5">
                    <label htmlFor="input-status" className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Employment Status</label>
                    <select 
                        id="input-status"
                        name="status"
                        value={data.status}
                        onChange={handleChange}
                        className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all"
                        required
                    >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="On Leave">On Leave</option>
                        <option value="Suspended">Suspended</option>
                    </select>
                </div>

                <div className="flex flex-col gap-2.5 mt-2">
                    <button type="submit" className="w-full py-2.5 px-4 bg-violet-600 hover:bg-violet-700 active:bg-violet-800 text-white text-sm font-semibold rounded-lg shadow-sm hover:shadow transition-all duration-150 cursor-pointer">
                        {selectedEmployee ? '✏️ Update Employee' : '➕ Add Employee'}
                    </button>
                    {selectedEmployee && (
                        <button 
                            type="button" 
                            className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-300 text-sm font-semibold rounded-lg transition-all duration-150 cursor-pointer" 
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
