import React, { useEffect, useState } from 'react';
import api from '../api'; // ✅ centralized API instance
import '../Styles/Shop.css';

const Shop = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get('/api/vendors/products');  // ✅ live backend
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
              src={product.imageUrl?.startsWith('http') ? product.imageUrl : `/images/${product.imageUrl || 'placeholder.jpg'}`}
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
