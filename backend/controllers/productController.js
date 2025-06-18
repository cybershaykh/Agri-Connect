import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import productModel from '../models/productModel.js';

// create a new product
export const addProduct = async (req, res) => {
    try {
        const { name, description, category, rating, price, image, offerPrice, inStock, location,
            farmerImage, farmerAddress, farmerName, farmerPhone, farmerEmail
         } = req.body;

        if (!name || !category || !image || !price) {
            return res.status(400).json({ error: "❌Please provide all required fields." });
        }

        const newProduct = new productModel({
            name,
            description,
            category,
            rating: rating || 0,
            price,
            offerPrice: offerPrice || 0,
            image,
            location,
            inStock: inStock !== undefined ? inStock : true,
            farmerImage,
            farmerAddress,
            farmerName,
            farmerPhone,
            farmerEmail,
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

//get all products
export const getAllProducts = async (req, res) => {
    try {
        const products = await productModel.find({}).sort({ createdAt: -1 });

        if (products.length === 0) {
            return res.status(404).json({ error: "❌No products found." });
        }

        res.status(200).json({
            success: true,
            message: "✅Products retrieved successfully.",
            products
        });
    } catch (err) {
        console.error("Get all products error:", err);
        res.status(500).json({ error: "❌Something went wrong while retrieving products." });
    }
};

// get a single product by ID
export const getProductById = async (req, res) => {
    try {
        const { productId } = req.body;

        if (!productId) {
            return res.status(400).json({ error: "❌Product ID is required." });
        }

        const product = await productModel.findById(productId);

        if (!product) {
            return res.status(404).json({ error: "❌Product not found." });
        }

        res.status(200).json({
            success: true,
            message: "✅Product retrieved successfully.",
            product
        });
    } catch (err) {
        console.error("Get product by ID error:", err);
        res.status(500).json({ error: "❌Something went wrong while retrieving the product." });
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