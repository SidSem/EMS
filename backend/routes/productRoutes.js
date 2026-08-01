import express from "express";
import {
    getAllProducts,
    addProduct,
    updateProduct,
    deleteProduct
} from "../controllers/productController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Protect all product routes
router.use(authMiddleware);

router.get("/", getAllProducts);
router.post("/", addProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
