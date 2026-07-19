import db from "../config/db.js";

export const getAllEmployees = (req, res) => {
    db.query("SELECT * FROM employees", (err, result) => {
        if (err) {
            console.error("Database Error:", err);
            return res.status(500).json({
                message: "Database Error"
            });
        }
        res.json(result);
    });
};

export const addEmployee = (req, res) => {
    const { name, email, phone, department, role, salary, joining_date, status } = req.body;
    db.query(
        "INSERT INTO employees(name, email, phone, department, role, salary, joining_date, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [name, email, phone, department, role, salary, joining_date, status],
        (err, result) => {
            if (err) {
                console.error("Database Error:", err);
                return res.status(500).json({
                    success: false,
                    message: "Database Error"
                });
            }
            res.status(201).json({
                success: true,
                message: "Employee Added Successfully"
            });
        }
    );
};

export const updateEmployee = (req, res) => {
    const { id } = req.params;
    const { name, email, phone, department, role, salary, joining_date, status } = req.body;
    db.query(
        "UPDATE employees SET name = ?, email = ?, phone = ?, department = ?, role = ?, salary = ?, joining_date = ?, status = ? WHERE id = ?",
        [name, email, phone, department, role, salary, joining_date, status, id],
        (err, result) => {
            if (err) {
                console.error("Database Error:", err);
                return res.status(500).json({
                    success: false,
                    message: "Database Error"
                });
            }
            res.json({
                success: true,
                message: "Employee Updated Successfully"
            });
        }
    );
};

export const deleteEmployee = (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM employees WHERE id = ?", [id], (err, result) => {
        if (err) {
            console.error("Database Error:", err);
            return res.status(500).json({
                success: false,
                message: "Database Error"
            });
        }
        res.json({
            success: true,
            message: "Employee Deleted Successfully"
        });
    });
};
