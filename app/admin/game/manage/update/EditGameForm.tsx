// components/GameForm.tsx

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import { getOneGame, updateGame } from '@/actions/games';
import {GameDocument} from "@/models/Game"; // Assurez-vous d'importer les actions appropriées

const categories = ['Action', 'Aventure', 'RPG', 'FPS', 'Stratégie', 'Sport', 'Simulation'];
const platforms = ['PC', 'PlayStation', 'Xbox', 'Nintendo Switch', 'Mobile'];
const pegiRatings = ['3', '7', '12', '16', '18'];
const languages = ['Français', 'Anglais', 'Allemand', 'Espagnol', 'Italien'];

interface GameFormProps {
    game?: GameDocument; // Le jeu à modifier, si présent
    handleSubmit: (gameData: GameDocument) => void; // Fonction appelée lors de la soumission du formulaire
    handleClose: () => void; // Fonction pour fermer le formulaire
}

const GameForm: React.FC<GameFormProps> = ({ game, handleSubmit, handleClose }) => {
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

    const handleArrayChange = (name: 'category' | 'gameMode' | 'platform') => (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        if (checked) {
            if (name === 'category') {
                setCategory((prev) => [...prev, value]);
            } else if (name === 'gameMode') {
                setGameMode((prev) => [...prev, value]);
            } else if (name === 'platform') {
                setPlatform((prev) => [...prev, value]);
            }
        } else {
            if (name === 'category') {
                setCategory((prev) => prev.filter((cat) => cat !== value));
            } else if (name === 'gameMode') {
                setGameMode((prev) => prev.filter((mode) => mode !== value));
            } else if (name === 'platform') {
                setPlatform((prev) => prev.filter((plat) => plat !== value));
            }
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePath(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSubmit({
            _id: game?._id, // Inclure l'ID si c'est une modification
            title,
            description,
            price,
            imagePath,
            category,
            pegi,
            gameMode,
            language,
            studio,
            platform,
        });
    };

    return (
        <div className="mt-8 bg-custom p-4 rounded-lg">
            <h2 className="text-2xl font-bold text-white mb-4">Modifier le jeu</h2>
            <form onSubmit={handleFormSubmit}>
                <div className="mb-4">
                    <label className="block text-white mb-2">Titre</label>
                    <input
                        type="text"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="w-full p-2 rounded text-[#ff7903]"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-white mb-2">Description</label>
                    <textarea
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="w-full p-2 rounded text-[#ff7903]"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-white mb-2">Prix</label>
                    <input
                        type="number"
                        name="price"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        required
                        className="w-full p-2 rounded text-[#ff7903]"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-white mb-2">Catégorie</label>
                    <div className="flex flex-wrap">
                        {categories.map((cat) => (
                            <label key={cat} className="inline-flex items-center mr-2 mb-2">
                                <input
                                    type="checkbox"
                                    name="category"
                                    value={cat}
                                    checked={category.includes(cat)}
                                    onChange={handleArrayChange('category')}
                                    className="form-checkbox h-5 w-5 text-[#ff7903]"
                                />
                                <span className="ml-2 text-white">{cat}</span>
                            </label>
                        ))}
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-white mb-2">Plateforme</label>
                    <div className="flex flex-wrap">
                        {platforms.map((plat) => (
                            <label key={plat} className="inline-flex items-center mr-2 mb-2">
                                <input
                                    type="checkbox"
                                    name="platform"
                                    value={plat}
                                    checked={platform.includes(plat)}
                                    onChange={handleArrayChange('platform')}
                                    className="form-checkbox h-5 w-5 text-[#ff7903]"
                                />
                                <span className="ml-2 text-white">{plat}</span>
                            </label>
                        ))}
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-white mb-2">PEGI</label>
                    <select
                        name="pegi"
                        value={pegi}
                        onChange={(e) => setPegi(e.target.value)}
                        required
                        className="w-full p-2 rounded text-[#ff7903]"
                    >
                        {pegiRatings.map(rating => (
                            <option key={rating} value={rating}>{rating}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-white mb-2">Langue</label>
                    <select
                        name="language"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        required
                        className="w-full p-2 rounded text-[#ff7903]"
                    >
                        {languages.map(lang => (
                            <option key={lang} value={lang}>{lang}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-white mb-2">Studio</label>
                    <input
                        type="text"
                        name="studio"
                        value={studio}
                        onChange={(e) => setStudio(e.target.value)}
                        required
                        className="w-full p-2 rounded text-[#ff7903]"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-white mb-2">Image</label>
                    <input
                        type="file"
                        name="image"
                        onChange={handleImageChange}
                        className="w-full p-2 rounded text-white"
                    />
                </div>
                <div className={'flex gap-4'}>
                    <Button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Mettre à jour</Button>
                    <Button type="button" onClick={handleClose} className="bg-gray-500 text-white px-4 py-2 rounded ml-2">Annuler</Button>
                </div>
            </form>
        </div>
    );
};

export default GameForm;
