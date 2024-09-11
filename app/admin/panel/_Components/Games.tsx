"use client"


import React, { useState, useEffect } from 'react';
import { Section } from "@/app/_Components/Section";
import { Gamepad, Calendar, Tag, DollarSign, Film, Building, Monitor, Edit, ChevronUp, ChevronDown } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { getGames } from '@/actions/games';
import {Code} from "@/app/_Components/Code";
import LoadingSpinner from "@/app/_Components/LoadingSpinner";

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

    if (loading) return <LoadingSpinner/>;
    if (error) return <Section><p className="text-[hsl(0,62.8%,30.6%)]">Error: {error}</p></Section>;

    const totalPages = Math.ceil(totalGames / limit);

    return (
        <Section>
            <h1 className="text-2xl font-bold mb-6 text-[hsl(0,0%,98%)]">Game Management</h1>
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
                                <a href="#" className="font-medium text-[hsl(22.64,100%,61.4%)] hover:underline">
                                    <Edit className="w-4 h-4 inline" />
                                </a>
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
        </Section>
    );
};

export default Games;