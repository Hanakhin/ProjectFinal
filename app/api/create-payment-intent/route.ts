import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2024-06-20', // Utilisez la version la plus récente
});

export async function POST(req: Request) {
    try {
        const { amount } = await req.json();

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'eur',
        });

        return NextResponse.json({ client_secret: paymentIntent.client_secret });
    } catch (error) {
        return NextResponse.json({ error: 'Error creating payment intent' }, { status: 500 });
    }
}