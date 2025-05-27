import express from 'express';
import { getUserOrders, placeOrder, updateOrderStatus } from '../controllers/orderController.js';


const orderRoute = express.Router();

orderRoute.post("/order", placeOrder);
orderRoute.get("/:id", getUserOrders);
orderRoute.put("/:id", updateOrderStatus);

export default orderRoute;