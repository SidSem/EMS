import express from "express";
import {
    getAllEmployees,
    addEmployee,
    updateEmployee,
    deleteEmployee
} from "../controllers/employeeController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", getAllEmployees);
router.post("/", addEmployee);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);

export default router;
