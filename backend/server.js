import express from "express";
import cors from "cors";
import db from "./config/db.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Backend is running sucessfully",
        project: "EMS"
    });
});
app.get("/about", (req, res) => {
    res.send("This is about page");
});
app.get("/products", (req, res) => {
    db.query("SELECT * FROM products", (
        err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Database Error"
            });
        }
        res.json(result);
    }
    )
});
app.post("/products", (req, res) => {

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

});

app.put("/products/:id", (req, res) => {
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
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

