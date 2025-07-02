import express from 'express';
import { getUserOrders, placeOrder } from '../controllers/orderController.js';
import authMiddleware  from '../middlewares/auth.js';
import { isAdmin } from '../middlewares/middleware.js';



const orderRoute = express.Router();

orderRoute.post("/place", authMiddleware, placeOrder);
orderRoute.get("/user", authMiddleware, getUserOrders);
// orderRoute.get("/all", authMiddleware, isAdmin, getAllOrders);
// orderRoute.put("/update-status", authMiddleware, updateOrderStatus);
// orderRoute.get("/farmer", authMiddleware, getFarmerOrders);

export default orderRoute;