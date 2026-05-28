import React, { useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Home from "./Home";
import BuyNow from "./components/BuyNow";
import OurStory from "./components/OurStory";
import ProductsPage from "./components/ProductsPage";
import Blog from "./components/Blog";
import Cart from "./components/Cart";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import BackToTop from "./components/BackToTop";
import { CartProvider } from "./context/CartContext";

function App() {
  useEffect(() => {
    AOS.init({ 
      duration: 1000, 
      once: true, 
      offset: 100,
      disable: false
    });
  }, []);

  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/buynow" element={<BuyNow />} />
          <Route path="/our-story" element={<OurStory />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Routes>
        <BackToTop />
      </Router>
    </CartProvider>
  );
}

export default App;