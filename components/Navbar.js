"use client";

import React, { useState } from "react";
import { useCart } from "./context/CartContext";

export default function Navbar() {
  const { cart, setIsDrawerOpen } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="nav-bar">
      <div className="nav-inner">
        <a className="nav-brand" href="/" aria-label="Growvera home">
          <img src="/logo.png" alt="Growvera Logo" style={{ height: '100%', objectFit: 'contain' }} />
        </a>

        <button
          className="nav-hamburger"
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        <nav className={`nav-links ${isMenuOpen ? "is-open" : ""}`} style={isMenuOpen ? {display: 'flex', flexDirection: 'column', position: 'absolute', top: '80px', left: '24px', right: '24px', background: 'rgba(11, 20, 16, 0.95)', padding: '24px', borderRadius: '24px', border: '1px solid var(--glass-border)'} : {}}>
          <a href="#shop" className="nav-link" onClick={() => setIsMenuOpen(false)}>Shop</a>
          <a href="#ingredients" className="nav-link" onClick={() => setIsMenuOpen(false)}>Ingredients</a>
          <a href="#ritual" className="nav-link" onClick={() => setIsMenuOpen(false)}>Routine</a>
          <a href="#reviews" className="nav-link" onClick={() => setIsMenuOpen(false)}>Reviews</a>
          <a href="#consult" className="nav-link" onClick={() => setIsMenuOpen(false)}>Consult</a>
        </nav>

        <button className="nav-cart" type="button" onClick={() => setIsDrawerOpen(true)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0"/>
          </svg>
          <span className="cart-badge">{cartCount}</span>
        </button>
      </div>
    </header>
  );
}
