'use client';

import { useCart } from '@/app/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { showToast } from "@/utils/toastUtils";

const AddToCartButton = ({ gameId, gameTitle }) => {
    const { addItem,refetchCart } = useCart();

    const handleAddToCart = async () => {
        const result = await addItem(gameId);
        if (result.success) {
            showToast(`${gameTitle} ajouté au panier`, "success");
            refetchCart()
        } else {
            showToast(`${gameTitle} est deja dans votre panier`, "error");
        }
    };

    return (
        <Button onClick={handleAddToCart}>Ajouter au panier</Button>
    );
};

export default AddToCartButton;