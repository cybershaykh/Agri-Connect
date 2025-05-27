import orderModel from "../models/orderModel.js";
import productModel from "../models/productModel.js";
import userModel from "../models/userModel.js";

export const placeOrder = async (req, res) => {
  try {
    const { buyerId, productId, quantity, deliveryAddress } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({ error: "❌Product ID and quantity are required." });
    }

    const product = await productModel.findById(productId);
    if (!product || product.quantity < quantity) {
      return res.status(404).json({ error: "❌Product not found or insufficient quantity." });
    }

    const newOrder = new orderModel({
      buyerId,
      productId,
      quantity,
      deliveryAddress,
      totalPrice: product.price * quantity,
      status: "Pending",
    });

    // Save the order
    const savedOrder = await newOrder.save();

    // Deduct the ordered quantity from product inventory
    product.quantity -= quantity;
    await product.save();

    // (Optional) Link order to user if order tracking array exists
    // await userModel.findByIdAndUpdate(buyerId, { $push: { orders: savedOrder._id } });

    res.status(201).json({
      success: true,
      message: "✅Order placed successfully.",
      order: savedOrder,
    });
  } catch (err) {
    console.error("Place order error:", err);
    res.status(500).json({ error: "❌Something went wrong while placing the order." });
  }
};

// Get all orders for a user
export const getUserOrders = async (req, res) => {
    try {
        const { userId } = req.body;

        const orders = await orderModel.find({ buyerId: userId });

        if (!orders || orders.length === 0) {
            return res.status(404).json({ error: "❌No orders found for this user." });
        }

        res.status(200).json({
            success: true,
            orders
        });
    } catch (err) {
        console.error("Get user orders error:", err);
        res.status(500).json({ error: "❌Something went wrong while fetching the orders." });
    }
}
// update order status
export const updateOrderStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;

        if (!orderId || !status) {
            return res.status(400).json({ error: "❌Order ID and status are required." });
        }

        const validStatuses = ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Canceled'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ error: "Invalid status." });
        }

        const updatedOrder = await orderModel.findByIdAndUpdate(orderId, { status }, { new: true });

        if (!updatedOrder) {
            return res.status(404).json({ error: "Order not found." });
        }

        res.status(200).json({
            success: true,
            message: "✅Order status updated successfully.",
            order: updatedOrder
        });
    } catch (err) {
        console.error("Update order status error:", err);
        res.status(500).json({ error: "❌Something went wrong while updating the order status." });
    }
}