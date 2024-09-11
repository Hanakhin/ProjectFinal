import { addToCart } from "@/actions/cart";
import {showToast} from "@/utils/toastUtils";

export const handleAddCart = async (game: { _id: string; title: string }, session: any) => {
    if (!session) {
        showToast('Vous devez vous connecter pour ajouter un jeu au panier.', 'error');
        return;
    }

    try {
        const values = {
            games: [game._id],
            user: session.user?.id, // Assurez-vous que l'ID de l'utilisateur est correct
        };

        const res = await addToCart(values);
        if (res.success) {
            showToast(`Jeu "${game.title}" ajouté au panier.`, 'success'); // Utilisez le titre du jeu pour un message plus convivial
        } else {
            showToast(res.error || 'Erreur lors de l\'ajout au panier.', 'error');
        }
    } catch (error) {
        console.error("Erreur lors de l'ajout au panier:", error); // Log de l'erreur
        showToast('Erreur lors de l\'ajout au panier.', 'error');
    }
};
