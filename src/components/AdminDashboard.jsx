import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [message, setMessage] = useState("");
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    priceValue: "",
    stock: "",
    image: ""
  });

  // Check if admin is logged in
  useEffect(() => {
    const isAdmin = localStorage.getItem("adminLoggedIn");
    if (!isAdmin) {
      navigate("/admin");
    }
  }, [navigate]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    const savedProducts = localStorage.getItem("elvreProducts");
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      // Default products
      const defaultProducts = [
        {
          id: 1,
          name: "ELVRE Organic Jaggery Powder",
          description: "500g - Chemical Free",
          price: "₹149",
          priceValue: 149,
          stock: 50,
          image: "/assets/jaggery.png"
        },
        {
          id: 2,
          name: "ELVRE Premium Jaggery",
          description: "1kg - Farmer's Choice",
          price: "₹279",
          priceValue: 279,
          stock: 35,
          image: "/assets/productpacking.png"
        },
        {
          id: 3,
          name: "ELVRE Gift Pack",
          description: "500g x 2 - Special Edition",
          price: "₹299",
          priceValue: 299,
          stock: 20,
          image: "/assets/bowl.png"
        }
      ];
      setProducts(defaultProducts);
      localStorage.setItem("elvreProducts", JSON.stringify(defaultProducts));
    }
    setLoading(false);
  };

  const saveProducts = (updatedProducts) => {
    localStorage.setItem("elvreProducts", JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
    
    // Trigger event to update product displays
    window.dispatchEvent(new Event("productsUpdated"));
  };

  const handleAddProduct = () => {
    if (!formData.name || !formData.priceValue || !formData.stock) {
      setMessage("Please fill all required fields");
      return;
    }
    
    const newProduct = {
      id: Date.now(),
      name: formData.name,
      description: formData.description || "Pure & Natural",
      price: `₹${formData.priceValue}`,
      priceValue: parseFloat(formData.priceValue),
      stock: parseInt(formData.stock),
      image: formData.image || "/assets/jaggery.png"
    };
    
    const updatedProducts = [...products, newProduct];
    saveProducts(updatedProducts);
    
    setFormData({ name: "", description: "", priceValue: "", stock: "", image: "" });
    setShowAddForm(false);
    setMessage("Product added successfully!");
    setTimeout(() => setMessage(""), 3000);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      priceValue: product.priceValue,
      stock: product.stock,
      image: product.image
    });
  };

  const handleUpdateProduct = () => {
    const updatedProducts = products.map(p => 
      p.id === editingProduct.id 
        ? {
            ...p,
            name: formData.name,
            description: formData.description,
            price: `₹${formData.priceValue}`,
            priceValue: parseFloat(formData.priceValue),
            stock: parseInt(formData.stock),
            image: formData.image || p.image
          }
        : p
    );
    
    saveProducts(updatedProducts);
    setEditingProduct(null);
    setFormData({ name: "", description: "", priceValue: "", stock: "", image: "" });
    setMessage("Product updated successfully!");
    setTimeout(() => setMessage(""), 3000);
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const updatedProducts = products.filter(p => p.id !== id);
      saveProducts(updatedProducts);
      setMessage("Product deleted successfully!");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    navigate("/admin");
  };

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="admin-loading">Loading Dashboard...</div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <div className="admin-header-content">
          <img 
            src={`${process.env.PUBLIC_URL}/assets/ELVRElogo1.png`} 
            alt="Logo" 
            className="admin-logo"
          />
          <h1>Admin Dashboard</h1>
          <button onClick={handleLogout} className="admin-logout-btn">
            Logout
          </button>
        </div>
      </div>
      
      <div className="admin-container">
        {message && <div className="admin-message">{message}</div>}
        
        <div className="admin-actions">
          <button 
            onClick={() => {
              setShowAddForm(!showAddForm);
              setEditingProduct(null);
              setFormData({ name: "", description: "", priceValue: "", stock: "", image: "" });
            }}
            className="admin-add-btn"
          >
            + Add New Product
          </button>
        </div>
        
        {/* Add/Edit Form */}
        {(showAddForm || editingProduct) && (
          <div className="admin-product-form">
            <h3>{editingProduct ? "Edit Product" : "Add New Product"}</h3>
            <div className="admin-form-grid">
              <div className="admin-field">
                <label>Product Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Product name"
                />
              </div>
              <div className="admin-field">
                <label>Description</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Product description"
                />
              </div>
              <div className="admin-field">
                <label>Price (₹) *</label>
                <input
                  type="number"
                  value={formData.priceValue}
                  onChange={(e) => setFormData({...formData, priceValue: e.target.value})}
                  placeholder="Price in rupees"
                />
              </div>
              <div className="admin-field">
                <label>Stock Quantity *</label>
                <input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({...formData, stock: e.target.value})}
                  placeholder="Number in stock"
                />
              </div>
              <div className="admin-field full-width">
                <label>Image Path</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  placeholder="/assets/your-image.png"
                />
                <small>Use: /assets/jaggery.png , /assets/productpacking.png , /assets/bowl.png</small>
              </div>
            </div>
            <div className="admin-form-buttons">
              <button 
                onClick={editingProduct ? handleUpdateProduct : handleAddProduct}
                className="admin-save-btn"
              >
                {editingProduct ? "Update Product" : "Save Product"}
              </button>
              <button 
                onClick={() => {
                  setShowAddForm(false);
                  setEditingProduct(null);
                  setFormData({ name: "", description: "", priceValue: "", stock: "", image: "" });
                }}
                className="admin-cancel-btn"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        
        {/* Products Table */}
        <div className="admin-products-table">
          <h3>Product Inventory</h3>
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.stock}</td>
                    <td>
                      {product.stock > 0 ? (
                        <span className="stock-badge in-stock-badge">In Stock</span>
                      ) : (
                        <span className="stock-badge out-of-stock-badge">Out of Stock</span>
                      )}
                    </td>
                    <td className="admin-actions-cell">
                      <button 
                        onClick={() => handleEditProduct(product)}
                        className="admin-edit-btn"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteProduct(product.id)}
                        className="admin-delete-btn"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Quick Stock Update */}
        <div className="admin-quick-update">
          <h3>Quick Stock Update Guide</h3>
          <p>Use the Edit button to update price or stock for any product.</p>
          <p className="admin-note">
            Note: Changes will reflect immediately on the website for all users.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;