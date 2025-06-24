import connectDB from "../config/db.js";
import userModel from "../models/userModel.js";

export const addToCart = async (req, res) => {
  try {
    await connectDB();
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "❌ Product ID is required.",
      });
    }

    const user = await userModel.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "❌ User not found.",
      });
    }

    const cartItems = { ...user.cartItems } || {};

    if (!cartItems[productId]) {
      cartItems[productId] = 1;
    } else {
      cartItems[productId] += 1;
    }

    await userModel.findByIdAndUpdate(user._id, { cartItems });

    res.status(200).json({
      success: true,
      message: "✅ Product added to cart successfully.",
      cartItems,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "❌ Something went wrong while adding the product to the cart.",
      error: error.message,
    });
  }
};



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