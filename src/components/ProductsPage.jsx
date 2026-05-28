import React from "react";
import Navbar from "./Navbar";
import ProductCarousel from "./ProductCarousel";
import Footer from "./Footer";
import WhatsApp from "./WhatsApp";
import BackToTop from "./BackToTop";
import "./ProductsPage.css";

const ProductsPage = () => {
  return (
    <>
      <Navbar />
      <section className="products-page">
        <div className="products-hero" data-aos="fade-down">
          <h1>Our Premium Products</h1>
          <p>Made With Love and Care ❤️</p>  {/* ✅ CHANGED */}
        </div>
        <ProductCarousel />
      </section>
      <Footer />
      <WhatsApp />
      <BackToTop />
    </>
  );
};

export default ProductsPage;