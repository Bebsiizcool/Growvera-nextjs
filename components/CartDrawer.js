"use client";

import React, { useState } from "react";
import { useCart } from "./context/CartContext";

export default function CartDrawer() {
  const {
    cart,
    isDrawerOpen,
    setIsDrawerOpen,
    updateQuantity,
    subtotal,
    setIsCheckoutOpen,
  } = useCart();
  const [toastMessage, setToastMessage] = useState("");

  const formatPrice = (price) => `Rs. ${price.toLocaleString("en-PK")}`;
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      showToast("Your cart is empty right now.");
      return;
    }
    setIsDrawerOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <>
      <div className={`overlay ${isDrawerOpen ? "" : "hidden"}`} hidden={!isDrawerOpen} onClick={() => setIsDrawerOpen(false)}></div>
      <aside className={`cart-drawer ${isDrawerOpen ? "is-open" : ""}`} aria-hidden={!isDrawerOpen}>
        <div className="drawer-header">
          <div>
            <span className="pill-label"><span className="pill-dot"></span>Your basket</span>
            <h2>Cart</h2>
          </div>
          <button className="close-btn" onClick={() => setIsDrawerOpen(false)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>

        <div className="drawer-body">
          <div className="cart-items">
            {cart.length === 0 ? (
              <div className="cart-item">
                <div>
                  <strong>Your cart is waiting.</strong>
                  <p>Add the Hair Oil, Face Gel, or the full Ritual Bundle to begin.</p>
                </div>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <div>
                    <strong>{item.name}</strong>
                    <span>{item.size}</span>
                    <p>{formatPrice(item.price * item.quantity)}</p>
                    <div className="cart-controls">
                      <button className="quantity-button" onClick={() => updateQuantity(item.id, -1)}>-</button>
                      <span>{item.quantity}</span>
                      <button className="quantity-button" onClick={() => updateQuantity(item.id, 1)}>+</button>
                    </div>
                  </div>
                  <strong>{formatPrice(item.price)}</strong>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="drawer-footer">
          <div className="cart-summary">
            <div className="summary-row">
              <span>Subtotal</span>
              <strong>{formatPrice(subtotal)}</strong>
            </div>
            <p id="shipping-note">
              {count === 0
                ? "Add items to unlock free delivery."
                : subtotal >= 6500
                ? "Free delivery unlocked across Pakistan."
                : `${formatPrice(6500 - subtotal)} away from free delivery.`}
            </p>
          </div>
          <button className="btn btn--primary btn--full" onClick={handleCheckout}>
            <span>Proceed To Checkout</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      </aside>

      {toastMessage && (
        <div className="toast is-visible" role="status" aria-live="polite">
          {toastMessage}
        </div>
      )}
    </>
  );
}
