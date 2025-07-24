import React, { useEffect, useState } from 'react';
import api from '../api'; // Ensure your API is correctly set

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get('/api/vendors/products')
      .then((res) => {
        console.log("API response:", res.data);
        setProducts(Array.isArray(res.data) ? res.data : res.data.products || []);
      })
      .catch((err) => {
        console.error('Error fetching products:', err);
      });
  }, []);

  return (
    <div className="font-sans text-gray-800">

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-teal-400 text-white py-16 px-6 md:px-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Trusted Online Medical Store</h1>
          <p className="text-lg md:text-xl mb-6">Affordable, authentic, and quick delivery of medicines & health essentials.</p>
          <button className="bg-white text-blue-600 font-semibold px-6 py-2 rounded-lg shadow hover:bg-blue-100 transition duration-300">
            Shop Now
          </button>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 px-6 md:px-20 bg-gray-100">
        <h2 className="text-2xl font-semibold text-center mb-8">Shop by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {['Medicines', 'Supplements', 'Devices', 'COVID Essentials'].map((category, index) => (
            <div
              key={index}
              className="bg-white text-center py-6 rounded-lg shadow hover:shadow-md transition"
            >
              {category}
            </div>
          ))}
        </div>
      </section>

      {/* Products */}
      <section className="py-12 px-6 md:px-20">
        <h2 className="text-2xl font-semibold text-center mb-8">Top Products</h2>
        {Array.isArray(products) && products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
              >
                <img
                  src={
                    product.imageUrl?.startsWith('http')
                      ? product.imageUrl
                      : `/images/${product.imageUrl || 'placeholder.jpg'}`
                  }
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-medium mb-2">{product.name}</h3>
                <p className="text-blue-600 font-semibold mb-3">₹{product.price}</p>
                <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                  Shop
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No products available or failed to fetch products.</p>
        )}
      </section>

      {/* Why Us */}
      <section className="bg-teal-50 py-12 px-6 md:px-20">
        <h2 className="text-2xl font-semibold text-center mb-8">Why Choose MedicoCare?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto text-center">
          <div className="bg-white p-6 rounded-lg shadow">✅ 100% Genuine Medicines</div>
          <div className="bg-white p-6 rounded-lg shadow">🚚 Fast Delivery</div>
          <div className="bg-white p-6 rounded-lg shadow">🔒 Secure Payments</div>
          <div className="bg-white p-6 rounded-lg shadow">📞 24/7 Support</div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 text-center text-sm">
        <p>© 2025 MedicoCare | Made with ❤️ in India</p>
        <p>Contact: support@medicocare.com</p>
      </footer>
    </div>
  );
};

export default Home;
