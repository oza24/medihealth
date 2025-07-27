import React, { useEffect, useState, useContext } from 'react';
import api from '../api';
import { CartContext } from '../contexts/CartContext';

const Devices = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get('/api/products/category/device'); // ✅ Only 'device' category
        setProducts(res.data);
      } catch (err) {
        console.error('Error fetching device products:', err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-green-700 mb-6">
        Health Devices
      </h2>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">No health devices available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              className="bg-white rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col items-center text-center"
              key={product._id}
            >
              <img
                  src={`${process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000'}${product.imageUrl}`}
                  alt={product.name}
                  className="w-full h-40 sm:h-48 object-cover rounded-lg mb-3"
                />
              <h4 className="text-lg font-semibold mb-1">{product.name}</h4>
              <p className="text-green-600 font-medium mb-3">₹{product.price}</p>
              <button
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition w-full"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Devices;
