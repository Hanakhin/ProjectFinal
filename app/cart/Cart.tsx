'use client';

import React, { useEffect, useState } from 'react';
import { getCart, removeFromCart } from '@/actions/cart';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, ShoppingBag, Trash, AlertTriangle } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import LoadingSpinner from "@/app/_Components/LoadingSpinner";
import Error from "@/app/_Components/Error";
import { Section } from "@/app/_Components/Section";
import Nav from "@/app/_Components/Nav/Nav";
import { loadStripe } from "@stripe/stripe-js";
import Modal from '@/app/_Components/modal/CartConfirmationModal';
import {useCartActions} from "@/app/hooks/useCartAction";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface GameType {
    _id: string;
    title: string;
    price: number;
    imagePath: string;
}

interface CartType {
    _id: string;
    games: GameType[];
    user: string;
    totalPrice: number;
    createdAt: string;
    updatedAt: string;
}

export default function CartPage({ userId }: { userId: string }) {
    const [cart, setCart] = useState<CartType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [modalAction, setModalAction] = useState<'remove' | 'clear'>('remove');
    const [selectedGame, setSelectedGame] = useState<GameType | null>(null);

    const {handleRemoveGame, handleClearCart } = useCartActions(cart);

    useEffect(() => {
        fetchCart();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    const fetchCart = async () => {
        try {
            setLoading(true);
            setError(null);
            const cartData = await getCart(userId);
            setCart(cartData);
        } catch (err) {
            setError("Erreur lors du chargement du panier");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveItem = async () => {
        if (!selectedGame) return;
        try {
            setLoading(true);
            const result = await removeFromCart(userId, selectedGame._id);
            if (result.success) {
                await fetchCart();
            } else {
                setError(result.error || "Erreur lors de la suppression de l'article");
            }
        } catch (err) {
            setError("Erreur lors de la suppression de l'article");
            console.error(err);
        } finally {
            setLoading(false);
            setShowModal(false);
        }
    };

    const handleCheckout = async () => {
        if (!cart || cart.totalPrice <= 0) return;

        try {
            const stripe = await stripePromise;
            if (!stripe) return error;

            const response = await fetch('/api/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: Math.floor(cart.totalPrice * 100),
                }),
            });

            if (!response.ok) {
                return error;
            }

            const session = await response.json();

            const result = await stripe.redirectToCheckout({
                sessionId: session.id,
            });

            if (result.error) {
                console.error("Redirect error:", result.error.message);
            }
        } catch (error) {
            console.error('Error in checkout process:', error);
        }
    };

    if (loading) return <LoadingSpinner />;
    if (error) return <Error message={error} />;

    if (!cart || cart.games.length === 0) {
        return (
            <Section>
                <Nav />
                <div className="flex flex-col items-center justify-center h-[50vh] space-y-4">
                    <ShoppingCart size={64} className="text-gray-400" />
                    <h2 className="text-2xl font-semibold text-gray-700">Votre panier est vide</h2>
                    <p className="text-gray-500">Ajoutez des jeux à votre panier pour commencer vos achats.</p>
                    <Link href="/" className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-orange hover:text-primary transition-colors">
                        <ShoppingBag className="inline-block mr-2" size={20} />
                        Aller à la boutique
                    </Link>
                </div>
            </Section>
        );
    }

    return (
        <Section>
            <Nav />
            <Table className={'mt-4'}>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[300px]">Jeu</TableHead>
                        <TableHead>Prix</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {cart.games.map((game) => (
                        <TableRow key={game._id}>
                            <TableCell className="font-medium">
                                <div className="flex items-center">
                                    <Image src={game.imagePath} alt={game.title} width={50} height={50} className="mr-4" />
                                    {game.title}
                                </div>
                            </TableCell>
                            <TableCell>{game.price.toFixed(2)} €</TableCell>
                            <TableCell className="text-right">
                                <button
                                    onClick={() => {
                                        setSelectedGame(game);
                                        setModalAction('remove');
                                        setShowModal(true);
                                    }}
                                    className="px-3 py-1 bg-primary text-primary-foreground rounded hover:bg-red-600 transition-colors"
                                    disabled={loading}
                                >
                                    <Trash className={'w-4 h-auto'} />
                                </button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={2}>Total</TableCell>
                        <TableCell className="text-right font-bold">{cart.totalPrice.toFixed(2)} €</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
            <div className="mt-4 flex w-full justify-between">
                <Link href={'/'} className={'hover:underline hover:text-orange'}>Retour</Link>
                <div className={' flex gap-4'}>
                    <button
                        onClick={() => {
                            setModalAction('clear');
                            setShowModal(true);
                        }}
                        className="bg-primary text-primary-foreground px-4 py-2 mt-2 rounded hover:bg-red-600 transition-colors"
                        disabled={loading}
                    >
                        Vider le panier
                    </button>
                    <button
                        onClick={handleCheckout}
                        className="bg-primary text-primary-foreground px-4 py-2 mt-2 rounded hover:bg-orange transition-colors"
                        disabled={loading}
                    >
                        Payer {cart.totalPrice.toFixed(2)}€
                    </button>
                </div>
            </div>

            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={modalAction === 'remove' ? handleRemoveItem : handleClearCart}
                title={modalAction === 'remove' ? "Supprimer l'article" : "Vider le panier"}
            >
                <div className="text-center">
                    <AlertTriangle className="mx-auto mb-4 text-red-600 w-14 h-14" />
                    <p className="text-primary ">
                        {modalAction === 'remove'
                            ? `Êtes-vous sûr de vouloir supprimer "${selectedGame?.title}" de votre panier ?`
                            : "Êtes-vous sûr de vouloir vider votre panier ?"}
                    </p>
                </div>
            </Modal>
        </Section>
    );
}
