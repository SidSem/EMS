import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "ems_secret_key_2026";

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            success: false,
            message: "Access Denied: No token provided"
        });
    }
    
    const token = authHeader.split(" ")[1];
    
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; 
        next();
    } catch (error) {
        console.error("JWT Verification error:", error.message);
        return res.status(403).json({
            success: false,
            message: "Access Denied: Invalid or expired token"
        });
    }
};

export default authMiddleware;
