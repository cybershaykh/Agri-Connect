import connectDB from "../config/db.js";
import userModel from "../models/userModel.js";


export const addToCart = async (req, res) => {
    try {
        const userId = req.user._id; 
        const { cartData } = req.body;
    
        await connectDB();
        const user = await userModel.findById(userId);

        user.cartItems = cartData;
        await user.save();
        res.status(200).json({
            success: true,
            message: "✅Cart updated successfully.",
            cartItems: user.cartItems
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "❌Something went wrong while updating the cart.",
            error: error.message
        });
    }
}

export const getCart = async (req, res) => {
    try {
        await connectDB();
        const user = await userModel.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ error: "❌User not found." });
        }

        res.status(200).json({
            success: true,
            message: "✅Cart retrieved successfully.",
            cartItems: user.cartItems
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "❌Something went wrong while retrieving the cart.",
            error: error.message
        });
    }
}