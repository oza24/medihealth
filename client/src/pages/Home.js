import React, { useEffect, useState } from 'react';
import api from '../api';
import {
  FaCapsules, FaAppleAlt, FaHeartbeat, FaVirus,
  FaShippingFast, FaLock, FaHeadset, FaCheckCircle
} from 'react-icons/fa';

// Category Icons
const categories = [
  { name: 'Medicines', icon: <FaCapsules size={32} className="mx-auto text-blue-500" /> },
  { name: 'Supplements', icon: <FaAppleAlt size={32} className="mx-auto text-green-500" /> },
  { name: 'Devices', icon: <FaHeartbeat size={32} className="mx-auto text-pink-500" /> },
  { name: 'COVID Essentials', icon: <FaVirus size={32} className="mx-auto text-yellow-500" /> },
];

// Why Choose Us
const whyUs = [
  { icon: <FaCheckCircle size={32} className="mx-auto text-green-500" />, text: '100% Genuine Medicines' },
  { icon: <FaShippingFast size={32} className="mx-auto text-blue-500" />, text: 'Fast Delivery' },
  { icon: <FaLock size={32} className="mx-auto text-purple-500" />, text: 'Secure Payments' },
  { icon: <FaHeadset size={32} className="mx-auto text-teal-500" />, text: '24/7 Support' },
];

const Home = () => {
  const [products, setProducts] = useState([]);
  const [modalProduct, setModalProduct] = useState(null);

  useEffect(() => {
    api.get('/api/vendors/products')
      .then((res) => {
        const data = res.data;
        setProducts(Array.isArray(data) ? data : data.products || []);
      })
      .catch(() => {
        setProducts([]);
      });
  }, []);

  return (
    <div className="font-sans text-gray-800 bg-gradient-to-br from-blue-50 via-white to-teal-50 min-h-screen">

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-lightgreen-600 to-teal-400 text-black py-20 px-6 md:px-20 text-center overflow-hidden">
        <div
          className="absolute inset-0 opacity-150 bg-cover bg-center pointer-events-none"
          style={{ backgroundImage: "url('/images/background.jpg')" }}
        />
        <div className="relative z-10 max-w-4xl mx-auto animate-fadeIn">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">Trusted Online Medical Store</h1>
          <p className="text-xl md:text-2xl mb-8 font-medium">
            Affordable, authentic, and quick delivery of medicines & health essentials.
          </p>
          <button className="bg-white text-blue-600 font-bold px-8 py-3 rounded-full shadow-lg hover:bg-blue-100 hover:scale-105 transition duration-300 text-lg">
            Shop Now
          </button>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-14 px-6 md:px-20 bg-white">
        <h2 className="text-3xl font-bold text-center mb-10">Shop by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="bg-gradient-to-br from-blue-100 to-teal-100 text-center py-8 rounded-2xl shadow hover:shadow-xl hover:-translate-y-2 transition cursor-pointer group"
            >
              {cat.icon}
              <div className="mt-4 text-lg font-semibold group-hover:text-blue-600">{cat.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Top Products */}
      <section className="py-14 px-6 md:px-20">
        <h2 className="text-3xl font-bold text-center mb-10">Top Products</h2>
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white p-5 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition relative group"
              >
               <img
                  src={`http://localhost:5000${product.imageUrl}`}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-lg"
                />


                <h3 className="text-lg font-bold mb-1">{product.name}</h3>
                <p className="text-blue-600 font-semibold mb-3 text-lg">₹{product.price}</p>
                <button
                  className="w-full bg-gradient-to-r from-blue-500 to-teal-400 text-white py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-teal-500 transition"
                  onClick={() => setModalProduct(product)}
                >
                  Quick View
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No products available or failed to fetch products.</p>
        )}
      </section>

      {/* Product Modal */}
      {modalProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-2xl"
              onClick={() => setModalProduct(null)}
              aria-label="Close"
            >
              &times;
            </button>
            <img
              src={
                modalProduct.imageUrl?.startsWith('http')
                ? modalProduct.imageUrl
                : `${process.env.REACT_APP_API_BASE_URL}${modalProduct.imageUrl || '/images/placeholder.jpg'}`
              }

              alt={modalProduct.name}
              className="w-full h-56 object-cover rounded-xl mb-4 border"
              onError={(e) => { e.target.src = '/images/placeholder.jpg'; }}
            />
            <h3 className="text-2xl font-bold mb-2">{modalProduct.name}</h3>
            <p className="text-blue-600 font-semibold mb-3 text-lg">₹{modalProduct.price}</p>
            <p className="mb-4 text-gray-700">{modalProduct.description || 'No description available.'}</p>
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
              Add to Cart
            </button>
          </div>
        </div>
      )}

      {/* Why Us Section */}
      <section className="bg-gradient-to-r from-teal-50 to-blue-50 py-14 px-6 md:px-20">
        <h2 className="text-3xl font-bold text-center mb-10">Why Choose MedicoCare?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto text-center">
          {whyUs.map((item) => (
            <div
              key={item.text}
              className="bg-white p-8 rounded-2xl shadow hover:shadow-xl transition group"
            >
              {item.icon}
              <div className="mt-4 text-lg font-semibold group-hover:text-blue-600">{item.text}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 text-center text-sm mt-10">
        <p>© 2025 MedicoCare | Made with ❤️ in India</p>
        <p>
          Contact:{' '}
          <a href="mailto:support@medicocare.com" className="underline hover:text-teal-300">
            support@medicocare.com
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Home;
