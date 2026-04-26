import React from 'react';
import { prisma } from '../../../lib/prisma';

export const dynamic = 'force-dynamic';

export default async function AdminConsultationsPage() {
  const consultations = await prisma.consultation.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div style={{ padding: '60px 24px', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', fontFamily: 'var(--font-playfair)' }}>Consultation Requests</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '40px' }}>View all personalized routine requests from your customers.</p>

      {consultations.length === 0 ? (
        <div style={{ background: 'var(--glass-bg)', padding: '40px', borderRadius: '16px', textAlign: 'center', border: '1px solid var(--glass-border)' }}>
          <p>No consultation requests have been submitted yet.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {consultations.map((consult) => (
            <div key={consult.id} style={{ 
              background: 'var(--glass-bg)', 
              backdropFilter: 'var(--glass-blur)',
              border: '1px solid var(--glass-border)',
              borderRadius: '20px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', color: 'var(--accent-gold)', margin: '0 0 4px 0' }}>{consult.name}</h3>
                  <a href={`mailto:${consult.email}`} style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>{consult.email}</a>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
                    {new Date(consult.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
              
              <div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Main Concern</p>
                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '12px 16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  {consult.concern === 'hair' && '💇‍♀️ Hair fall & dryness'}
                  {consult.concern === 'skin' && '✨ Dullness & dehydration'}
                  {consult.concern === 'combo' && '🌿 Both hair and skin'}
                  {![ 'hair', 'skin', 'combo' ].includes(consult.concern) && consult.concern}
                </div>
              </div>
              
              <div style={{ marginTop: '8px' }}>
                <a href={`mailto:${consult.email}?subject=Your Growvera Routine&body=Hi ${consult.name},%0D%0A%0D%0AThank you for reaching out to Growvera regarding your ${consult.concern} concern.%0D%0A%0D%0AHere is your personalized routine:`} className="btn btn--glass" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
                  Reply via Email
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
