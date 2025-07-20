import React, { useEffect, useState } from 'react';
import '../Styles/Home.css';
import api from '../api'; // API import

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get('/api/vendors/products')
      .then((res) => {
        console.log("API response:", res.data);
        // Adjust this line depending on actual API structure
        setProducts(Array.isArray(res.data) ? res.data : res.data.products || []);
      })
      .catch((err) => {
        console.error('Error fetching products:', err);
      });
  }, []);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-text">
          <h1>Trusted Online Medical Store</h1>
          <p>Affordable, authentic, and quick delivery of medicines & health essentials.</p>
          <button className="shop-now">Shop Now</button>
        </div>
      </section>

      {/* Category Highlights */}
      <section className="categories">
        <h2>Shop by Category</h2>
        <div className="category-grid">
          <div className="category-card">Medicines</div>
          <div className="category-card">Supplements</div>
          <div className="category-card">Devices</div>
          <div className="category-card">COVID Essentials</div>
        </div>
      </section>

      {/* Product Section */}
      <section className="products">
        <h2>Top Products</h2>
        <div className="product-grid">
          {Array.isArray(products) && products.length > 0 ? (
            products.map(product => (
              <div className="product-card" key={product._id}>
                <img src={product.imageUrl} alt={product.name} />
                <h3>{product.name}</h3>
                <p>₹{product.price}</p>
                <button className="shop-button">Shop</button>
              </div>
            ))
          ) : (
            <p>No products available or failed to fetch products.</p>
          )}
        </div>
      </section>

      {/* Why Us */}
      <section className="trust-section">
        <h2>Why Choose MedicoCare?</h2>
        <div className="trust-grid">
          <div className="trust-item">✅ 100% Genuine Medicines</div>
          <div className="trust-item">🚚 Fast Delivery</div>
          <div className="trust-item">🔒 Secure Payments</div>
          <div className="trust-item">📞 24/7 Support</div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 MedicoCare | Made with ❤️ in India</p>
        <p>Contact: support@medicocare.com</p>
      </footer>
    </div>
  );
};

export default Home;
