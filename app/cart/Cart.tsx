'use client';

import { useEffect, useState } from 'react';
import { getCart, removeFromCart, clearCart } from '@/actions/cart';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, ShoppingBag } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

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

    useEffect(() => {
        fetchCart();
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

    const handleRemoveItem = async (gameId: string) => {
        try {
            setLoading(true);
            const result = await removeFromCart(userId, gameId);
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
        }
    };

    const handleClearCart = async () => {
        try {
            setLoading(true);
            const result = await clearCart(userId);
            if (result.success) {
                await fetchCart();
            } else {
                setError(result.error || "Erreur lors du vidage du panier");
            }
        } catch (err) {
            setError("Erreur lors du vidage du panier");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Chargement...</div>;
    if (error) return <div>Erreur : {error}</div>;
    if (!cart) return <div>Panier non trouvé</div>;

    if (cart.games.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-[50vh] space-y-4">
                <ShoppingCart size={64} className="text-gray-400" />
                <h2 className="text-2xl font-semibold text-gray-700">Votre panier est vide</h2>
                <p className="text-gray-500">Ajoutez des jeux à votre panier pour commencer vos achats.</p>
                <Link href="/shop" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                    <ShoppingBag className="inline-block mr-2" size={20} />
                    Aller à la boutique
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Votre Panier</h1>
            <Table>
                <TableCaption>Votre panier actuel.</TableCaption>
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
                                    onClick={() => handleRemoveItem(game._id)}
                                    className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                                    disabled={loading}
                                >
                                    Supprimer
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
            <div className="mt-4 text-right">
                <button
                    onClick={handleClearCart}
                    className="bg-red-500 text-white px-4 py-2 mt-2 rounded hover:bg-red-600 transition-colors"
                    disabled={loading}
                >
                    Vider le panier
                </button>
            </div>
        </div>
    );
}