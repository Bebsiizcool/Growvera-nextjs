import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Extract only the allowed fields to update
    const { status, fullName, phone, city, email, address, notes } = body;

    const updatedOrder = await prisma.order.update({
      where: { id },
      data: {
        ...(status && { status }),
        ...(fullName && { fullName }),
        ...(phone && { phone }),
        ...(city && { city }),
        ...(email && { email }),
        ...(address && { address }),
        ...(notes !== undefined && { notes })
      }
    });

    return NextResponse.json(updatedOrder);
  } catch (error) {
    console.error('Update order error:', error);
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
  }
}
