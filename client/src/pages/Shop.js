import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Styles/Shop.css'; // Create this CSS file for styling

const Shop = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from backend
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/vendors/products');
        setProducts(res.data);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="shop-container">
      <h2>Shop Medicines & Essentials</h2>
      <div className="shop-grid">
        {products.map(product => (
          <div className="shop-card" key={product._id}>
            <img
              src={product.imageUrl}
              alt={product.name}
              className="shop-image"
            />
            <h4>{product.name}</h4>
            <p>₹{product.price}</p>
            <button className="shop-button">Shop</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
