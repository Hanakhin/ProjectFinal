"use server"

import { connectDB } from "@/lib/mongodb";
import Cart, { CartDocument } from "@/models/Cart";
import mongoose from "mongoose";

function serializeCart(cart: CartDocument) {
    return {
        _id: cart._id.toString(),
        games: cart.games.map(game => game.toString()), // Sérialiser les ObjectIds de jeux
        user: cart.user.toString(),
        createdAt: cart.createdAt.toISOString(),
        updatedAt: cart.updatedAt.toISOString(),
        totalPrice: cart.totalPrice,
    };
}

export const addToCart = async (values: any) => {
    const { games, user } = values;

    try {
        await connectDB();

        // Vérifier si un panier existe déjà pour cet utilisateur
        let cart = await Cart.findOne({ user });

        if (!cart) {
            // Si aucun panier n'existe, en créer un nouveau
            cart = new Cart({
                games,
                user
            });
        } else {
            // Vérifier les jeux déjà présents dans le panier
            const existingGameIds = new Set(cart.games.map(game => game.toString()));
            const newGames = games.filter(game => !existingGameIds.has(game.toString()));

            if (newGames.length === 0) {
                // Si tous les jeux sont déjà dans le panier
                return { error: "Certains jeux sont déjà dans votre panier" };
            }

            // Ajouter les nouveaux jeux au panier
            cart.games = [...cart.games, ...newGames];
        }

        const savedCart = await cart.save();
        return { success: true, cart: serializeCart(savedCart) };
    } catch (err) {
        console.error(err);
        return { error: "Il y a une erreur avec votre panier" };
    }
};
export const getCart = async (userId: string) => {
    try {
        await connectDB(); // Connexion à la base de données

        // Récupérer le panier de l'utilisateur, en peuplant les jeux, et en utilisant .lean() pour obtenir des objets simples
        const cart = await Cart.findOne({ user: userId })
            .populate("games")
            .lean();

        if (cart) {
            // Transformez les objets pour ne conserver que les propriétés nécessaires
            return {
                _id: cart._id.toString(),
                games: cart.games.map((game: any) => ({
                    _id: game._id.toString(),
                    title: game.title,
                    price: game.price,
                    imagePath: game.imagePath,
                })),
                user: cart.user.toString(), // Si l'utilisateur est un ObjectId
                createdAt: cart.createdAt.toISOString(),
                updatedAt: cart.updatedAt.toISOString(),
                totalPrice: cart.totalPrice,
            };
        } else {
            return null;
        }
    } catch (error) {
        console.error("Erreur lors de la récupération du panier:", error);
        return null;
    }
};

export const removeFromCart = async (userId: string, gameId: string) => {
    try {
        await connectDB();

        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            throw new Error("Panier non trouvé");
        }

        if (!mongoose.Types.ObjectId.isValid(gameId)) {
            throw new Error("Identifiant de jeu invalide");
        }

        // Utilisez map au lieu de filter pour éviter une possible récursion
        cart.games = cart.games.map((game: any) => game.toString()).filter(id => id !== gameId);

        if (cart.games.length === 0) {
            await Cart.deleteOne({ _id: cart._id });
            return { success: true, message: "Panier supprimé car il est vide." };
        } else {
            const updatedCart = await cart.save();
            // Sérialiser manuellement le panier mis à jour
            const serializedCart = {
                _id: updatedCart._id.toString(),
                games: updatedCart.games.map((g: any) => g.toString()),
                user: updatedCart.user.toString(),
                createdAt: updatedCart.createdAt.toISOString(),
                updatedAt: updatedCart.updatedAt.toISOString(),
                totalPrice: updatedCart.totalPrice,
            };
            return { success: true, cart: serializedCart };
        }
    } catch (error) {
        console.error("Erreur lors de la suppression du jeu du panier:", error);
        return { success: false, error: error.message };
    }
};


export const clearCart = async (userId: string) => {
    try {
        await connectDB(); // Connecter à la base de données

        // Trouver le panier de l'utilisateur
        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            throw new Error("Panier non trouvé");
        }

        // Vider le panier
        cart.games = [];

        // Sauvegarder les modifications dans la base de données
        await cart.save();

        // Supprimer le panier s'il est vide après avoir vidé les jeux
        if (cart.games.length === 0) {
            await Cart.deleteOne({ user: userId });
            return { success: true, message: "Panier supprimé car il est vide" };
        }

        return { success: true, cart };
    } catch (error) {
        console.error("Erreur lors du vidage du panier:", error);
        return { success: false, error: error.message };
    }
};

