import express from 'express';
import { addToCart, getCart } from '../controllers/cartController.js';
import authMiddleware from '../middlewares/auth.js';


const cartRoute = express.Router();

cartRoute.post('/add', addToCart);
cartRoute.get('/get', authMiddleware, getCart);

export default cartRoute;