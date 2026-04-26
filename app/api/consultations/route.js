import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, concern } = body;

    if (!name || !email || !concern) {
      return NextResponse.json(
        { error: 'Name, email, and concern are required fields.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address.' },
        { status: 400 }
      );
    }

    const consultation = await prisma.consultation.create({
      data: {
        name,
        email,
        concern
      }
    });

    return NextResponse.json(consultation, { status: 201 });
  } catch (error) {
    console.error('Consultation error:', error);
    return NextResponse.json(
      { error: 'There was an error submitting your consultation. Please try again later.' },
      { status: 500 }
    );
  }
}
