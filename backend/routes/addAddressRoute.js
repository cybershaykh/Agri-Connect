import express from 'express';
import { addAddress, getUserAddresses } from '../controllers/addAddressController.js';
import authMiddleware from '../middlewares/auth.js';


const addAddressRoute = express.Router();

addAddressRoute.post("/add", authMiddleware, addAddress);
addAddressRoute.get("/user", authMiddleware, getUserAddresses);

export default addAddressRoute;