import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  buyerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  farmerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: Number,
    price: Number,
  }],
  totalAmount: Number,
  deliveryAddress: {
    type: Object, required: true,
  },
  status: { type: String, enum: ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Canceled'], default: 'Pending' },
  createdAt: { type: Date, default: Date.now },
});

const orderModel = mongoose.models.order || mongoose.model('order', orderSchema);
export default orderModel;
