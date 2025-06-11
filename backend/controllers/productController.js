import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import productModel from '../models/productModel.js';

// create a new product
export const addProduct = async (req, res) => {
    try {
        const { name, description, category, rating, quantity, price, images, inStock, location } = req.body;

        if (!name || !category || !images || !price || !quantity) {
            return res.status(400).json({ error: "❌Please provide all required fields." });
        }

        const newProduct = new productModel({
            name,
            description,
            category,
            rating: rating || 0,
            quantity,
            price,
            images,
            location,
            inStock: inStock !== undefined ? inStock : true,
        });

        const savedProduct = await newProduct.save();
        res.status(201).json({
            success: true,
            message: "✅Product added successfully.",
            product: savedProduct
        });
    } catch (err) {
        console.error("Add product error:", err);
        res.status(500).json({ error: "❌Something went wrong while adding the product." });
    }
};

// update a product
export const updateProduct = async (req, res) => {
    try {
        const { productId } = req.body;
        const updates = req.body;

        if (!productId) {
            return res.status(400).json({ error: "❌Product ID is required." });
        }

        const updatedProduct = await productModel.findByIdAndUpdate(productId, updates, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ error: "❌Product not found." });
        }

        res.status(200).json({
            success: true,
            message: "✅Product updated successfully.",
            product: updatedProduct
        });
    } catch (err) {
        console.error("Update product error:", err);
        res.status(500).json({ error: "❌Something went wrong while updating the product." });
    }
};

// delete a product
export const deleteProduct = async (req, res) => {
    try {
        const { productId } = req.body;

        if (!productId) {
            return res.status(400).json({ error: "❌Product ID is required." });
        }

        const deletedProduct = await productModel.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).json({ error: "❌Product not found." });
        }

        res.status(200).json({
            success: true,
            message: "✅Product deleted successfully."
        });
    } catch (err) {
        console.error("Delete product error:", err);
        res.status(500).json({ error: "❌Something went wrong while deleting the product." });
    }
};