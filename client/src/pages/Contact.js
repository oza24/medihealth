import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/Contact.css';

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/contact', form);
      alert('Message sent successfully ✅');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      alert('Something went wrong ❌');
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-form-box">
        <h2>Get in Touch With Us</h2>
        <p>We're here to help you with prescriptions, orders, and support.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email Address"
            value={form.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Write your message here..."
            rows="6"
            value={form.message}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>

      <div className="contact-info">
        <h3>Customer Care</h3>
        <p>Email: support@medicocare.com</p>
        <p>Phone: +91 98765 43210</p>
        <p>Address: 3rd Floor, Health Tower, Mumbai, India</p>
      </div>
    </div>
  );
};

export default Contact;
