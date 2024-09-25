// hooks/useCart.js
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { clearCart, getCart, removeFromCart, addToCart } from '@/actions/cart';

export const useCart = () => {
    const [cart, setCart] = useState(null);
    const { data: session } = useSession();

    const fetchCart = async () => {
        if (session?.user?.id) {
            try {
                const cartData = await getCart(session.user.id);
                setCart(cartData);
            } catch (error) {
                console.error("Erreur lors du chargement du panier:", error);
                setCart(null); // Définissez le panier à null en cas d'erreur
            }
        }
    };

    useEffect(() => {
        fetchCart();
    }, [session]);

    const handleAddToCart = async (gameId) => {
        if (session?.user?.id) {
            const result = await addToCart({ games: [gameId], user: session.user.id });
            if (result.success) {
                setCart(result.cart);
            }
            return result;
        }
    };

    const handleRemoveGame = async (gameId) => {
        if (session?.user?.id) {
            setCart(prevCart => ({
                ...prevCart,
                games: prevCart.games.filter(game => game._id !== gameId)
            }));

            const result = await removeFromCart(session.user.id, gameId);
            if (!result.success) {
                console.error("Erreur lors de la suppression du jeu:", result.error);
                await fetchCart();
            }
        }
    };

    const handleClearCart = async () => {
        if (session?.user?.id) {
            setCart({ games: [], totalPrice: 0 });

            const result = await clearCart(session.user.id);
            if (!result.success) {
                console.error("Erreur lors du vidage du panier:", result.error);
                await fetchCart();
            } else {
                // Évitez d'utiliser location.reload() si possible
                await fetchCart();
            }
        }
    };

    return {
        cart,
        addToCart: handleAddToCart,
        removeFromCart: handleRemoveGame,
        clearCart: handleClearCart,
        refetchCart: fetchCart
    };
};