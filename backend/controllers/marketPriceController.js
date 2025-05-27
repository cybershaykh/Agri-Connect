import marketPriceModel from "../models/marketPriceModel.js";


// update a price entry
export const updatePrice = async (req, res) => {
    try {
        const { price } = req.body;

        if (!Array.isArray(price) || price.length === 0) {
           return res.status(400).json({ error: "❌ Prices array is required." });
        }
        const updates = await Promise.all(
        price.map(async (item) => {
        const { productName, region, pricePerKg } = item;

        if (!productName || !region || !pricePerKg) {
          return null; // Skip invalid entries
        }

        return await marketPriceModel.findOneAndUpdate(
          { productName, region },
          { pricePerKg, updatedAt: new Date() },
          { upsert: true, new: true }
        );
      })
    );

    res.status(200).json({
      success: true,
      message: "✅ Market prices updated.",
      data: updates.filter(Boolean),
    });
  } catch (err) {
    console.error("Update prices error:", err);
    res.status(500).json({ error: "❌ Failed to update market prices." });
  }
}
// get all price entries
export const getMarketPrice = async (req, res) => {
  try {
    const { productName, region } = req.query;

    const filter = {};
    if (productName) filter.productName = new RegExp(productName, "i");
    if (region) filter.region = new RegExp(region, "i");

    const price = await marketPriceModel.find(filter);

    res.status(200).json({
        success: true,
        message: "✅ Market prices fetched successfully.",
        data: price,
        });
  } catch (err) {
    console.error("Get market prices error:", err);
    res.status(500).json({ error: "❌ Failed to fetch market prices." });
  }
};