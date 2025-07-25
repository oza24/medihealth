const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Vendor = require('../models/VendorModel');
const Product = require('../models/Product');

// Serve uploaded images from /uploads
router.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Multer storage config
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// ========================
// ✅ Vendor Registration
// ========================
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, storeName } = req.body;

    const newVendor = new Vendor({ name, email, password, storeName });
    await newVendor.save();

    res.status(201).json({ message: 'Vendor registered successfully' });
  } catch (err) {
    console.error('Registration error:', err.message);
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Email already registered' });
    }
    res.status(500).json({ message: 'Registration failed' });
  }
});

// ========================
// ✅ Add Product (with Image)
// ========================
router.post('/add-product', upload.single('image'), async (req, res) => {
  try {
    const { name, price, description, vendorEmail } = req.body;

    // Save relative path only
    const imageUrl = `/uploads/${req.file.filename}`;

    const newProduct = new Product({
      name,
      price,
      description,
      imageUrl,
      vendorEmail,
    });

    await newProduct.save();

    res.status(201).json({ message: 'Product added successfully', product: newProduct });
  } catch (err) {
    console.error('Error adding product:', err);
    res.status(500).json({ message: 'Failed to add product' });
  }
});

// ========================
// ✅ Fetch All Products
// ========================
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ message: 'Failed to fetch products' });
  }
});

const bcrypt = require('bcrypt');

// ========================
// ✅ Vendor Login Route
// ========================
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const vendor = await Vendor.findOne({ email });

    if (!vendor) {
      return res.status(400).json({ message: 'Vendor not found' });
    }

    const isMatch = await bcrypt.compare(password, vendor.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    res.status(200).json({ message: 'Login successful', name: vendor.name });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
