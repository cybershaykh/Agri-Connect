// models/orderModel.js
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
    amount: { type: Number, required: true },
    address: {
      fullName: String,
      phoneNumber: String,
      pincode: String,
      area: String,
      city: String,
      state: String,
    },
    method: { type: String, default: "COD" },
    paymentStatus: { type: String, default: "Pending" },
    status: { type: String, default: "Pending" },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
