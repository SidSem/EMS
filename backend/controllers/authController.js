import db from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "ems_secret_key_2026";

export const register = async (req, res) => {
    const { username, email, password, role } = req.body;
    
    if (!username || !email || !password) {
        return res.status(400).json({ success: false, message: "Please fill all required fields" });
    }
    
    db.query("SELECT * FROM users WHERE username = ? OR email = ?", [username, email], async (err, results) => {
        if (err) {
            console.error("Database error during register check:", err);
            return res.status(500).json({ success: false, message: "Database error" });
        }
        
        if (results.length > 0) {
            return res.status(400).json({ success: false, message: "Username or email already exists" });
        }
        
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const userRole = role || "User";
            
            db.query(
                "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)",
                [username, email, hashedPassword, userRole],
                (err, insertResult) => {
                    if (err) {
                        console.error("Database error during user registration insert:", err);
                        return res.status(500).json({ success: false, message: "Failed to register user" });
                    }
                    res.status(201).json({ success: true, message: "User registered successfully!" });
                }
            );
        } catch (hashError) {
            console.error("Bcrypt hashing error:", hashError);
            res.status(500).json({ success: false, message: "Server error" });
        }
    });
};

export const login = async (req, res) => {
    const { username, password } = req.body;
    
    if (!username || !password) {
        return res.status(400).json({ success: false, message: "Please provide username and password" });
    }
    
    db.query(
        "SELECT * FROM users WHERE username = ? OR email = ?",
        [username, username],
        async (err, results) => {
            if (err) {
                console.error("Database error during login query:", err);
                return res.status(500).json({ success: false, message: "Database error" });
            }
            
            if (results.length === 0) {
                return res.status(401).json({ success: false, message: "Invalid username or password" });
            }
            
            const user = results[0];
            
            try {
                const isMatch = await bcrypt.compare(password, user.password);
                
                if (!isMatch) {
                    return res.status(401).json({ success: false, message: "Invalid username or password" });
                }
                
                const token = jwt.sign(
                    { id: user.id, username: user.username, email: user.email, role: user.role },
                    JWT_SECRET,
                    { expiresIn: "24h" }
                );
                
                res.json({
                    success: true,
                    message: "Login successful!",
                    token,
                    user: {
                        id: user.id,
                        username: user.username,
                        email: user.email,
                        role: user.role
                    }
                });
            } catch (bcryptError) {
                console.error("Bcrypt comparison error:", bcryptError);
                res.status(500).json({ success: false, message: "Server error" });
            }
        }
    );
};
