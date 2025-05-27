import mongoose from "mongoose";

const marketPriceSchema = new mongoose.Schema({
  productName: String,
  region: String,
  price: Number,
  lastUpdated: { type: Date, default: Date.now },
});

const marketPriceModel = mongoose.models.MarketPrice || mongoose.model("MarketPrice", marketPriceSchema);

export default marketPriceModel;
