"use client"

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Tag, DollarSign, Calendar, Clock, ShoppingCart, Star    } from 'lucide-react';
import { getOneGame } from "@/actions/games";
import { useParams } from "next/navigation";
import LoadingSpinner from "@/app/_Components/LoadingSpinner";
import Error from "@/app/_Components/Error";
import { Section } from "@/app/_Components/Section";
import Nav from "@/app/_Components/Nav/Nav";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import GameImage from "@/app/_Components/GameImage";
import {handleAddCart} from "@/app/game/_functions/AddToCart";
import {GameData} from "@/app/game/_interfaces/GameData";
import GameDetailItem from "@/app/game/_components/GameDetailsItem";
import CharacteristicItem from "@/app/game/_components/CharactItem";


const GameDetails: React.FC = () => {
    const [game, setGame] = useState<GameData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const { data: session } = useSession();

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

    if (loading) return <LoadingSpinner />;
    if (error) return <Error message={error} />;
    if (!game) return <div>Aucune donnée de jeu disponible</div>;

    return (
        <Section className={'h-full'}>
            <Nav />
            <div className="min-h-screen bg-gradient-to-br custom-gradient">
                <div className="max-w-7xl mx-auto px-4 py-12">
                    <Link href="/" className="inline-flex items-center text-white mb-6 hover:text-orange transition-colors">
                        <ArrowLeft className="mr-2" />
                        Retour a l'accueil
                    </Link>
                    <div className="custom-bg backdrop-filter backdrop-blur-lg rounded-3xl p-8 shadow-2xl">
                        <div className="flex flex-col lg:flex-row">
                            <div className="lg:w-1/2 mb-8 lg:mb-0">
                                <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-video">
                                    <GameImage src={game.imagePath} alt={game.title} priority={true}/>
                                </div>
                            </div>
                            <div className="lg:w-1/2 lg:pl-12">
                                <h1 className="text-4xl font-bold text-white mb-4">{game.title}</h1>
                                <p className="text-gray-200 mb-6 text-lg">{game.description}</p>
                                <div className="grid grid-cols-2 gap-6 mb-8">
                                    <GameDetailItem icon={<Tag />} label="Catégorie" value={game.category.join(', ')} />
                                    <GameDetailItem icon={<DollarSign />} label="Prix" value={`${game.price.toFixed(2)} €`} />
                                    <GameDetailItem icon={<Calendar />} label="Ajouté le" value={new Date(game.createdAt).toLocaleDateString()} />
                                    <GameDetailItem icon={<Clock />} label="Mis à jour le" value={new Date(game.updatedAt).toLocaleDateString()} />
                                </div>
                                <div className="flex flex-row gap-4">
                                    {!session && (
                                        <p>Vous devez vous <Link href="/auth/login" className="text-gray-500 hover:text-[#ff7903]">
                                            connecter</Link> pour ajouter un jeu au panier
                                        </p>
                                    )}
                                    {session && (
                                        <Button onClick={() => handleAddCart(game,session)} className={'hover:bg-orange'}>
                                            <ShoppingCart className="mr-2" />
                                            Ajouter au panier
                                        </Button>
                                    )}
                                    {session?.user?.role === 'admin' && (
                                        <Link href={`/admin/game/manage/update/${game._id}`}>
                                            <Button className={'hover:bg-orange'}>Modifier</Button>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="mt-12">
                            <h2 className="text-2xl font-semibold text-white mb-4">Caractéristiques</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                <CharacteristicItem label="Plateforme" value={game.platform.join(', ')} />
                                <CharacteristicItem label="Mode de jeu" value={game.gameMode.join(', ')} />
                                <CharacteristicItem label="Langue" value={game.language} />
                                <CharacteristicItem label="PEGI" value={game.pegi} />
                                <CharacteristicItem label="Studio" value={game.studio} />
                            </div>
                        </div>
                        <div className="mt-12">
                            <h2 className="text-2xl font-semibold text-white mb-4">Avis des joueurs</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[1, 2].map((_, index) => (
                                    <div key={index} className="bg-white bg-opacity-10 rounded-xl p-6">
                                        <div className="flex items-center mb-2">
                                            <div className="flex text-yellow-400">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <Star key={star} className={star <= 4 ? "text-yellow-400" : "text-gray-400"} />
                                                ))}
                                            </div>
                                            <span className="ml-2 text-white">4.0</span>
                                        </div>
                                        <p className="text-gray-200">Un jeu vraiment sympa, mais un peu compliqué par moments. Les graphismes sont époustouflants !</p>
                                        <p className="text-gray-400 mt-2 text-sm">Par Joueur Anonyme - 15/08/2023</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default GameDetails;
