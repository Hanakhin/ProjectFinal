"use client"


import React, { useState, useEffect } from 'react';
import { Section } from "@/app/_Components/Section";
import {
    Gamepad,
    Calendar,
    Tag,
    DollarSign,
    Film,
    Building,
    Monitor,
    ChevronUp,
    ChevronDown,
    Trash
} from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import {deleteGame, getGames} from '@/actions/games';
import {Code} from "@/app/_Components/Code";
import LoadingSpinner from "@/app/_Components/LoadingSpinner";
import Modal from '@/app/_Components/modal/CartConfirmationModal';
import { AlertTriangle } from 'lucide-react';
import Link from "next/link";
import {Button} from "@/components/ui/button";

interface GameType {
    _id: string;
    title: string;
    description: string;
    imagePath: string;
    price: number;
    createdAt: Date;
    updatedAt: Date;
    category: string[];
    pegi: string;
    gameMode: string[];
    language: string;
    studio: string;
    platform: string[];
}

type SortField = 'title' | 'price' | 'createdAt';
type SortOrder = 'asc' | 'desc';

const Games: React.FC = () => {
    const [games, setGames] = useState<GameType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [totalGames, setTotalGames] = useState(0);
    const [sortBy, setSortBy] = useState<SortField>('title');
    const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
    const limit = 5; // Nombre de jeux par page
    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedGame, setSelectedGame] = useState<GameType | null>(null);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                setLoading(true);
                const result = await getGames(page, limit, sortBy, sortOrder);
                if (result && result.games) {
                    setGames(result.games);
                    setTotalGames(result.total);
                } else {
                    setError('No games data available');
                }
            } catch (err) {
                console.error("Error fetching games:", err);
                setError('Failed to fetch games');
            } finally {
                setLoading(false);
            }
        };

        fetchGames();
    }, [page, sortBy, sortOrder]);

    const formatDate = (date: Date): string => {
        return format(new Date(date), 'dd MMMM yyyy', { locale: fr });
    };

    const handleSort = (field: SortField) => {
        if (sortBy === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setSortOrder('asc');
        }
        setPage(1); // Réinitialiser à la première page lors du changement de tri
    };

    const renderSortIcon = (field: SortField) => {
        if (sortBy === field) {
            return sortOrder === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />;
        }
        return null;
    };

    const handleDelete = async () => {
        if (!selectedGame) return;
        try {
            const result = await deleteGame(selectedGame._id);
            if (result.success) {
                setGames((prevGames) => prevGames.filter(game => game._id !== selectedGame._id));
                setShowModal(false);
            } else {
                setError(result.error || "Erreur lors de la suppression du jeu");
            }
        } catch (err) {
            console.error("Erreur lors de la suppression du jeu:", err);
            setError("Une erreur est survenue lors de la suppression du jeu");
        }
    };


    if (loading) return <LoadingSpinner/>;
    if (error) return <Section><p className="text-[hsl(0,62.8%,30.6%)]">Error: {error}</p></Section>;

    const totalPages = Math.ceil(totalGames / limit);

    return (
        <Section>
            <div className={'flex flex-row items-center justify-between w-full mb-10'}>
                <h1 className="text-2xl font-bold text-primary">Gestion des jeux</h1>
                <Link  href={'/admin/game/manage/add'}><Button className={'hover:bg-orange'}>Ajouter un jeu</Button></Link>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-[hsl(240,5%,64.9%)]">
                    <thead className="text-xs uppercase bg-[hsl(240,3.7%,15.9%)] text-[hsl(0,0%,98%)]">
                    <tr>
                        <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => handleSort('title')}>
                            <div className="flex items-center">
                                Title
                                <Gamepad className="w-3 h-3 ms-1.5" />
                                {renderSortIcon('title')}
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => handleSort('price')}>
                            <div className="flex items-center">
                                Price
                                <DollarSign className="w-3 h-3 ms-1.5" />
                                {renderSortIcon('price')}
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">
                                Category
                                <Tag className="w-3 h-3 ms-1.5" />
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">
                                PEGI
                                <Film className="w-3 h-3 ms-1.5" />
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">
                                Studio
                                <Building className="w-3 h-3 ms-1.5" />
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">
                                Platform
                                <Monitor className="w-3 h-3 ms-1.5" />
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => handleSort('createdAt')}>
                            <div className="flex items-center">
                                Created At
                                <Calendar className="w-3 h-3 ms-1.5" />
                                {renderSortIcon('createdAt')}
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <span className="sr-only">Edit</span>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {games.map((game) => (
                        <tr key={game._id} className="bg-[hsl(240,10%,3.9%)] border-b border-[hsl(240,3.7%,15.9%)]">
                            <td className="px-6 py-4 flex items-center">
                                <img src={`${game.imagePath}`} alt={game.title} className="w-10 h-10 mr-2 rounded object-cover" />
                                <span className="font-medium text-[hsl(0,0%,98%)]">{game.title}</span>
                            </td>
                            <td className="px-6 py-4">
                                ${game.price.toFixed(2)}
                            </td>
                            <td className="px-6 py-4">
                                {game.category.join(', ')}
                            </td>
                            <td className="px-6 py-4">
                                <Code className={'bg-orange'}>{game.pegi}</Code>
                            </td>
                            <td className="px-6 py-4">
                                {game.studio}
                            </td>
                            <td className="px-6 py-4">
                                {game.platform.join(', ')}
                            </td>
                            <td className="px-6 py-4">
                                {formatDate(game.createdAt)}
                            </td>
                            <td className="px-6 py-4 text-right">
                                <Trash onClick={() => {
                                    setSelectedGame(game);
                                    setShowModal(true);
                                }} className={'cursor-pointer hover:text-red-600'}/>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-4 flex justify-between items-center">
                <button
                    onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                    className="px-4 py-2 bg-[hsl(240,3.7%,15.9%)] text-[hsl(0,0%,98%)] rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="text-[hsl(0,0%,98%)]">Page {page} of {totalPages}</span>
                <button
                    onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={page === totalPages}
                    className="px-4 py-2 bg-[hsl(240,3.7%,15.9%)] text-[hsl(0,0%,98%)] rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={handleDelete}
                title="Confirmer la suppression"
            >
                <div className="text-center">
                    <AlertTriangle className="mx-auto mb-4 text-yellow-400 w-14 h-14" />
                    <p className="text-gray-500">
                        Êtes-vous sûr de vouloir supprimer {selectedGame?.title} ?
                    </p>
                </div>
            </Modal>
        </Section>
    );
};

export default Games;