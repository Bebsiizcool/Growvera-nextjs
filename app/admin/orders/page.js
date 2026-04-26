import React from 'react';
import { prisma } from '../../../lib/prisma';
import OrderCard from './OrderCard';

export const dynamic = 'force-dynamic';

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    include: { items: true }
  });

  const formatPrice = (price) => `Rs. ${price.toLocaleString("en-PK")}`;

  return (
    <div style={{ padding: '60px 24px', maxWidth: '1200px', margin: '0 auto', minHeight: '100vh', color: 'white' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', fontFamily: 'var(--font-playfair)' }}>Order Management</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '40px' }}>View all recent orders from your Growvera storefront.</p>

      {orders.length === 0 ? (
        <div style={{ background: 'var(--glass-bg)', padding: '40px', borderRadius: '16px', textAlign: 'center', border: '1px solid var(--glass-border)' }}>
          <p>No orders have been placed yet.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {orders.map((order) => (
            <OrderCard key={order.id} initialOrder={order} />
          ))}
        </div>
      )}
    </div>
  );
}
