import express from "express";
import { addProduct, deleteProduct, updateProduct } from "../controllers/productController.js";


const productRoute = express.Router();

productRoute.post("/add", addProduct);
productRoute.put("/:id", updateProduct);
productRoute.delete("/:id", deleteProduct);

export default productRoute;