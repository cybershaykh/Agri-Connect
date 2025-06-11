import reviewModel from '../models/reviewModel.js';
import productModel from '../models/productModel.js';

// Add a review for a product
export const addReview = async (req, res) => {
    try {
        const { name, rating, comment } = req.body;

        if (!name || !rating || !comment) {
            return res.status(400).json({ error: "❌ Product ID, Buyer ID, and rating are required." });
        }

        const product = await productModel.findById(name);
        if (!product) {
            return res.status(404).json({ error: "❌ Product not found." });
        }

        // Check if buyer already left a review for this product
        const existingReview = await reviewModel.findOne({ name });

        if (existingReview) {
            existingReview.rating = rating;
            existingReview.comment = comment || existingReview.comment;
            await existingReview.save();

            // Recalculate average rating
            const reviews = await reviewModel.find({ name });
            const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
            product.averageRating = averageRating;
            await product.save();

            return res.json({
                success: true,
                message: "✅ Review updated successfully.",
                review: existingReview
            });
        }

        // Create new review
        const newReview = new reviewModel({
            name,
            rating,
            comment,
        });

        const savedReview = await newReview.save();

        // Update the product's average rating
        const reviews = await reviewModel.find({ name });
        const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
        product.averageRating = averageRating;
        await product.save();

        res.status(201).json({
            success: true,
            message: "✅ Review added successfully.",
            review: savedReview,
        });
    } catch (err) {
        console.error("Add review error:", err);
        res.status(500).json({ error: "❌ Something went wrong while adding the review." });
    }
};