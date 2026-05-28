import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useCart } from "../context/CartContext";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./ProductCarousel.css";

const ProductCarousel = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
    
    // Listen for product updates from admin panel
    window.addEventListener("productsUpdated", loadProducts);
    return () => window.removeEventListener("productsUpdated", loadProducts);
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
          image: `${process.env.PUBLIC_URL}/assets/jaggery.png`,
          stock: 50
        },
        {
          id: 2,
          name: "ELVRE Premium Jaggery",
          description: "1kg - Farmer's Choice",
          price: "₹279",
          priceValue: 279,
          image: `${process.env.PUBLIC_URL}/assets/productpacking.png`,
          stock: 35
        },
        {
          id: 3,
          name: "ELVRE Gift Pack",
          description: "500g x 2 - Special Edition",
          price: "₹299",
          priceValue: 299,
          image: `${process.env.PUBLIC_URL}/assets/bowl.png`,
          stock: 20
        }
      ];
      setProducts(defaultProducts);
      localStorage.setItem("elvreProducts", JSON.stringify(defaultProducts));
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    alert(`${product.name} added to cart!`);
  };

  return (
    <section className="product-carousel-section" data-aos="fade-up">
      <div className="product-carousel-header">
        <h2 className="product-carousel-title">Our Products</h2>
        <p className="product-carousel-subtitle">Shop the best quality jaggery powder</p>
      </div>

      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        navigation={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="product-swiper"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="product-card">
              <img src={product.image} alt={product.name} className="product-image" />
              <h3 className="product-name">{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <div className="product-price">{product.price}</div>
              <div className="product-stock">
                {product.stock > 0 ? (
                  <span className="in-stock">✓ In Stock ({product.stock} available)</span>
                ) : (
                  <span className="out-of-stock">✗ Out of Stock</span>
                )}
              </div>
              {product.stock > 0 && (
                <>
                  <button 
                    className="product-btn add-to-cart-btn" 
                    onClick={() => handleAddToCart(product)}
                  >
                    🛒 Add to Cart
                  </button>
                  <button 
                    className="product-btn buy-now-btn-small" 
                    onClick={() => window.location.href = "/#/buynow"}
                  >
                    Buy Now
                  </button>
                </>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default ProductCarousel;