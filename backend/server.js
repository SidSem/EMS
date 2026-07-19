import express from "express";
import cors from "cors";
import db from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Diagnostics route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Unified EMS Backend is running successfully",
        project: "EMS"
    });
});

app.get("/about", (req, res) => {
    res.send("This is the unified EMS application about page");
});

// Route mount points
app.use("/products", productRoutes);
app.use("/employees", employeeRoutes);
app.use("/auth", authRoutes);

// Database connection check
db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
    } else {
        console.log("Connected to MySQL Database: ems_db");
    }
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
