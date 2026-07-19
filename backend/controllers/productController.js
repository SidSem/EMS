import db from "../config/db.js";

export const getAllProducts = (req, res) => {
    db.query("SELECT * FROM products", (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Database Error"
            });
        }
        res.json(result);
    });
};

export const addProduct = (req, res) => {
    const { name, price, quantity, category } = req.body;
    db.query(
        "INSERT INTO products(name, price, quantity, category) VALUES (?, ?, ?, ?)",
        [name, price, quantity, category],
        (err, result) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Database Error"
                });
            }
            res.status(201).json({
                success: true,
                message: "Product Added Successfully"
            });
        }
    );
};

export const updateProduct = (req, res) => {
    const { id } = req.params;
    const { name, price, quantity, category } = req.body;
    db.query(
        "UPDATE products SET name = ?, price = ?, quantity = ?, category = ? WHERE id = ?",
        [name, price, quantity, category, id],
        (err, result) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Database Error"
                });
            }
            res.json({
                success: true,
                message: "Product Updated Successfully"
            });
        }
    );
};

export const deleteProduct = (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM products WHERE id = ?", [id], (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Database Error"
            });
        }
        res.json({
            success: true,
            message: "Product Deleted Successfully"
        });
    });
};
