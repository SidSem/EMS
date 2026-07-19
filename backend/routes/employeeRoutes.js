import express from "express";
import {
    getAllEmployees,
    addEmployee,
    updateEmployee,
    deleteEmployee
} from "../controllers/employeeController.js";

const router = express.Router();

router.get("/", getAllEmployees);
router.post("/", addEmployee);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);

export default router;
