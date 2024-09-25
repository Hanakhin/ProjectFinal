import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { clearCart, getCart, removeFromCart } from '@/actions/cart';


export const useCartActions = (initialCart) => {
    const [cart, setCart] = useState(initialCart);
    const { data: session } = useSession();

    const handleRemoveGame = async (gameId) => {
        if (session?.user?.id) {
            setCart(prevCart => ({
                ...prevCart,
                games: prevCart.games.filter(game => game._id !== gameId)
            }));

            const result = await removeFromCart(session.user.id, gameId);
            if (!result.success) {
                console.error("Erreur lors de la suppression du jeu:", result.error);
                const cartData = await getCart(session.user.id);
                setCart(cartData);
            }
        }
    };

        const handleClearCart = async () => {
            if (session?.user?.id) {
                // Mise à jour optimiste
                setCart({ games: [], totalPrice: 0 });

                const result = await clearCart(session.user.id);
                console.log("Résultat du vidage du panier:", result);
                location.reload()
                if (!result.success) {
                    console.error("Erreur lors du vidage du panier:", result.error);
                    const cartData = await getCart(session.user.id);
                    setCart(cartData);
                }
            }
        };


    return {
        cart,
        setCart,
        handleRemoveGame,
        handleClearCart
    };
};
