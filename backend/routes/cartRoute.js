import express from 'express';
import { addToCart, getCart } from '../controllers/cartController.js';


const cartRoute = express.Router();

cartRoute.post('/update', addToCart);
cartRoute.get('/get', getCart);

export default cartRoute;