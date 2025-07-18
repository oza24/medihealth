import React from 'react';
import '../Styles/About.css'; // Assuming you have a CSS file for styling 

function About() {
  return (
    <div className="about-container" style={{ padding: '40px', maxWidth: '800px', margin: 'auto' }}>
      <h1>About Us</h1>
      <p>
        Welcome to <strong>Medical Market</strong>, your trusted platform where healthcare meets convenience.
        We connect verified medical vendors directly with customers across India, enabling easy access to essential medical products — all in one place.
      </p>
      <h2>Our Mission</h2>
      <p>
        To simplify access to quality medical supplies by empowering local vendors to sell directly through our platform.
      </p>
      <h2>For Customers</h2>
      <ul>
        <li>Buy genuine medicines and healthcare products</li>
        <li>Compare prices from multiple vendors</li>
        <li>Fast doorstep delivery</li>
      </ul>
      <h2>For Vendors</h2>
      <ul>
        <li>Create a free account</li>
        <li>Upload your products</li>
        <li>Manage orders easily</li>
      </ul>
      <h2>Trust & Safety</h2>
      <p>All vendors are verified. We ensure quality, compliance, and secure transactions.</p>
      <h2>Contact Us</h2>
      <p>Email: support@medicalmarket.com</p>
    </div>
  );
}

export default About;
