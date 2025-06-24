import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true},
  description: { type: String, required: true},
  category: { type: String, required: true },
  rating: { type: Number, default: 0 },
  price: { type: Number, required: true},
  offerPrice: { type: Number, required: false, default: 0 },
  image: {type: Array, required: true},
  inStock: { type: Boolean, default: true },
  location: { type: String, required: true},
  farmerImage: { type: Array, required: true },
  farmerAddress: { type: String, required: true },
  farmerName: { type: String, required: true },
  farmerPhone: { type: String, required: true },
  farmerEmail: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const productModel = mongoose.models.Product || mongoose.model("Product", productSchema);
export default productModel;
