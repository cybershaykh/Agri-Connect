import { addressDummyData } from "../../frontend/src/assets/assets";
import connectDB from "../config/db";
import AddAddressModel from "../models/addAddressModel";


export const addAddress = async (req, res) => {
    try {
        const { userId } = req.body;
        
        await connectDB()
        const newAddress = await AddAddressModel.create({...address,userId})

        return res.json({ success: true, message: "Address added successfully", 
            newAddress
        })
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}