"use server"

import {connectDB} from "@/lib/mongodb";
import Game, {GameDocument} from '@/models/Game'
const {IMAGE_URL} = process.env

function serializeGame(game: GameDocument) {
    return {
        _id: game._id.toString(),
        title: game.title,
        description: game.description,
        imagePath: game.imagePath,
        price: game.price,
        category: game.category,
        pegi: game.pegi,
        gameMode: game.gameMode,
        language: game.language,
        studio: game.studio,
        platform: game.platform,
        createdAt: game.createdAt?.toISOString(),
        updatedAt: game.updatedAt?.toISOString()
    };
}

export const addGame = async (values: any) => {
    const {
        title,
        description,
        category,
        price,
        imagePath,
        pegi,
        gameMode,
        language,
        studio,
        platform
    } = values;

    try {
        await connectDB();
        const gameFound = await Game.findOne({ title });
        if (gameFound) {
            return { error: "Le jeu existe déjà" };
        }

        const game = new Game({
            title,
            description,
            category,
            price: parseFloat(price),
            imagePath: imagePath || `${IMAGE_URL}${title.replace(/\s+/g, '-').toLowerCase()}.jpg`,
            pegi,
            gameMode,
            language,
            studio,
            platform
        });

        const savedGame = await game.save();

        return { success: true, game: savedGame };
    } catch (err) {
        console.error(err)
        return { error: "Une erreur s'est produite lors de l'ajout du jeu.", err };
    }
};


export const getGames = async (
    page: number = 1,
    limit: number = 10,
    sortBy: 'title' | 'price' = 'title',
    sortOrder: 'asc' | 'desc' = 'asc'
) => {
    try {
        await connectDB();
        const skip = (page - 1) * limit;

        let sortOptions: { [key: string]: 1 | -1 } = {};
        sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;

        const games = await Game.find()
            .sort(sortOptions)
            .skip(skip)
            .limit(limit);

        const total = await Game.countDocuments();

        const serializedGames = games.map(serializeGame);

        return { games: serializedGames, total };
    } catch (error) {
        console.error('Erreur lors de la récupération des jeux:', error);
        return null;
    }
};

export const getOneGame = async (_id: string): Promise<Partial<GameDocument> | null> => {
    try {
        await connectDB();
        const game = await Game.findById(_id);

        if (game) {
            console.log('Jeu trouvé:', game._id, game.title);
            return {
                _id: game._id.toString(),
                title: game.title,
                description: game.description,
                imagePath: game.imagePath,
                price: game.price,
                category: game.category,
                pegi: game.pegi,
                gameMode: game.gameMode,
                language: game.language,
                studio: game.studio,
                platform: game.platform,
                createdAt: game.createdAt?.toISOString(),
                updatedAt: game.updatedAt?.toISOString()
            };
        } else {
            console.log('Aucun jeu trouvé avec l\'ID:', _id);
            return null;
        }
    } catch (err) {
        console.error('Erreur lors de la récupération du jeu:', err);
        return null;
    }
}

export const updateGame = async (_id: string, values: Partial<GameDocument>) => {
    try {
        await connectDB();
        const updatedGame = await Game.findByIdAndUpdate(_id, {$set:values}, { new: true });

        if (!updatedGame) {
            return { error: 'Jeu non trouvé' };
        }

        return { success: true, game: updatedGame };
    } catch (e) {
        console.error('Erreur lors de la mise à jour du jeu:', e);
        return { error: 'Erreur lors de la mise à jour du jeu', details: e };
    }
}

export const deleteGame = async (_id: string): Promise<{ success?: boolean; error?: string }> => {
    try {
        await connectDB();
        const game = await Game.findById(_id);

        if (game) {
            await game.deleteOne(); // Supprime le document trouvé
            return { success: true }; // Indique que la suppression a réussi
        } else {
            return { error: "Aucun jeu trouvé à supprimer" }; // Message d'erreur si le jeu n'existe pas
        }
    } catch (err) {
        console.error("Erreur lors de la suppression du jeu:", err);
        return { error: "Une erreur est survenue lors de la suppression du jeu" }; // Message d'erreur générique
    }
};