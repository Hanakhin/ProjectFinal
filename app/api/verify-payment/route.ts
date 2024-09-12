import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2024-06-20', // Utilisez la version la plus récente
});

export async function POST(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const session_id = searchParams.get('session_id');

    if (!session_id) {
        return NextResponse.json({ error: 'Invalid session_id' }, { status: 400 });
    }

    try {
        const session = await stripe.checkout.sessions.retrieve(session_id);
        return NextResponse.json({ status: session.status });
    } catch (error) {
        return NextResponse.json({ error: 'Error verifying payment status' }, { status: 500 });
    }
}