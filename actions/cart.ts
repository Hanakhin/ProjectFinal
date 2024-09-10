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
console.log('salut')
};

import { ObjectId } from 'mongodb';

export const getCart = async (userId: string) => {
    try {
        await connectDB();

        // Décodez l'ID de l'utilisateur
        const decodedUserId = decodeURIComponent(userId);

        // Vérifiez si l'ID est un ObjectId valide
        if (!ObjectId.isValid(decodedUserId)) {
            throw new Error("ID d'utilisateur invalide");
        }

        const cart = await Cart.findOne({ user: new ObjectId(decodedUserId) })
            .populate({
                path: 'games',
                select: '_id title price imagePath'
            })
            .lean();

        if (cart) {
            return {
                _id: cart._id.toString(),
                games: cart.games.map((game: any) => ({
                    _id: game._id.toString(),
                    title: game.title,
                    price: game.price,
                    imagePath: game.imagePath,
                })),
                user: cart.user.toString(),
                createdAt: cart.createdAt.toISOString(),
                updatedAt: cart.updatedAt.toISOString(),
                totalPrice: cart.totalPrice,
            };
        } else {
            return null;
        }
    } catch (error) {
        console.error("Erreur lors de la récupération du panier:", error);
        throw error; // Propagez l'erreur pour qu'elle puisse être gérée par le composant
    }
};

export const removeFromCart = async (userId: string, gameId: string) => {
    try {
        await connectDB();

        if (!mongoose.Types.ObjectId.isValid(gameId)) {
            throw new Error("Identifiant de jeu invalide");
        }

        const cart = await Cart.findOneAndUpdate(
            { user: userId },
            { $pull: { games: gameId } },
            { new: true }
        );

        if (!cart) {
            throw new Error("Panier non trouvé");
        }

        if (cart.games.length === 0) {
            await Cart.deleteOne({ _id: cart._id });
            return { success: true, message: "Panier supprimé car il est vide." };
        } else {
            return { success: true, cart: serializeCart(cart) };
        }
    } catch (error) {
        console.error("Erreur lors de la suppression du jeu du panier:", error);
        return { success: false, error: error.message };
    }
};


export const clearCart = async (userId: string) => {
    try {
        await connectDB();

        const result = await Cart.updateOne(
            { user: userId },
            { $set: { games: [] } }
        );

        if (result.matchedCount === 0) {
            throw new Error("Panier non trouvé");
        }

        return { success: true, message: "Panier vidé avec succès" };
    } catch (error) {
        console.error("Erreur lors du vidage du panier:", error);
        return { success: false, error: error.message };
    }
};

