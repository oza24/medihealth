import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VendorRegister from './pages/VendorRegister';
import VendorLogin from './pages/VendorLogin';
import VendorDashboard from './pages/VendorDashboard';
import Home from './pages/Home'; // ⬅ changed to Home
import Header from './components/Header'; 
import Footer from './components/Footer'; 
import About from './pages/About';
import Contact from './pages/Contact'; 
import Shop from './pages/Shop'; 
import { CartProvider } from './contexts/CartContext';
import CartPage from './pages/CartPage'; // ⬅ added CartPage

import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  return (
    <GoogleOAuthProvider clientId="266928814543-il81p0a8it5acv02vdumam21dl9f1uef.apps.googleusercontent.com">
      <CartProvider> {/* ✅ Wrap everything */}
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/vendor/register" element={<VendorRegister />} />
            <Route path="/vendor/login" element={<VendorLogin />} />
            <Route path="/vendor/dashboard" element={<VendorDashboard />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/shop" element={<Shop />} />
            {/* You need a CartPage */}
            <Route path="/cart" element={<CartPage />} />
          </Routes>
          <Footer />
        </Router>
      </CartProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
