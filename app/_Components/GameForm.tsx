
import React, { useState, useEffect } from 'react';

interface GameFormProps {
    game?: {
        _id: string;
        title: string;
        description: string;
        price: number;
        imagePath: string;
        category: string[];
        pegi: string;
        gameMode: string[];
        language: string;
        studio: string;
        platform: string[];
    };
    onSubmit: (gameData: any) => void;
    onClose: () => void;
}

const GameForm: React.FC<GameFormProps> = ({ game, onSubmit, onClose }) => {
    const [title, setTitle] = useState(game?.title || '');
    const [description, setDescription] = useState(game?.description || '');
    const [price, setPrice] = useState(game?.price || 0);
    const [imagePath, setImagePath] = useState(game?.imagePath || '');
    const [category, setCategory] = useState(game?.category || []);
    const [pegi, setPegi] = useState(game?.pegi || '');
    const [gameMode, setGameMode] = useState(game?.gameMode || []);
    const [language, setLanguage] = useState(game?.language || '');
    const [studio, setStudio] = useState(game?.studio || '');
    const [platform, setPlatform] = useState(game?.platform || []);

    useEffect(() => {
        if (game) {
            setTitle(game.title);
            setDescription(game.description);
            setPrice(game.price);
            setImagePath(game.imagePath);
            setCategory(game.category);
            setPegi(game.pegi);
            setGameMode(game.gameMode);
            setLanguage(game.language);
            setStudio(game.studio);
            setPlatform(game.platform);
        }
    }, [game]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            _id: game?._id,
            title,
            description,
            price,
            imagePath,
            category,
            pegi,
            gameMode,
            language,
            studio,
            platform
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium">Titre</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="mt-1 block w-full border rounded-md p-2"
                />
            </div>
            <div>
                <label className="block text-sm font-medium">Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="mt-1 block w-full border rounded-md p-2"
                />
            </div>
            <div>
                <label className="block text-sm font-medium">Prix (€)</label>
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    required
                    className="mt-1 block w-full border rounded-md p-2"
                />
            </div>
            <div>
                <label className="block text-sm font-medium">Image URL</label>
                <input
                    type="text"
                    value={imagePath}
                    onChange={(e) => setImagePath(e.target.value)}
                    required
                    className="mt-1 block w-full border rounded-md p-2"
                />
            </div>
            <div>
                <label className="block text-sm font-medium">PEGI</label>
                <input
                    type="text"
                    value={pegi}
                    onChange={(e) => setPegi(e.target.value)}
                    className="mt-1 block w-full border rounded-md p-2"
                />
            </div>
            <div>
                <label className="block text-sm font-medium">Mode de jeu</label>
                <input
                    type="text"
                    value={gameMode.join(', ')}
                    onChange={(e) => setGameMode(e.target.value.split(',').map(mode => mode.trim()))}
                    className="mt-1 block w-full border rounded-md p-2"
                />
            </div>
            <div>
                <label className="block text-sm font-medium">Langue</label>
                <input
                    type="text"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="mt-1 block w-full border rounded-md p-2"
                />
            </div>
            <div>
                <label className="block text-sm font-medium">Studio</label>
                <input
                    type="text"
                    value={studio}
                    onChange={(e) => setStudio(e.target.value)}
                    className="mt-1 block w-full border rounded-md p-2"
                />
            </div>
            <div>
                <label className="block text-sm font-medium">Plateforme</label>
                <input
                    type="text"
                    value={platform.join(', ')}
                    onChange={(e) => setPlatform(e.target.value.split(',').map(p => p.trim()))}
                    className="mt-1 block w-full border rounded-md p-2"
                />
            </div>
            <div className="flex justify-end">
                <button type="button" onClick={onClose} className="mr-2 text-gray-500 hover:text-gray-700">
                    Annuler
                </button>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                    {game ? "Modifier" : "Ajouter"}
                </button>
            </div>
        </form>
    );
};

export default GameForm;
