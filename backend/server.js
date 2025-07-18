const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Serve uploaded images to frontend
app.use('/api/vendors/uploads', express.static('uploads'));

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  dbName: 'Medical_website',
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB (Medical_website)"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

mongoose.connection.once('open', () => {
  console.log('📌 Connected to DB:', mongoose.connection.name);
});

// Routes
const vendorRoutes = require('./routes/vendor');
app.use('/api/vendors', vendorRoutes);

const contactRoutes = require('./routes/contact');
app.use('/api/contact', contactRoutes);

const productRoutes = require('./routes/productRoutes'); // ✅ New line
app.use('/api/products', productRoutes); // ✅ New route


// Start server
app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});
