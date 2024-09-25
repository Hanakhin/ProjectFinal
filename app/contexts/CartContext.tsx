// app/contexts/CartContext.js
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { getCart, addToCart, removeFromCart, clearCart } from '@/actions/cart';

const CartContext = createContext(null);

export function CartProvider({ children }) {
    const [cart, setCart] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { data: session } = useSession();

    const fetchCart = async () => {
        if (session?.user?.id) {
            setIsLoading(true);
            setError(null);
            try {
                const cartData = await getCart(session.user.id);
                setCart(cartData);
            } catch (err) {
                console.error("Error fetching cart:", err);
                setError("Failed to fetch cart");
                setCart(null);
            } finally {
                setIsLoading(false);
            }
        }
    };

    useEffect(() => {
        if (session?.user?.id) {
            fetchCart();
        } else {
            setCart(null);
        }
    }, [session?.user?.id]);

    const addItem = async (gameId) => {
        if (session?.user?.id) {
            setIsLoading(true);
            try {
                const result = await addToCart({ games: [gameId], user: session.user.id });
                if (result.success) {
                    setCart(result.cart);
                }
                return result;
            } catch (err) {
                console.error("Error adding item to cart:", err);
                setError("Failed to add item to cart");
                return { success: false, error: "Failed to add item to cart" };
            } finally {
                setIsLoading(false);
            }
        }
    };

    const removeItem = async (gameId) => {
        if (session?.user?.id) {
            setIsLoading(true);
            try {
                const result = await removeFromCart(session.user.id, gameId);
                if (result.success) {
                    await fetchCart();
                }
                return result;
            } catch (err) {
                console.error("Error removing item from cart:", err);
                setError("Failed to remove item from cart");
                return { success: false, error: "Failed to remove item from cart" };
            } finally {
                setIsLoading(false);
            }
        }
    };

    const clearUserCart = async () => {
        if (session?.user?.id) {
            setIsLoading(true);
            try {
                const result = await clearCart(session.user.id);
                if (result.success) {
                    setCart(null);
                }
                return result;
            } catch (err) {
                console.error("Error clearing cart:", err);
                setError("Failed to clear cart");
                return { success: false, error: "Failed to clear cart" };
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <CartContext.Provider value={{
            cart,
            isLoading,
            error,
            addItem,
            removeItem,
            clearCart: clearUserCart,
            refetchCart: fetchCart
        }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);