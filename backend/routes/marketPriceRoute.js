import express from 'express';
import { getMarketPrice, updatePrice } from '../controllers/marketPriceController.js';


const marketPriceRoute = express.Router();

marketPriceRoute.post("/price", updatePrice);
marketPriceRoute.get("/getall", getMarketPrice);

export default marketPriceRoute;