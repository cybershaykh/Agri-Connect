import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  category: { type: String, required: true },
  rating: { type: Number, default: 0 },
  quantity: Number,
  price: Number,
  images: {type: String, required: true},
  availability: { type: Boolean, default: true },
  farmerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
});

const productModel = mongoose.models.Product || mongoose.model("Product", productSchema);
export default productModel;
