import express from 'express';
import { getAllOrders, getUserOrders, placeOrder, updatePaymentStatus } from '../controllers/orderController.js';
import authMiddleware  from '../middlewares/auth.js';
import { isAdmin } from '../middlewares/middleware.js';



const orderRoute = express.Router();

orderRoute.post("/place", authMiddleware, placeOrder);
orderRoute.get("/user", authMiddleware, getUserOrders);
orderRoute.get("/all", getAllOrders);
orderRoute.put("/payment", updatePaymentStatus);

export default orderRoute;