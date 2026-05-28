import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsApp from "./WhatsApp";
import "./Cart.css";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    window.location.href = "/#/buynow";
  };

  if (cartItems.length === 0) {
    return (
      <>
        <Navbar />
        <div className="cart-empty">
          <div className="cart-empty-content">
            <h2>Your Cart is Empty 🛒</h2>
            <p>Looks like you haven't added any products to your cart yet.</p>
            <Link to="/products" className="continue-shopping-btn">
              Continue Shopping
            </Link>
          </div>
        </div>
        <Footer />
        <WhatsApp />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="cart-page">
        <div className="cart-container">
          <h1 className="cart-title">Shopping Cart</h1>
          
          <div className="cart-content">
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} className="cart-item-image" />
                  <div className="cart-item-details">
                    <h3>{item.name}</h3>
                    <p className="cart-item-price">{item.price}</p>
                    <p className="cart-item-stock">Stock: {item.stock} available</p>
                  </div>
                  <div className="cart-item-quantity">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="qty-btn"
                    >
                      -
                    </button>
                    <span className="qty-value">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="qty-btn"
                    >
                      +
                    </button>
                  </div>
                  <div className="cart-item-total">
                    ₹{(parseFloat(item.price.replace('₹', '')) * item.quantity).toFixed(2)}
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="remove-btn"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
            
            <div className="cart-summary">
              <h3>Order Summary</h3>
              <div className="summary-row">
                <span>Subtotal ({cartItems.reduce((c, i) => c + i.quantity, 0)} items)</span>
                <span>₹{getCartTotal().toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>₹{getCartTotal().toFixed(2)}</span>
              </div>
              <div className="cart-actions">
                <button onClick={clearCart} className="clear-cart-btn">
                  Clear Cart
                </button>
                <button onClick={handleCheckout} className="checkout-btn">
                  Proceed to Checkout
                </button>
              </div>
              <Link to="/products" className="continue-shopping-link">
                ← Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <WhatsApp />
    </>
  );
};

export default Cart;