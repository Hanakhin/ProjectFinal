"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { XCircle, ArrowLeft, AlertTriangle } from 'lucide-react';

const CancelPayment = () => {
    const [countdown, setCountdown] = useState(3);
    const router = useRouter();

    useEffect(() => {
        let timer: string | number | NodeJS.Timeout | undefined;
        if (countdown > 0) {
            timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        } else {
            router.push('/');
        }
        return () => clearTimeout(timer);
    }, [countdown, router]);

    return (
        <div className="min-h-screen bg-gradient-to-br custom-gradient flex items-center justify-center">
            <div className="max-w-md w-full">
                <div className="custom-bg backdrop-filter backdrop-blur-lg rounded-3xl p-8 shadow-2xl text-center">
                    <XCircle className="text-red-500 w-16 h-16 mx-auto mb-6" />
                    <h1 className="text-3xl font-bold text-white mb-4">Paiement annulé</h1>
                    <p className="text-gray-200 mb-6">Votre paiement a été annulé avec succès.</p>

                    <div className="bg-yellow-500 bg-opacity-20 p-4 rounded-lg mb-6 flex items-center">
                        <AlertTriangle className="text-yellow-500 w-6 h-6 mr-2" />
                        <span className="text-yellow-100">
                            Aucun montant n'a été débité de votre compte.
                        </span>
                    </div>

                    <p className="text-gray-300 mb-6">
                        Si vous avez rencontré des problèmes lors du paiement, n'hésitez pas à contacter notre service client pour obtenir de l'aide.
                    </p>

                    <p className="text-white mb-4">
                        Redirection vers la page d'accueil dans {countdown} secondes...
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mb-6">
                        <div
                            className="bg-red-600 h-2.5 rounded-full transition-all duration-1000 ease-linear"
                            style={{ width: `${((3 - countdown) / 3) * 100}%` }}
                        ></div>
                    </div>

                    <Link href="/homepage" className="inline-flex items-center text-[#ff7903] hover:underline">
                        <ArrowLeft className="mr-2" />
                        Retourner à la liste des jeux
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CancelPayment;
