import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import api from '../api';
import { CartContext } from '../contexts/CartContext';
import { useContext } from 'react';

const Header = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [vendorName, setVendorName] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartItems } = useContext(CartContext);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);



  useEffect(() => {
    const name = localStorage.getItem('vendorName');
    if (name) setVendorName(name);
  }, []);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchInput.trim() === '') {
        setSearchResults([]);
        return;
      }
      try {
        const res = await api.get(`/api/products/search?q=${searchInput}`);
        setSearchResults(res.data);
      } catch (err) {
        console.error('Search failed:', err);
      }
    };

    const delayDebounce = setTimeout(fetchSearchResults, 500);
    return () => clearTimeout(delayDebounce);
  }, [searchInput]);

  const handleSearchClick = (id) => {
    navigate(`/product/${id}`);
    setSearchInput('');
    setSearchResults([]);
  };

  return (
    <header className="bg-green-600 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/')}>
          <img src="/images/images.jpeg" alt="Logo" className="w-10 h-10 rounded-full" />
          <h1 className="text-lg font-bold hidden sm:inline">MedicoCare</h1>
        </div>

        {/* Center: Search */}
        <div className="flex-1 mx-3 sm:mx-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for medicines..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-green-400 text-sm"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            {searchResults.length > 0 && (
              <ul className="absolute left-0 right-0 bg-white text-black border mt-1 rounded shadow z-10 max-h-60 overflow-y-auto">
                {searchResults.map((product) => (
                  <li
                    key={product._id}
                    onClick={() => handleSearchClick(product._id)}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {product.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Right: Cart, User, Menu */}
        <div className="flex items-center space-x-4 sm:space-x-6 ml-3">
          {/* Cart */}
          <div className="relative cursor-pointer" onClick={() => navigate('/cart')}>
            <img src="/images/cart-img2.png" alt="Cart" className="w-6 h-6 sm:w-7 sm:h-7" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                {totalItems}
              </span>
            )}
          </div>

          {/* User Icon */}
          <button
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-green-500 transition"
            onClick={() => navigate('/vendor/login')}
          >
            <img src="/images/manager.png" alt="Login" className="w-7 h-7" />
          </button>

          {/* Hamburger Icon */}
          <button
            className="sm:hidden text-xl focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Navigation */}
      {menuOpen && (
        <nav className="sm:hidden bg-green-500 text-white px-4 pb-3 transition-all duration-300">
          <a href="/" className="block py-2 border-b border-green-400" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="/shop" className="block py-2 border-b border-green-400" onClick={() => setMenuOpen(false)}>Shop</a>
          <a href="/about" className="block py-2 border-b border-green-400" onClick={() => setMenuOpen(false)}>About</a>
          <a href="/contact" className="block py-2" onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>
      )}

      {/* Desktop Navigation */}
      <nav className="hidden sm:flex justify-center space-x-8 py-2 bg-green-700 text-white text-sm font-medium">
        <a href="/" className="hover:underline">Home</a>
        <a href="/shop" className="hover:underline">Shop</a>
        <a href="/about" className="hover:underline">About</a>
        <a href="/contact" className="hover:underline">Contact</a>
      </nav>
    </header>
  );
};

export default Header;
