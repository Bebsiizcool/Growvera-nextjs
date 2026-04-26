"use client";

import React, { useState } from 'react';
import ProductGrid from "../components/ProductGrid";

export default function Home() {
  const [isConsultSubmitted, setIsConsultSubmitted] = useState(false);
  const [consultError, setConsultError] = useState("");
  const [isSubmittingConsult, setIsSubmittingConsult] = useState(false);

  const handleConsultSubmit = async (e) => {
    e.preventDefault();
    setIsSubmittingConsult(true);
    setConsultError("");

    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      concern: formData.get("concern"),
    };

    try {
      const response = await fetch('/api/consultations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit consultation');
      }

      setIsConsultSubmitted(true);
      e.target.reset();
    } catch (error) {
      setConsultError(error.message);
    } finally {
      setIsSubmittingConsult(false);
    }
  };

  return (
    <>
      <section className="hero" id="home">
        <div className="container">
          <div className="hero-split-grid">

            {/* Left Product */}
            <div className="hero-image-side anim-reveal is-visible">
              <div className="hero-glow hero-glow--green"></div>
              <div className="hero-product-wrapper">
                <img src="/4444.png" alt="Growvera Hair Oil" className="hero-product-img" style={{ maxWidth: '500px', height: 'auto', width: '200%' }} />
              </div>
            </div>

            {/* Center Content */}
            <div className="hero-content anim-reveal is-visible" style={{ margin: "0 auto", padding: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
              <img src="/logo.png" alt="Growvera Hair Oil & Face Gel" style={{ width: "100%", maxWidth: "400px", marginBottom: "20px", filter: "drop-shadow(0 4px 20px rgba(212, 175, 55, 0.3))" }} />

              <h1 className="visually-hidden">Hair Oil & Face Gel</h1>

              <p className="hero-subtitle" style={{ marginTop: "10px" }}>
                A modern botanical ritual for stronger roots, calmer skin, and
                a first impression that feels premium before the cart even opens.
              </p>

              <div className="hero-cta-group" style={{ justifyContent: "center" }}>
                <a className="btn btn--primary" href="#shop">
                  <span>Shop The Ritual</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </a>
                <a className="btn btn--glass" href="#consult">Get A Skin & Hair Plan</a>
              </div>

              <div className="hero-tags" style={{ justifyContent: "center" }}>
                <span className="hero-tag">🌿 Rosemary + amla</span>
                <span className="hero-tag">💧 Aloe + niacinamide</span>
                <span className="hero-tag">✨ Green + gold finish</span>
              </div>
            </div>

            {/* Right Product */}
            <div className="hero-image-side anim-reveal is-visible">
              <div className="hero-glow hero-glow--gold" style={{ top: "40%" }}></div>
              <div className="hero-product-wrapper">
                <img src="/333.png" alt="Growvera Face Gel" className="hero-product-img" style={{ maxWidth: '500px', height: 'auto', width: '200%' }} />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════ TRUST STRIP ═══════════════════════ */}
      <section className="trust-strip anim-reveal is-visible" aria-label="Brand promises">
        <div className="trust-item">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
          <span>Cold-pressed oils</span>
        </div>
        <div className="trust-item">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
          <span>Paraben-free formula</span>
        </div>
        <div className="trust-item">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" /></svg>
          <span>Glow-safe hydration</span>
        </div>
        <div className="trust-item">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>
          <span>Free delivery over Rs. 6,500</span>
        </div>
      </section>

      {/* ═══════════════════════ SHOP ═══════════════════════ */}
      <section className="section" id="shop">
        <div className="container">
          <div className="section-header anim-reveal is-visible">
            <span className="pill-label"><span className="pill-dot"></span>Signature collection</span>
            <h2>Shop the Growvera essentials</h2>
            <p>
              Built for daily rituals, visible softness, and a premium gifting
              experience.
            </p>
          </div>

          <ProductGrid />
        </div>
      </section>

      {/* ═══════════════════════ INGREDIENTS ═══════════════════════ */}
      <section className="section section--alt" id="ingredients">
        <div className="container">
          <div className="section-header anim-reveal is-visible">
            <span className="pill-label"><span className="pill-dot"></span>Inside the formula</span>
            <h2>High-performing naturals with a luxe finish</h2>
            <p>
              Every formula is built to feel rich, look refined, and support
              long-term results without heaviness.
            </p>
          </div>

          <div className="ingredient-grid">
            <article className="ingredient-card anim-reveal is-visible">
              <div className="ingredient-icon">🌱</div>
              <span className="ingredient-type">Hair Strength</span>
              <h3>Rosemary & Amla</h3>
              <p>
                A strengthening duo that supports scalp comfort, healthier roots,
                and fuller-looking lengths over time.
              </p>
            </article>
            <article className="ingredient-card anim-reveal is-visible">
              <div className="ingredient-icon">🥥</div>
              <span className="ingredient-type">Deep Repair</span>
              <h3>Argan & Coconut</h3>
              <p>
                Seals in softness and shine while helping brittle hair feel
                smooth and manageable.
              </p>
            </article>
            <article className="ingredient-card anim-reveal is-visible">
              <div className="ingredient-icon">🧊</div>
              <span className="ingredient-type">Calm Hydration</span>
              <h3>Aloe Vera & Cucumber</h3>
              <p>
                Cools and replenishes the skin barrier with a fresh gel texture
                that wears beautifully under makeup.
              </p>
            </article>
            <article className="ingredient-card anim-reveal is-visible">
              <div className="ingredient-icon">✨</div>
              <span className="ingredient-type">Radiance Boost</span>
              <h3>Niacinamide & Saffron</h3>
              <p>
                Helps visibly brighten dullness and supports a smoother,
                balanced-looking complexion.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ RITUAL / ROUTINE ═══════════════════════ */}
      <section className="section" id="ritual">
        <div className="container">
          <div className="section-header anim-reveal is-visible">
            <span className="pill-label"><span className="pill-dot"></span>Daily routine</span>
            <h2>A simple ritual with a rich payoff</h2>
            <p>
              Two hero products, one polished routine, and a brand story that
              feels premium from shelf to skin.
            </p>
          </div>

          <div className="routine-grid">
            <article className="routine-card anim-reveal is-visible">
              <div className="routine-icon">🌙</div>
              <span className="routine-time-label">Night reset</span>
              <h3>Hair oil therapy</h3>
              <ol className="routine-steps">
                <li>Massage 4-6 drops into the scalp and lengths.</li>
                <li>Leave overnight or for at least 2 hours.</li>
                <li>Rinse for softer, healthier-looking hair.</li>
              </ol>
            </article>
            <article className="routine-card anim-reveal is-visible">
              <div className="routine-icon">☀️</div>
              <span className="routine-time-label">Morning glow</span>
              <h3>Face gel hydration</h3>
              <ol className="routine-steps">
                <li>Apply a thin layer to freshly cleansed skin.</li>
                <li>Let the cooling gel absorb for a dewy finish.</li>
                <li>Layer sunscreen or makeup on top with ease.</li>
              </ol>
            </article>
            <article className="routine-highlight anim-reveal is-visible">
              <span className="pill-label"><span className="pill-dot"></span>Why customers stay</span>
              <h3>Luxury packaging, rooted formulas, daily results.</h3>
              <p>
                Growvera balances natural care with a polished presentation, so
                the experience feels gift-worthy every single time.
              </p>
              <a className="btn btn--primary" href="#consult">
                <span>Build My Routine</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </a>
            </article>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ STORY ═══════════════════════ */}
      <section className="section section--alt" id="story">
        <div className="container">
          <div className="story-panel anim-reveal is-visible">
            <div className="story-text">
              <span className="pill-label"><span className="pill-dot"></span>The Growvera promise</span>
              <h2>Premium care inspired by botanical healing.</h2>
            </div>
            <div className="story-body">
              <p>
                Designed as a modern beauty label, Growvera pairs luminous gold
                branding with formulas that feel comforting, clean, and effective.
                The result is an ecommerce experience that looks elevated and
                keeps the focus on your two signature heroes: Hair Oil and Face
                Gel.
              </p>
              <div className="story-stats">
                <article className="story-stat">
                  <strong>2</strong>
                  <span>signature hero products</span>
                </article>
                <article className="story-stat">
                  <strong>5 stars</strong>
                  <span>designed review moment</span>
                </article>
                <article className="story-stat">
                  <strong>1 brand</strong>
                  <span>one complete ritual</span>
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ CONSULT ═══════════════════════ */}
      <section className="section" id="consult">
        <div className="container">
          <div className="consult-panel anim-reveal is-visible">
            <div className="consult-text">
              <span className="pill-label"><span className="pill-dot"></span>Personalized shopping</span>
              <h2>Tell us your main concern and get a tailored Growvera pick.</h2>
              <p>
                This gives the brand a conversion-friendly consultation block
                and makes the storefront feel like a complete beauty
                application, not just a brochure.
              </p>
            </div>

            {isConsultSubmitted ? (
              <div style={{ background: 'var(--glass-bg)', padding: '40px', borderRadius: '16px', textAlign: 'center', border: '1px solid var(--glass-border)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(74, 222, 128, 0.2)', color: '#4ade80', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', color: 'white' }}>Consultation Received!</h3>
                <p style={{ color: 'var(--text-secondary)' }}>Thank you! Our experts will review your concern and email you a personalized routine shortly.</p>
                <button className="btn btn--glass" onClick={() => setIsConsultSubmitted(false)} style={{ marginTop: '24px' }}>Send Another</button>
              </div>
            ) : (
              <form className="consult-form" onSubmit={handleConsultSubmit}>
                <label>
                  <span className="form-label">Your name</span>
                  <input type="text" name="name" placeholder="Ayesha" required disabled={isSubmittingConsult} />
                </label>
                <label>
                  <span className="form-label">Email</span>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    required
                    disabled={isSubmittingConsult}
                  />
                </label>
                <label>
                  <span className="form-label">Main concern</span>
                  <select name="concern" required disabled={isSubmittingConsult}>
                    <option value="">Choose one</option>
                    <option value="hair">Hair fall & dryness</option>
                    <option value="skin">Dullness & dehydration</option>
                    <option value="combo">Both hair and skin</option>
                  </select>
                </label>
                
                {consultError && <p style={{ color: '#f87171', fontSize: '0.85rem', margin: '0' }}>{consultError}</p>}
                
                <button className="btn btn--primary btn--full" type="submit" disabled={isSubmittingConsult}>
                  <span>{isSubmittingConsult ? 'Sending...' : 'Send My Consultation'}</span>
                  {!isSubmittingConsult && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
