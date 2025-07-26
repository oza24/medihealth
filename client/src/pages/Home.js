import React, { useEffect, useState, useContext } from 'react';
import api from '../api';
import {
  FaCapsules, FaAppleAlt, FaHeartbeat, FaVirus,
  FaShippingFast, FaLock, FaHeadset, FaCheckCircle
} from 'react-icons/fa';
import { CartContext } from '../contexts/CartContext';

const categories = [
  { name: 'Medicines', icon: <FaCapsules size={28} className="mx-auto text-blue-500" /> },
  { name: 'Supplements', icon: <FaAppleAlt size={28} className="mx-auto text-green-500" /> },
  { name: 'Devices', icon: <FaHeartbeat size={28} className="mx-auto text-pink-500" /> },
  { name: 'COVID Essentials', icon: <FaVirus size={28} className="mx-auto text-yellow-500" /> },
];

const whyUs = [
  { icon: <FaCheckCircle size={28} className="mx-auto text-green-500" />, text: '100% Genuine Medicines' },
  { icon: <FaShippingFast size={28} className="mx-auto text-blue-500" />, text: 'Fast Delivery' },
  { icon: <FaLock size={28} className="mx-auto text-purple-500" />, text: 'Secure Payments' },
  { icon: <FaHeadset size={28} className="mx-auto text-teal-500" />, text: '24/7 Support' },
];

const Home = () => {
  const [products, setProducts] = useState([]);
  const [modalProduct, setModalProduct] = useState(null);
  const [message, setMessage] = useState('');
  const { cartItems, addToCart } = useContext(CartContext);

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

  const handleAddToCart = (product) => {
    addToCart(product);
    setMessage('✅ Product added to cart!');
    setTimeout(() => setMessage(''), 2000);
  };

  return (
    <div className="font-sans text-gray-800 bg-gradient-to-br from-blue-50 via-white to-teal-50">

      {/* Hero */}
      <section className="relative text-black py-16 px-4 sm:px-6 md:px-20 text-center overflow-hidden">
        <div
          className="absolute inset-0 opacity-100 bg-cover bg-center pointer-events-none"
          style={{ backgroundImage: "url('/images/background.jpg')" }}
        />
        <div className="relative z-10 max-w-4xl mx-auto animate-fadeIn">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight">
            Trusted Online Medical Store
          </h1>
          <p className="text-lg sm:text-xl mb-6 font-medium">
            Affordable, authentic, and fast delivery of medicines & health essentials.
          </p>
          <button className="bg-white text-blue-600 font-semibold px-6 py-2 rounded-full shadow-md hover:bg-blue-100 hover:scale-105 transition duration-300 text-base sm:text-lg">
            Shop Now
          </button>
        </div>
      </section>

      {/* Categories */}
      <section className="py-10 px-4 sm:px-6 md:px-20 bg-white">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">Shop by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="bg-gradient-to-br from-blue-100 to-teal-100 text-center py-6 sm:py-8 rounded-xl shadow hover:shadow-xl hover:-translate-y-1 transition cursor-pointer group"
            >
              {cat.icon}
              <div className="mt-2 text-sm sm:text-lg font-semibold group-hover:text-blue-600">{cat.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Top Products */}
      <section className="py-10 px-4 sm:px-6 md:px-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">Top Products</h2>
        {message && (
          <p className="text-center text-green-600 mb-4 font-semibold">{message}</p>
        )}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white p-4 rounded-xl shadow hover:shadow-xl hover:-translate-y-1 transition group"
              >
                <img
                  src={`https://medihealth-backend.onrender.com${product.imageUrl}`}
                  alt={product.name}
                  className="w-full h-40 sm:h-48 object-cover rounded-lg mb-3"
                />
                <h3 className="text-base sm:text-lg font-bold mb-1">{product.name}</h3>
                <p className="text-blue-600 font-semibold mb-2 text-sm sm:text-base">₹{product.price}</p>
                <button
                  className="w-full bg-gradient-to-r from-blue-500 to-teal-400 text-white py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-teal-500 transition text-sm"
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
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md relative">
            <button
              className="absolute top-3 right-4 text-gray-500 hover:text-red-500 text-2xl"
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
              className="w-full h-48 object-cover rounded mb-4"
              onError={(e) => { e.target.src = '/images/placeholder.jpg'; }}
            />
            <h3 className="text-xl font-bold mb-2">{modalProduct.name}</h3>
            <p className="text-blue-600 font-semibold mb-2">₹{modalProduct.price}</p>
            <p className="text-sm text-gray-700 mb-4">{modalProduct.description || 'No description available.'}</p>
            <button
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
              onClick={() => {
                handleAddToCart(modalProduct);
                setModalProduct(null);
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}

      {/* Why Us */}
      <section className="bg-gradient-to-r from-teal-50 to-blue-50 py-10 px-4 sm:px-6 md:px-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">Why Choose MedicoCare?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto text-center">
          {whyUs.map((item) => (
            <div
              key={item.text}
              className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition group"
            >
              {item.icon}
              <div className="mt-3 text-sm sm:text-lg font-semibold group-hover:text-blue-600">{item.text}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6 text-center text-sm">
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
