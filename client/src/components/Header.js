import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
// import axios from 'axios';
import api from '../api';  // import at the top


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

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLogout = () => {
    localStorage.removeItem('vendorName');
    setVendorName(null);
    setDropdownOpen(false);
    navigate('/');
  };

  const handleSignIn = () => {
    setDropdownOpen(false);
    navigate('/vendor/login');
  };

  const handleDashboard = () => {
    setDropdownOpen(false);
    navigate('/vendor/dashboard');
  };

  const handleSearchClick = (id) => {
    navigate(`/product/${id}`);
    setSearchInput('');
    setSearchResults([]);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <img src="/images/images.jpeg" alt="Medical Logo" />
          <h1>MedicoCare</h1>
        </div>

        <nav className="nav">
          <a href="/">Home</a>
          <a href="/shop">Shop</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </nav>

        <div className="header-right">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search medicines..."
              className="search-bar"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            {searchResults.length > 0 && (
              <ul className="search-dropdown">
                {searchResults.map((product) => (
                  <li
                    key={product._id}
                    onClick={() => handleSearchClick(product._id)}
                    className="search-item"
                  >
                    {product.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Cart Image */}
          <img
            src="/images/cart-img2.png"
            alt="Cart"
            className="cart-img"
            onClick={() => navigate('/cart')}
          />

          {/* Login/User Icon Button */}
          <button className="user-button" onClick={() => navigate('/vendor/login')}>
            <img src="/images/manager.png" alt="Login" className="user-icon" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
