import express from 'express';
import { getUserOrders, placeOrder } from '../controllers/orderController.js';
import authMiddleware from '../middlewares/auth.js';



const orderRoute = express.Router();

orderRoute.post("/place", authMiddleware, placeOrder);
orderRoute.get("/user", authMiddleware, getUserOrders);

export default orderRoute;