    import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2024-06-20', // Utilisez la version de l'API Stripe appropriée
});

export async function POST(request: Request) {
    try {
        const { amount } = await request.json(); // Recevez le montant depuis la requête

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'eur',
                        product_data: {
                            name: 'Jeux du panier', // Nom de produit générique
                        },
                        unit_amount: amount,
                    },
                    quantity: 1, // Quantité de produits
                },
            ],
            mode: 'payment',
            success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/payment/cancel?session_id={CHECKOUT_SESSION_ID}`,
        });

        return NextResponse.json({ id: session.id });
    } catch (error) {
        console.error('Erreur lors de la création de la session de paiement:', error);
        return NextResponse.json({ error: 'Erreur lors de la création de la session de paiement' }, { status: 500 });
    }
}