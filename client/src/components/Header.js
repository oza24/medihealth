import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const Header = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [vendorName, setVendorName] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);

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
    <header className="bg-green-600 text-white shadow-md py-4 px-6 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center flex-wrap">
        {/* Logo */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/')}>
          <img src="/images/images.jpeg" alt="Medical Logo" className="w-10 h-10 rounded-full" />
          <h1 className="text-xl font-bold">MedicoCare</h1>
        </div>

        {/* Navigation */}
        <nav className="flex space-x-6 text-sm md:text-base mt-2 md:mt-0">
          <a href="/" className="hover:underline">Home</a>
          <a href="/shop" className="hover:underline">Shop</a>
          <a href="/about" className="hover:underline">About</a>
          <a href="/contact" className="hover:underline">Contact</a>
        </nav>

        {/* Right side: Search, Cart, User */}
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          {/* Search */}
          <div className="relative w-48 md:w-64">
            <input
              type="text"
              placeholder="Search medicines..."
              className="w-full px-3 py-2 text-black rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
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

          {/* Cart */}
          <img
            src="/images/cart-img2.png"
            alt="Cart"
            className="w-8 h-8 cursor-pointer"
            onClick={() => navigate('/cart')}
          />

          {/* User/Login */}
          <button
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-green-500 transition"
            onClick={() => navigate('/vendor/login')}
          >
            <img src="/images/manager.png" alt="Login" className="w-7 h-7" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
