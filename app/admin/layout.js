import React from 'react';
import Link from 'next/link';

export default function AdminLayout({ children }) {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-dark)', color: 'white' }}>
      <header style={{ 
        background: 'rgba(0,0,0,0.5)', 
        backdropFilter: 'blur(10px)', 
        borderBottom: '1px solid var(--glass-border)', 
        padding: '16px 24px',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <Link href="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent-gold)', textDecoration: 'none', fontFamily: 'var(--font-playfair)' }}>
              Growvera Admin
            </Link>
            <nav style={{ display: 'flex', gap: '16px' }}>
              <Link href="/admin/orders" style={{ color: 'white', textDecoration: 'none', fontSize: '0.95rem' }}>Orders</Link>
              <Link href="/admin/consultations" style={{ color: 'white', textDecoration: 'none', fontSize: '0.95rem' }}>Consultations</Link>
            </nav>
          </div>
          <a href="/" className="btn btn--glass" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>View Store</a>
        </div>
      </header>
      <main>
        {children}
      </main>
    </div>
  );
}
