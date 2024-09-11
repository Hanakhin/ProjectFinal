"use client"

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Gamepad, Joystick, Languages, Star } from 'lucide-react';
import { getOneGame } from "@/actions/games";
import { useParams } from "next/navigation";
import LoadingSpinner from "@/app/_Components/LoadingSpinner";
import Error from "@/app/_Components/Error";

interface GameData {
    _id: string;
    title: string;
    description: string;
    price: number;
    category: string[];
    pegi: string;
    gameMode: string[];
    language: string;
    studio: string;
    platform: string[];
    imagePath: string;
}

const GameDetails: React.FC = () => {
    const [game, setGame] = useState<GameData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const params = useParams();
    const gameId = params.id as string;

    useEffect(() => {
        const loadGame = async () => {
            if (!gameId) {
                setError('ID du jeu manquant');
                setLoading(false);
                return;
            }
            try {
                const gameData = await getOneGame(gameId);
                if (gameData) {
                    setGame(gameData);
                } else {
                    setError('Aucune donnée de jeu disponible');
                }
            } catch (e) {
                console.error(e);
                setError('Erreur lors du chargement');
            } finally {
                setLoading(false);
            }
        };
        loadGame();
    }, [gameId]);

    if (loading) return <LoadingSpinner/>;
    if (error) return <Error message={error} />;
    if (!game) return <div>Aucune donnée de jeu disponible</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-card text-card-foreground rounded-lg shadow-lg overflow-hidden">
                <div className="md:flex">
                    <div className="md:flex-shrink-0">
                        <Image
                            src={game.imagePath}
                            alt={game.title}
                            width={400}
                            height={300}
                            className="h-48 w-full object-cover md:h-full md:w-48"
                        />
                    </div>
                    <div className="p-8">
                        <div className="uppercase tracking-wide text-orange text-sm font-semibold">
                            {game.studio}
                        </div>
                        <h1 className="mt-1 text-4xl font-bold text-primary">{game.title}</h1>
                        <p className="mt-2 text-muted-foreground">{game.description}</p>

                        <div className="mt-4 flex flex-wrap gap-2">
                            {game.category.map((cat, index) => (
                                <span key={index} className="px-2 py-1 bg-secondary text-secondary-foreground rounded-full text-xs">
                                    {cat}
                                </span>
                            ))}
                        </div>

                        <div className="mt-6 flex items-center">
                            <span className="text-2xl font-bold text-orange">${game.price.toFixed(2)}</span>
                            <span className="ml-2 px-2 py-1 bg-accent text-accent-foreground rounded text-xs">
                                <Star size={16} className="inline-block mr-1" aria-label="PEGI rating" />
                                PEGI {game.pegi}
                            </span>
                        </div>

                        <div className="mt-4">
                            <h2 className="text-lg font-semibold text-primary">Détails du jeu</h2>
                            <ul className="mt-2 space-y-1 text-muted-foreground">
                                <li>
                                    <Languages size={16} className="inline-block mr-1" aria-label="Language" />
                                    Langue : {game.language}
                                </li>
                                <li>
                                    <Gamepad size={16} className="inline-block mr-1" aria-label="Game Modes" />
                                    Modes de jeu : {game.gameMode.join(', ')}
                                </li>
                                <li>
                                    <Joystick size={16} className="inline-block mr-1" aria-label="Platforms" />
                                    Plateformes : {game.platform.join(', ')}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameDetails;
