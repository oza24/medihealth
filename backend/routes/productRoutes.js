const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// ✅ Add Product - POST /api/products/add-product
router.post('/add-product', async (req, res) => {
  try {
    const { name, price, imageUrl, description, category } = req.body;

    if (!name || !price || !category) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newProduct = new Product({
      name,
      price,
      imageUrl,
      description,
      category: category.toLowerCase()
    });

    await newProduct.save();
    res.status(201).json({ message: 'Product added successfully', product: newProduct });
  } catch (err) {
    console.error('❌ Error saving product:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// ✅ Get products by category - GET /api/products/category/:cat
router.get('/category/:cat', async (req, res) => {
  try {
    const category = req.params.cat.toLowerCase();
    const products = await Product.find({ category });
    res.json(products);
  } catch (err) {
    console.error('❌ Error fetching category:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
