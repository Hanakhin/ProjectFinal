"use client"

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import { useCartActions } from '@/app/hooks/useCart';
import { useSession } from "next-auth/react";
import LoadingSpinner from "@/app/_Components/LoadingSpinner";
import {useCart} from "@/app/contexts/CartContext";

const SuccessPage = () => {
    const [paymentVerified, setPaymentVerified] = useState(false);
    const [countdown, setCountdown] = useState(3);
    const searchParams = useSearchParams();
    const { clearCart } = useCart();
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        const session_id = searchParams.get('session_id');
        if (session_id) {
            verifyPaymentAndClearCart(session_id);
        }
    }, [searchParams]);

    useEffect(() => {
        let timer;
        if (paymentVerified && countdown > 0) {
            timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        } else if (paymentVerified && countdown === 0) {
            clearCart()
            router.push('/homepage');
        }
        return () => clearTimeout(timer);
    }, [paymentVerified, countdown, router]);

    const verifyPaymentAndClearCart = async (session_id) => {
        try {
            console.log("Vérification du paiement pour la session:", session_id);
            const response = await fetch(`/api/verify-payment?session_id=${session_id}`, { method: 'POST' });
            const data = await response.json();
            console.log("Réponse de l'API:", data);

            if (data.status === 'complete') {
                console.log("Paiement complet, nettoyage du panier...");
                const clearResult = await clearCart(); // Attendez la promesse ici
                console.log('Résultat du vidage du panier:', clearResult); // Log pour déboguer
                setPaymentVerified(true);
            } else {
                console.log("Le statut du paiement n'est pas 'complete':", data.status);
            }
        } catch (error) {
            console.error('Erreur lors de la vérification du paiement:', error);
        }
    };
    return (
        <div className="min-h-screen bg-gradient-to-br custom-gradient flex items-center justify-center">
            <div className="max-w-md w-full">
                <div className="custom-bg backdrop-filter backdrop-blur-lg rounded-3xl p-8 shadow-2xl text-center">
                    <CheckCircle className="text-green-500 w-16 h-16 mx-auto mb-6" />
                    <h1 className="text-3xl font-bold text-white mb-4">Paiement réussi</h1>
                    <p className="text-gray-200 mb-6">Votre paiement a été traité avec succès. Merci pour votre achat !</p>

                    {paymentVerified ? (
                        <>
                            <p className="text-green-400 mb-6">
                                Votre panier a été vidé et votre commande est confirmée.
                            </p>
                            <p className="text-white mb-4">
                                Redirection vers la page d'accueil dans {countdown} secondes...
                            </p>
                            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mb-6">
                                <div
                                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-1000 ease-linear"
                                    style={{ width: `${((3 - countdown) / 3) * 100}%` }}
                                ></div>
                            </div>
                        </>
                    ) : (
                        <div>
                            <LoadingSpinner/>
                            <p className="text-gray-300 mb-6">
                                Vérification du paiement en cours...
                            </p>
                        </div>
                    )}

                    <p className="text-gray-300 mb-6">
                        Vous recevrez bientôt un e-mail de confirmation avec les détails de votre commande.
                    </p>

                    <Link href="/homepage" className="inline-flex items-center text-[#ff7903] hover:underline">
                        <ArrowLeft className="mr-2" />
                        Retourner à la page d'accueil
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SuccessPage;
