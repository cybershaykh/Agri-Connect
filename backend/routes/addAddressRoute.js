import express from 'express';
import { addAddress } from '../controllers/addAddressController.js';
import authMiddleware from '../middlewares/auth.js';


const addAddressRoute = express.Router();

addAddressRoute.post("/add", authMiddleware, addAddress);

export default addAddressRoute;