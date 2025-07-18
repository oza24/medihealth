import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api'; // ✅ Centralized Axios instance
import '../Styles/VendorRegister.css';

function VendorRegister() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    storeName: '',
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/api/vendors/register', form);  // ✅ using deployed backend
      alert(res.data.message || 'Registered successfully ✅');
      navigate('/vendor/login');  // ✅ redirect to login
    } catch (err) {
      console.error('Registration failed:', err);
      const errorMessage =
        err.response?.data?.message || err.message || 'Something went wrong';
      alert('Error: ' + errorMessage);
    }
  };

  return (
    <div className="vendor-register-container">
      <h2>Vendor Registration</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <input
          name="storeName"
          placeholder="Store Name"
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default VendorRegister;
