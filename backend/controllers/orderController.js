import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";

export const placeOrder = async (req, res) => {
  const { items, amount, address, method = "COD" } = req.body;

  if (!items || !amount || !address) {
    return res.status(400).json({ success: false, message: "Missing order data" });
  }

  try {
    const user = await userModel.findById(req.user._id);

    // Step 1: Create and save to Order collection
    const newOrder = await orderModel.create({
      user: req.user._id,
      items,
      amount,
      address,
      method,
      paymentStatus: method === "COD" ? "Pending" : "Paid",
      date: new Date(),
    });

    // Step 2: Add order reference to user
    user.orders.push(newOrder._id);
    await user.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order: newOrder,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error placing order" });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ user: req.user._id })
      .populate("items.product", "name image") 
      .sort({ date: -1 });

    res.status(200).json({ success: true, orders });
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ success: false, message: "Error fetching orders" });
  }
};

// Route: GET /api/order/all
export const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find()
      .populate("items.product", "name image")
      .sort({ date: -1 });

    res.status(200).json({ success: true, orders });
  } catch (err) {
    console.error("Error fetching all orders:", err);
    res.status(500).json({ success: false, message: "Server error fetching orders" });
  }
};

// PUT /api/order/update-payment-status
export const updatePaymentStatus = async (req, res) => {
  const { orderId, paymentStatus } = req.body;

  if (!orderId || !paymentStatus) {
    return res.status(400).json({ success: false, message: "Missing fields" });
  }

  try {
    const order = await orderModel.findById(orderId);

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    order.paymentStatus = paymentStatus;
    await order.save();

    res.status(200).json({ success: true, message: "Payment status updated", order });
  } catch (err) {
    console.error("Payment update error:", err);
    res.status(500).json({ success: false, message: "Server error updating payment status" });
  }
};



