const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); // Adjust path if needed

// 🔍 Search Products by Name
router.get('/search', async (req, res) => {
  const query = req.query.q;
  try {
    const products = await Product.find({
      name: { $regex: query, $options: 'i' }, // case-insensitive match
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
