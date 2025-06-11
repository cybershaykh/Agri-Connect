import mongoose from "mongoose";

const marketPriceSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
    },
    region: {
      type: String,
      required: true,
      trim: true,
    },
    pricePerKg: {
      type: Number,
      required: true,
      min: 0,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);
marketPriceSchema.index({ productName: 1, region: 1 }, { unique: true });

const marketPriceModel = mongoose.model("MarketPrice", marketPriceSchema);

export default marketPriceModel;
