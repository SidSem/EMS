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

router.use(authMiddleware);

router.get("/", getAllProducts);

router.post("/", authorizeRoles("Admin", "Manager"), addProduct);
router.put("/:id", authorizeRoles("Admin", "Manager"), updateProduct);

router.delete("/:id", authorizeRoles("Admin"), deleteProduct);

export default router;
