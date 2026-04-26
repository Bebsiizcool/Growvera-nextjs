"use client";

import React, { useState } from 'react';

export default function OrderCard({ initialOrder }) {
  const [order, setOrder] = useState(initialOrder);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: order.fullName,
    email: order.email,
    phone: order.phone,
    city: order.city,
    address: order.address,
    notes: order.notes || ''
  });

  const formatPrice = (price) => `Rs. ${price.toLocaleString("en-PK")}`;

  const handleStatusChange = async (newStatus) => {
    try {
      const res = await fetch(`/api/orders/${order.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (!res.ok) throw new Error('Failed to update status');
      const updated = await res.json();
      setOrder(updated);
    } catch (err) {
      alert("Failed to update status");
    }
  };

  const handleSaveDetails = async () => {
    try {
      const res = await fetch(`/api/orders/${order.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (!res.ok) throw new Error('Failed to update details');
      const updated = await res.json();
      setOrder(updated);
      setIsEditing(false);
    } catch (err) {
      alert("Failed to save details");
    }
  };

  const statusColors = {
    PENDING: { bg: 'rgba(234, 179, 8, 0.2)', text: '#eab308' },
    COMPLETED: { bg: 'rgba(74, 222, 128, 0.2)', text: '#4ade80' },
    CANCELLED: { bg: 'rgba(248, 113, 113, 0.2)', text: '#f87171' }
  };

  const currentStatus = statusColors[order.status] || statusColors.PENDING;

  return (
    <div style={{ 
      background: 'var(--glass-bg)', 
      backdropFilter: 'var(--glass-blur)',
      border: '1px solid var(--glass-border)',
      borderRadius: '24px',
      padding: '32px',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px'
    }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '24px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--accent-gold)', margin: 0 }}>Order #{order.id.slice(-6).toUpperCase()}</h3>
            <span style={{ 
              background: currentStatus.bg, 
              color: currentStatus.text, 
              padding: '4px 12px', 
              borderRadius: '20px', 
              fontSize: '0.8rem', 
              fontWeight: 'bold',
              letterSpacing: '0.5px'
            }}>
              {order.status}
            </span>
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Placed on {new Date(order.createdAt).toLocaleString()}</p>
          
          <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
            {order.status !== 'COMPLETED' && (
              <button onClick={() => handleStatusChange('COMPLETED')} style={{ background: 'rgba(74, 222, 128, 0.1)', border: '1px solid rgba(74, 222, 128, 0.3)', color: '#4ade80', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem' }}>Mark Completed</button>
            )}
            {order.status !== 'CANCELLED' && (
              <button onClick={() => handleStatusChange('CANCELLED')} style={{ background: 'rgba(248, 113, 113, 0.1)', border: '1px solid rgba(248, 113, 113, 0.3)', color: '#f87171', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem' }}>Cancel Order</button>
            )}
            {order.status !== 'PENDING' && (
              <button onClick={() => handleStatusChange('PENDING')} style={{ background: 'rgba(234, 179, 8, 0.1)', border: '1px solid rgba(234, 179, 8, 0.3)', color: '#eab308', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem' }}>Set Pending</button>
            )}
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Total Amount</p>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>{formatPrice(order.total)}</p>
          <button 
            onClick={() => setIsEditing(!isEditing)} 
            style={{ marginTop: '16px', background: 'transparent', border: '1px solid var(--glass-border)', color: 'white', padding: '6px 16px', borderRadius: '8px', cursor: 'pointer' }}
          >
            {isEditing ? 'Cancel Edit' : 'Edit Details'}
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
        <div>
          <h4 style={{ marginBottom: '12px', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-secondary)' }}>Customer Details</h4>
          {isEditing ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <input type="text" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)', color: 'white', padding: '8px', borderRadius: '6px' }} placeholder="Full Name" />
              <input type="text" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)', color: 'white', padding: '8px', borderRadius: '6px' }} placeholder="Email" />
              <input type="text" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)', color: 'white', padding: '8px', borderRadius: '6px' }} placeholder="Phone" />
            </div>
          ) : (
            <>
              <p style={{ margin: '4px 0' }}><strong>Name:</strong> {order.fullName}</p>
              <p style={{ margin: '4px 0' }}><strong>Email:</strong> {order.email}</p>
              <p style={{ margin: '4px 0' }}><strong>Phone:</strong> {order.phone}</p>
            </>
          )}
        </div>
        <div>
          <h4 style={{ marginBottom: '12px', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-secondary)' }}>Delivery Info</h4>
          {isEditing ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <input type="text" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)', color: 'white', padding: '8px', borderRadius: '6px' }} placeholder="City" />
              <textarea value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)', color: 'white', padding: '8px', borderRadius: '6px', minHeight: '60px' }} placeholder="Address" />
              <textarea value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)', color: 'white', padding: '8px', borderRadius: '6px', minHeight: '40px' }} placeholder="Notes" />
            </div>
          ) : (
            <>
              <p style={{ margin: '4px 0' }}><strong>City:</strong> {order.city}</p>
              <p style={{ margin: '4px 0' }}><strong>Address:</strong> {order.address}</p>
              {order.notes && <p style={{ margin: '4px 0' }}><strong>Notes:</strong> {order.notes}</p>}
            </>
          )}
        </div>
        <div>
          <h4 style={{ marginBottom: '12px', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-secondary)' }}>Order Items</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {initialOrder.items?.map(item => (
              <li key={item.id} style={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <span>{item.quantity}x {item.name}</span>
                <span>{formatPrice(item.price * item.quantity)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {isEditing && (
        <div style={{ marginTop: '8px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={handleSaveDetails} className="btn btn--primary" style={{ padding: '8px 24px' }}>Save Changes</button>
        </div>
      )}

    </div>
  );
}
