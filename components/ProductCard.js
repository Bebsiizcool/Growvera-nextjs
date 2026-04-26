"use client";

import React, { useState } from "react";
import { useCart } from "./context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [toastMessage, setToastMessage] = useState("");

  const formatPrice = (price) => `Rs. ${price.toLocaleString("en-PK")}`;

  const handleAddToCart = () => {
    addToCart(product);
    setToastMessage("Added to your cart.");
    setTimeout(() => setToastMessage(""), 2600);
  };

  return (
    <>
      <article className="product-card anim-reveal is-visible">
        <span className="product-badge">{product.category}</span>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div className="product-visual">
          {product.id === 'hair-oil' && (
            <img src="/hair-oil.png" alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.5))' }} />
          )}
          {product.id === 'face-gel' && (
            <img src="/face-gel.png" alt={product.name} style={{ width: '100%', height: '80%', objectFit: 'contain', filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.5))' }} />
          )}
          {product.id === 'ritual-bundle' && (
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
               <img src="/hair-oil-single.png" alt="Hair Oil" style={{ height: '75%', objectFit: 'contain', filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.5))' }} />
               <img src="/face-gel.png" alt="Face Gel" style={{ height: '55%', objectFit: 'contain', filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.5))' }} />
            </div>
          )}
        </div>
        <div className="product-meta">
          {product.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
          <span>{product.size}</span>
        </div>
        <div className="product-footer">
          <div className="price-block">
            <span className="price-current">{formatPrice(product.price)}</span>
            <span className="price-old">{formatPrice(product.compareAt)}</span>
          </div>
          <button className="btn btn--glass" style={{padding: '10px 20px', fontSize: '0.9rem'}} onClick={handleAddToCart}>
            Add To Cart
          </button>
        </div>
      </article>

      {toastMessage && (
        <div className="toast is-visible" role="status" aria-live="polite">
          {toastMessage}
        </div>
      )}
    </>
  );
}
