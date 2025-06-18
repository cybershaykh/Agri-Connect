import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true},
  description: { type: String, required: true},
  category: { type: String, required: true },
  rating: { type: Number, default: 0 },
  price: { type: Number, required: true},
  offerPrice: { type: Number, required: false, default: 0 },
  image: {type: Array, required: true},
  inStock: { type: Boolean, default: true },
  location: { type: String, required: true},
  farmerId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  createdAt: { type: Date, default: Date.now },
});

const productModel = mongoose.models.Product || mongoose.model("Product", productSchema);
export default productModel;
