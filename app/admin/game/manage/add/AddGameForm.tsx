"use client"

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {addGame} from "@/actions/games";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

interface GameData {
    _id: string;
    title: string;
    description: string;
    price: number;
    category: string[];
    pegi: string
    gameMode: string[];
    language: string
    studio: string;
    platform: string[];
    imagePath: string;
}


const AddGameForm: React.FC = () => {
    const [gameData, setGameData] = useState<GameData>({
        _id:'',
        title: '',
        description: '',
        price: 0,
        category: [],
        pegi: '',
        gameMode: [],
        language: '',
        studio: '',
        platform: [],
        imagePath: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setGameData(prev => ({ ...prev, [name]: value }));
    };

    const handleArrayChange = (name: 'category' | 'gameMode' | 'platform') => (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        setGameData(prev => ({
            ...prev,
            [name]: checked
                ? [...prev[name], value]
                : prev[name].filter(item => item !== value)
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setGameData(prev => ({ ...prev, imagePath: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
                await addGame(gameData);

        } catch (error) {
            console.error("Erreur lors de l'ajout du jeu:", error);
        }finally {

        }
    };

    const handleSelectChange = (value:string) =>{
        setGameData(prev => ({ ...prev, pegi: value }));
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="title" className="block text-white mb-2">Titre</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={gameData.title}
                    onChange={handleInputChange}
                    className="w-full p-2 rounded text-[#ff7903] custom-bg"
                    required
                />
            </div>
            <div>
                <label htmlFor="description" className="block text-white mb-2">Description</label>
                <textarea
                    id="description"
                    name="description"
                    value={gameData.description}
                    onChange={handleInputChange}
                    className="w-full p-2 rounded text-[#ff7903] custom-bg"
                    rows={4}
                    required
                />
            </div>
            <div>
                <label htmlFor="price" className="block text-white mb-2">Prix</label>
                <input
                    type="number"
                    id="price"
                    name="price"
                    value={gameData.price}
                    onChange={handleInputChange}
                    className="w-full p-2 rounded text-[#ff7903] custom-bg"
                    required
                />
            </div>
            <div>
                <label className="block text-white mb-2">Catégorie</label>
                <div className="flex flex-wrap gap-2">
                    {['Action', 'Aventure', 'RPG', 'Stratégie', 'Sport', 'Simulation', 'Puzzle', 'Course', 'Souls Like', 'FPS', 'Combat', 'Autre'].map((cat) => (
                        <label key={cat} className="inline-flex items-center">
                            <input
                                type="checkbox"
                                name="category"
                                value={cat.toLowerCase()}
                                checked={gameData.category.includes(cat.toLowerCase())}
                                onChange={handleArrayChange('category')}
                                className="form-checkbox text-[#ff7903] custom-bg"
                            />
                            <span className="ml-2 text-white">{cat}</span>
                        </label>
                    ))}
                </div>
            </div>
            <div>
                <label className="block text-white mb-2">PEGI</label>
                <div className="flex flex-wrap gap-2">
                    <Select value={gameData.pegi} onValueChange={handleSelectChange}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select Pegi" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="3">3</SelectItem>
                            <SelectItem value="7">7</SelectItem>
                            <SelectItem value="12">12</SelectItem>
                            <SelectItem value="16">16</SelectItem>
                            <SelectItem value="18">18</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div>
                <label className="block text-white mb-2">Mode de jeu</label>
                <div className="flex flex-wrap gap-2">
                    {['Solo', 'Multijoueur', 'Coopératif', 'En ligne'].map((mode) => (
                        <label key={mode} className="inline-flex items-center">
                            <input
                                type="checkbox"
                                name="gameMode"
                                value={mode.toLowerCase()}
                                checked={gameData.gameMode.includes(mode.toLowerCase())}
                                onChange={handleArrayChange('gameMode')}
                                className="form-checkbox text-[#ff7903] custom-bg"
                            />
                            <span className="ml-2 text-white">{mode}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div>
                <label className="block text-white mb-2">Langue</label>
                <div className="flex flex-wrap gap-2">
                    {['Français', 'Anglais', 'Espagnol'].map((lang) => (
                        <label key={lang} className="inline-flex items-center">
                            <input
                                type="radio"
                                name="language"
                                value={lang.toLowerCase()}
                                checked={gameData.language === lang.toLowerCase()}
                                onChange={handleInputChange}
                                className="form-radio text-[#ff7903] custom-bg"
                            />
                            <span className="ml-2 text-white">{lang}</span>
                        </label>
                    ))}
                </div>
            </div>
            <div>
                <label htmlFor="studio" className="block text-white mb-2">Studio</label>
                <input
                    type="text"
                    id="studio"
                    name="studio"
                    value={gameData.studio}
                    onChange={handleInputChange}
                    className="w-full p-2 rounded text-[#ff7903] custom-bg"
                    required
                />
            </div>
            <div>
                <label className="block text-white mb-2">Plateforme</label>
                <div className="flex flex-wrap gap-2">
                    {['PC', 'PlayStation', 'Xbox', 'Nintendo Switch', 'Mobile'].map((plat) => (
                        <label key={plat} className="inline-flex items-center">
                            <input
                                type="checkbox"
                                name="platform"
                                value={plat.toLowerCase()}
                                checked={gameData.platform.includes(plat.toLowerCase())}
                                onChange={handleArrayChange('platform')}
                                className="form-checkbox text-[#ff7903] custom-bg"
                            />
                            <span className="ml-2 text-white">{plat}</span>
                        </label>
                    ))}
                </div>
            </div>
            <div>
                <label htmlFor="image" className="block text-white mb-2">Image</label>
                <input
                    type="file"
                    id="image"
                    name="image"
                    onChange={handleImageChange}
                    className="w-full p-2 rounded text-[#ff7903] custom-bg"
                />
                {gameData.imagePath && (
                    <img src={gameData.imagePath} alt="Preview" className="mt-2 w-32 h-32 object-cover"/>
                )}
            </div>
            <Button type="submit">Ajouter le jeu</Button>
        </form>
    );
};

export default AddGameForm;