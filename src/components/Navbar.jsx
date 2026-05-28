import React, { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  const handleNavClick = (toElement) => {
    setMenuOpen(false);
    
    if (isHomePage) {
      // If already on home page, just scroll to the element
      const element = document.getElementById(toElement);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If on another page, navigate to home page first, then scroll after page loads
      // Store the target element in sessionStorage before navigation
      sessionStorage.setItem('scrollTo', toElement);
      window.location.href = '/';
    }
  };

  // Check for stored scroll target after component mounts (for cross-page navigation)
  React.useEffect(() => {
    const scrollTarget = sessionStorage.getItem('scrollTo');
    if (scrollTarget && location.pathname === '/') {
      sessionStorage.removeItem('scrollTo');
      // Small delay to ensure the page has loaded
      setTimeout(() => {
        const element = document.getElementById(scrollTarget);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    }
  }, [location.pathname]);

  return (
    <header className="navbar">
      <div className="logo">
        <RouterLink to="/" onClick={handleLinkClick}>
          <img src={`${process.env.PUBLIC_URL}/assets/ELVRElogo1.png`} alt="Elvre Logo" />
        </RouterLink>
      </div>

      <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <RouterLink to="/" onClick={handleLinkClick}>
          Home
        </RouterLink>
        <RouterLink to="/products" onClick={handleLinkClick}>
          Products
        </RouterLink>
        <RouterLink to="/blog" onClick={handleLinkClick}>
          Blog
        </RouterLink>
        <RouterLink to="/our-story" onClick={handleLinkClick}>
          Our Story
        </RouterLink>
        <button onClick={() => handleNavClick('testimonial')} className="nav-link-btn">
          Testimonials
        </button>
        <button onClick={() => handleNavClick('contact')} className="nav-link-btn">
          Contact Us
        </button>
        <RouterLink to="/cart" className="cart-link" onClick={handleLinkClick}>
          <span className="cart-icon">🛒</span>
          <span className="cart-text">Cart</span>
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </RouterLink>
      </div>

      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
    </header>
  );
};

export default Navbar;