import express from 'express';
import { getAllOrders, getFarmerOrders, getUserOrders, placeOrder, updateOrderStatus } from '../controllers/orderController.js';
import authMiddleware, { adminMiddleware } from '../middlewares/auth.js';



const orderRoute = express.Router();

orderRoute.post("/place", authMiddleware, placeOrder);
orderRoute.get("/user", authMiddleware, getUserOrders);
orderRoute.get("/all", adminMiddleware, getAllOrders);
orderRoute.put("/update-status", authMiddleware, updateOrderStatus);
orderRoute.get("/farmer", authMiddleware, getFarmerOrders);

export default orderRoute;