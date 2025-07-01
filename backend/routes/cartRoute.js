import express from 'express';
import { addToCart, getCart, removeFromCart } from '../controllers/cartController.js';
import authMiddleware from '../middlewares/auth.js';

const cartRoute = express.Router();

cartRoute.post('/add', authMiddleware, addToCart);
cartRoute.post("/remove", authMiddleware, removeFromCart);
cartRoute.get('/get', getCart);

export default cartRoute;