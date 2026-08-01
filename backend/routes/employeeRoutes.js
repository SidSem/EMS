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

router.use(authMiddleware);

router.get("/", getAllEmployees);

router.post("/", authorizeRoles("Admin"), addEmployee);
router.put("/:id", authorizeRoles("Admin"), updateEmployee);
router.delete("/:id", authorizeRoles("Admin"), deleteEmployee);

export default router;
