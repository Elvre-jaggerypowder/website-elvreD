import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Admin credentials (you can change these)
  const ADMIN_USERNAME = "elvre_admin";
  const ADMIN_PASSWORD = "Elvre@2024";

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      localStorage.setItem("adminLoggedIn", "true");
      navigate("/admin-dashboard");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <img 
          src={`${process.env.PUBLIC_URL}/assets/ELVRElogo1.png`} 
          alt="ELVRE Logo" 
          className="admin-login-logo"
        />
        <h2>Admin Login</h2>
        <p className="admin-login-subtitle">Manage Products & Inventory</p>
        
        {error && <div className="admin-login-error">{error}</div>}
        
        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="admin-form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
            />
          </div>
          
          <div className="admin-form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>
          
          <button type="submit" className="admin-login-btn">
            Login
          </button>
        </form>
        
        <p className="admin-login-note">
          Demo Login: elvre_admin / Elvre@2024
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;