import express from "express";
import {
    getAllEmployees,
    addEmployee,
    updateEmployee,
    deleteEmployee
} from "../controllers/employeeController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

// General authentication check for all routes
router.use(authMiddleware);

// Actions mapping:
// - Read-only view for everyone
router.get("/", getAllEmployees);

// - Write access restricted to Admin only
router.post("/", authorizeRoles("Admin"), addEmployee);
router.put("/:id", authorizeRoles("Admin"), updateEmployee);
router.delete("/:id", authorizeRoles("Admin"), deleteEmployee);

export default router;
