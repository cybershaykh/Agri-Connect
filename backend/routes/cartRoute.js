import express from 'express';
import { addToCart, getCart } from '../controllers/cartController.js';
import authMiddleware from '../middlewares/auth.js';

const cartRoute = express.Router();

cartRoute.post('/add', authMiddleware, addToCart);
cartRoute.get('/get', getCart);

export default cartRoute;