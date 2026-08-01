import express from "express";
import {
    getAllProducts,
    addProduct,
    updateProduct,
    deleteProduct
} from "../controllers/productController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

// General authentication check for all routes
router.use(authMiddleware);

// Actions mapping:
// - Read-only view for everyone
router.get("/", getAllProducts);

// - Creation and editing allowed for Admin and Manager
router.post("/", authorizeRoles("Admin", "Manager"), addProduct);
router.put("/:id", authorizeRoles("Admin", "Manager"), updateProduct);

// - Deletion restricted to Admin only
router.delete("/:id", authorizeRoles("Admin"), deleteProduct);

export default router;
