import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function POST(request) {
  try {
    const data = await request.json();
    
    // Create the order with nested items
    const order = await prisma.order.create({
      data: {
        fullName: data.fullName,
        phone: data.phone,
        city: data.city,
        email: data.email,
        address: data.address,
        notes: data.notes || '',
        total: data.total,
        items: {
          create: data.cart.map((item) => ({
            productId: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity
          }))
        }
      }
    });

    return NextResponse.json({ success: true, orderId: order.id });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json({ success: false, error: 'Failed to process order' }, { status: 500 });
  }
}
