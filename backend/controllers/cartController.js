import productModel from "../models/productModel.js";
import cartModel from "../models/cartModel.js";
import userModel from "../models/userModel.js";

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

    // 2. Find or create cart for the user
    let cart = await cartModel.findOne({ user: userId });

    if (!cart) {
      cart = new cartModel({ user: userId, cartItems: [] });
    }

    // 3. Update quantity if exists or push new
    const existingItem = cart.cartItems.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.cartItems.push({ product: productId, quantity: 1 });
    }

    await cart.save();

    // 4. Update user.cartItems directly using $set
    const user = await userModel.findById(userId);
    const currentQty = user.cartItems?.[productId] || 0;

    await userModel.findByIdAndUpdate(
      userId,
      { $set: { [`cartItems.${productId}`]: currentQty + 1 } },
      { new: true }
    );

    // 5. Populate and return updated cart items
    const updatedCart = await cartModel
      .findOne({ user: userId })
      .populate("cartItems.product")
      .select("cartItems");

    return res.status(200).json({
      success: true,
      cartItems: updatedCart.cartItems,
    });
  } catch (error) {
    console.error("Add to cart failed:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const removeFromCart = async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.body;

  if (!productId) {
    return res.status(400).json({ message: "Product ID is required" });
  }

  try {
    const cart = await cartModel.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.cartItems.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    // Decrease quantity or remove item
    if (cart.cartItems[itemIndex].quantity > 1) {
      cart.cartItems[itemIndex].quantity -= 1;
    } else {
      cart.cartItems.splice(itemIndex, 1);
    }

    await cart.save();

    // Sync with user.cartItems
    const user = await userModel.findById(userId);
    const currentQty = user.cartItems?.[productId] || 0;

    if (currentQty > 1) {
      // Decrease quantity
      await userModel.findByIdAndUpdate(
        userId,
        { $set: { [`cartItems.${productId}`]: currentQty - 1 } }
      );
    } else {
      // Remove field entirely
      await userModel.findByIdAndUpdate(
        userId,
        { $unset: { [`cartItems.${productId}`]: "" } }
      );
    }

    // Return updated cart
    const updatedCart = await cartModel
      .findOne({ user: userId })
      .populate("cartItems.product")
      .select("cartItems");

    return res.status(200).json({
      success: true,
      cartItems: updatedCart.cartItems,
    });
  } catch (error) {
    console.error("Remove from cart failed:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getCart = async (req, res) => {
  const userId = req.user.id;

  try {
    const cart = await cartModel
      .findOne({ user: userId })
      .populate("cartItems.product");

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    return res.status(200).json({ success: true, cart });
  } catch (error) {
    console.error("Get cart failed:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
