import React from "react";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <div style={{color: 'var(--accent-gold)', fontSize: '1.5rem', fontWeight: 'bold', fontFamily: 'var(--font-playfair)', marginBottom: '16px'}}>Growvera</div>
          <p>Hair Oil & Face Gel with a premium botanical identity.</p>
        </div>
        <div className="footer-links">
          <a href="#shop">Shop</a>
          <a href="#ingredients">Ingredients</a>
          <a href="#reviews">Reviews</a>
          <a href="#consult">Consult</a>
        </div>
        <div className="footer-copy">
          <p>&copy; 2026 Growvera. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
