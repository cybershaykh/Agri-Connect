import express from 'express';
import { addAddress } from '../controllers/addAddressController.js';


const addAddressRoute = express.Router();

addAddressRoute.post("/add", addAddress);

export default addAddressRoute;