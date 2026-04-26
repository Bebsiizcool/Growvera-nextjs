"use client";

import React, { useState } from "react";
import { useCart } from "./context/CartContext";

export default function CheckoutModal() {
  const { cart, isCheckoutOpen, setIsCheckoutOpen, subtotal, clearCart } = useCart();
  const [toastMessage, setToastMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const formatPrice = (price) => `Rs. ${price.toLocaleString("en-PK")}`;

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      showToast("Add a product before placing an order.");
      setIsCheckoutOpen(false);
      return;
    }

    const formData = new FormData(e.target);
    const orderData = {
      fullName: formData.get("fullName"),
      phone: formData.get("phone"),
      city: formData.get("city"),
      email: formData.get("checkoutEmail"),
      address: formData.get("address"),
      notes: formData.get("notes"),
      total: subtotal,
      cart: cart
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(orderData.email)) {
      showToast("Please enter a valid email address.");
      return;
    }

    const phoneRegex = /^((\+92)|(0092)|0)?3[0-9]{2}-?[0-9]{7}$/;
    if (!phoneRegex.test(orderData.phone)) {
      showToast("Please enter a valid Pakistan phone number (e.g. 03XX-XXXXXXX).");
      return;
    }

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) throw new Error('Failed to submit order');

      clearCart();
      e.target.reset();
      setIsCheckoutOpen(false);
      setIsSuccess(true);
    } catch (error) {
      showToast("There was an error placing your order. Please try again.");
    }
  };

  return (
    <>
      <div className={`overlay ${isCheckoutOpen ? "" : "hidden"}`} hidden={!isCheckoutOpen} onClick={() => setIsCheckoutOpen(false)}></div>
      <section className={`checkout-modal ${isCheckoutOpen ? "is-open" : ""}`} aria-hidden={!isCheckoutOpen}>
        <div className="checkout-card">
          <div className="drawer-header">
            <div>
              <span className="pill-label"><span className="pill-dot"></span>Secure order form</span>
              <h2>Checkout</h2>
            </div>
            <button className="close-btn" type="button" onClick={() => setIsCheckoutOpen(false)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </div>

          <form id="checkout-form" className="checkout-form" onSubmit={handleSubmit}>
            <div className="checkout-grid">
              <label>
                <span className="form-label">Full name</span>
                <input type="text" name="fullName" placeholder="Basil" required />
              </label>
              <label>
                <span className="form-label">Phone number</span>
                <input type="tel" name="phone" placeholder="03XX-XXXXXXX" required />
              </label>
              <label>
                <span className="form-label">City</span>
                <input type="text" name="city" placeholder="Karachi" required />
              </label>
              <label>
                <span className="form-label">Email</span>
                <input
                  type="email"
                  name="checkoutEmail"
                  placeholder="hello@growvera.com"
                  required
                />
              </label>
            </div>

            <label>
              <span className="form-label">Delivery address</span>
              <textarea
                name="address"
                rows="3"
                placeholder="House 14, Street 3, Clifton Block 5"
                required
              ></textarea>
            </label>

            <label>
              <span className="form-label">Order notes</span>
              <textarea
                name="notes"
                rows="2"
                placeholder="Gift pack this order, please."
              ></textarea>
            </label>

            <div className="checkout-summary" id="checkout-summary">
              {cart.length === 0 ? (
                "Your checkout summary will appear here once items are in the cart."
              ) : (
                <>
                  <p className="form-label">Order summary</p>
                  {cart.map((item) => (
                    <div key={item.id}>
                      {item.name} x {item.quantity} <strong>{formatPrice(item.price * item.quantity)}</strong>
                    </div>
                  ))}
                  <div className="summary-total">
                    <strong>Total: {formatPrice(subtotal)}</strong>
                  </div>
                  <p style={{marginTop: "8px", color: "var(--text-secondary)", fontSize: "0.85rem"}}>Payment method: Cash on delivery or manual bank transfer can be added later.</p>
                </>
              )}
            </div>

            <button className="btn btn--primary btn--full" type="submit">
              <span>Place Order</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </form>
        </div>
      </section>
      
      {toastMessage && (
        <div className="toast is-visible" role="status" aria-live="polite">
          {toastMessage}
        </div>
      )}

      {isSuccess && (
        <div className="overlay" style={{ zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: 'var(--glass-bg)', backdropFilter: 'var(--glass-blur)', border: '1px solid var(--glass-border)', padding: '40px', borderRadius: '24px', textAlign: 'center', maxWidth: '400px', width: '90%' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(74, 222, 128, 0.2)', color: '#4ade80', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
            </div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '16px', color: 'white' }}>Order Successful!</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: '1.6' }}>Thank you for your order. We have received your details and will process it shortly.</p>
            <button className="btn btn--primary" onClick={() => setIsSuccess(false)} style={{ width: '100%', justifyContent: 'center' }}>Continue Shopping</button>
          </div>
        </div>
      )}
    </>
  );
}
