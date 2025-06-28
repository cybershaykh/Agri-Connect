import productModel from "../models/productModel.js";
import cartModel from "../models/cartModel.js";

export const addToCart = async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.body;

  if (!productId) {
    return res.status(400).json({ message: "Product ID is required" });
  }

  try {
    // 1. Check if product exists
    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // 2. Find user's cart
    let cart = await cartModel.findOne({ user: userId });

    // 3. If no cart, create one
    if (!cart) {
      cart = new cartModel({ user: userId, items: [] });
    }

    // 4. Check if product is already in cart
    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({ product: productId, quantity: 1 });
    }

    await cart.save();

    return res.status(200).json({ success: true, cart });
  } catch (error) {
    console.error("Add to cart failed:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getCart = async (req, res) => {
    const userId = req.user.id;
    
    try {
        // 1. Find user's cart
        const cart = await cartModel.findOne({ user: userId }).populate("items.product");
    
        if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
        }
    
        return res.status(200).json({ success: true, cart });
    } catch (error) {
        console.error("Get cart failed:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
}
