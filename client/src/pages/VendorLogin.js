import React, { useState } from 'react';
import '../Styles/VendorLogin.css';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';  

import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/vendors/login', {
        email,
        password,
      });
      localStorage.setItem('vendorName', res.data.name);
      navigate('/vendor/dashboard');
    } catch (error) {
      console.error(error);
      setErrorMsg('Login failed. Check your credentials.');
    }
  };

  const handleGoogleLoginSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    console.log('Google User:', decoded);

    // Store user info (name/email) in localStorage
    localStorage.setItem('vendorName', decoded.name || decoded.email);

    // Optionally: Send decoded.email or id_token to your backend to create/check the vendor

    navigate('/vendor/dashboard');
  };

  return (
    <div className="login-container">
      <div className="login-right">
        <h2>Login to MedicoCare</h2>

        {/* ✅ Google Login Button */}
        <GoogleLogin
          onSuccess={handleGoogleLoginSuccess}
          onError={() => setErrorMsg('Google login failed')}
        />

        <div className="divider">or</div>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email Address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="login-btn">Login</button>
        </form>

        {errorMsg && <p style={{ color: 'red', marginTop: '10px' }}>{errorMsg}</p>}

        <p className="register-link">
          Don’t have an account? <Link to="/vendor/register">Create one</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
