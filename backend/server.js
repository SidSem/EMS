import express from "express";
import cors from "cors";
import db from "./config/db.js";

const app = express();

app.use(cors());

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

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

