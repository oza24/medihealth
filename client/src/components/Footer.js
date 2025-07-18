import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Column 1: About */}
        <div className="footer-section">
          <h3>MedicoCare</h3>
          <p>Your trusted online medical store. We deliver health to your doorstep.</p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/shop">Shop</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        {/* Column 3: Contact */}
        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: support@medicocare.com</p>
          <p>Phone: +91 98765 43210</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 MedicoCare. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
