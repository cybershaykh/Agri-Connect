import express from "express";
import { addProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from "../controllers/productController.js";


const productRoute = express.Router();

productRoute.post("/add", addProduct);
productRoute.get("/getall", getAllProducts);
productRoute.get("/:id", getProductById);
productRoute.put("/:id", updateProduct);
productRoute.delete("/:id", deleteProduct);

export default productRoute;