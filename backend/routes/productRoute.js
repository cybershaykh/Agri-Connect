import express from "express";
import { addProduct, approveProduct, deleteProduct, getAllProducts, getApprovedProducts, getUnapprovedProducts, updateProduct } from "../controllers/productController.js";
import authMiddleware from "../middlewares/auth.js";
import { isAdmin } from "../middlewares/middleware.js";
import upload from "../middlewares/multerConfig.js";



const productRoute = express.Router();

productRoute.post("/add", upload.fields([
    { name: "images", maxCount: 4 },
    { name: "farmerImage", maxCount: 1 },
]), addProduct);
productRoute.get("/getall", getAllProducts);
productRoute.put('/approve/:productId', isAdmin, approveProduct);
productRoute.get('/pending', isAdmin, getUnapprovedProducts);
productRoute.get("/:id", getApprovedProducts);
productRoute.put("/:id", updateProduct);
productRoute.delete("/delete/:id", deleteProduct);

export default productRoute;