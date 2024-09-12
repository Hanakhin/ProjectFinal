"use client"

import React, { useState, useEffect } from 'react';
import { Section } from "@/app/_Components/Section";
import { getGames } from '@/actions/games';
import { Star, ArrowUpDown } from 'lucide-react';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import {Spacing} from "@/app/_Components/Spacing";
import Footer from "@/app/_Components/Footer";
import Link from "next/link";
import LoadingSpinner from "@/app/_Components/LoadingSpinner";
import Error from '@/app/_Components/Error'
import {handleAddCart} from "@/app/game/_functions/AddToCart";
import {useSession} from "next-auth/react";
import {Button} from "@/components/ui/button";

interface GameType {
    _id: string;
    title: string;
    description: string;
    imagePath: string;
    price: number;
    category: string[];
    pegi: string;
    platform: string[];
}

type SortField = 'title' | 'price';
type SortOrder = 'asc' | 'desc';

const Games: React.FC = () => {
    const [games, setGames] = useState<GameType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [totalGames, setTotalGames] = useState(0);
    const [sortBy, setSortBy] = useState<SortField>('title');
    const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
    const limit = 6; // 5 jeux par page
    const {data:session} = useSession()

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

    const totalPages = Math.ceil(totalGames / limit);


    const handleSort = (field: SortField) => {
        if (sortBy === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setSortOrder('asc');
        }
        setPage(1); // Réinitialiser à la première page lors du changement de tri
    };

    if (loading) return <LoadingSpinner/>;
    if (error) return <Error message={error}/>;

    return (
        <Section>

            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-[hsl(0,0%,98%)]"></h2>
                <div className="flex space-x-2">
                    <button
                        onClick={() => handleSort('title')}
                        className="flex items-center px-3 py-2 bg-[hsl(240,3.7%,15.9%)] text-[hsl(0,0%,98%)] rounded"
                    >
                        Sort by Name <ArrowUpDown className="ml-1 h-4 w-4" />
                    </button>
                    <button
                        onClick={() => handleSort('price')}
                        className="flex items-center px-3 py-2 bg-[hsl(240,3.7%,15.9%)] text-[hsl(0,0%,98%)] rounded"
                    >
                        Sort by Price <ArrowUpDown className="ml-1 h-4 w-4" />
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
                {games.map((game) => (
                    <div className="bg-secondary border border-[hsl(240,3.7%,15.9%)] rounded shadow-lg flex flex-col h-full" key={game._id}>
                        <Link href={`game/details/${game._id}`} >
                        <img className="w-full h-48 object-cover rounded-t-lg" src={`${game.imagePath}`} alt={game.title} />
                        </Link>
                        <div className="p-5 flex flex-col flex-grow">
                            <h5 className="text-xl font-semibold tracking-tight text-[hsl(0,0%,98%)] mb-2">{game.title}</h5>
                            <p className="text-[hsl(240,5%,64.9%)] mb-3 flex-grow truncate overflow-hidden">{game.description}</p>
                            <div className="mt-auto">
                                <div className="flex items-center mb-3">
                                    {(() => {
                                        const rating = Math.floor(Math.random() * 5) + 1; // Génère un nombre entre 1 et 5
                                        return (
                                            <>
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`w-4 h-4 ${i < rating ? 'text-[hsl(22.64,100%,61.4%)]' : 'text-gray-300'}`}
                                                        fill={i < rating ? 'currentColor' : 'none'}
                                                    />
                                                ))}
                                                <span
                                                    className="bg-[hsl(240,3.7%,15.9%)] text-[hsl(0,0%,98%)] text-xs font-semibold px-2.5 py-0.5 rounded ms-3">
                    {rating.toFixed(1)}
                </span>
                                            </>
                                        );
                                    })()}
                                </div>
                                <div className="flex items-center justify-between">
                                    <span
                                        className="text-3xl font-bold text-[hsl(0,0%,98%)]">€{game.price.toFixed(2)}</span>
                                    {
                                        session? (
                                                <button
                                                    onClick={()=>handleAddCart(game,session)}
                                                    className="text-primary bg-primary text-primary-foreground hover:bg-orange focus:ring-4 focus:outline-none focus:ring-[hsl(22.64,100%,71.4%)] font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                                    Add to cart
                                                </button>
                                            ):
                                            (
                                                <Link href={'/auth/login'}><Button className={"bg-primary text-primary-foreground hover:bg-orange"}>Se connecter</Button></Link>
                                            )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <Pagination className="mt-6">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                setPage(prev => Math.max(prev - 1, 1));
                            }}
                            className={page === 1 ? 'pointer-events-none opacity-50' : ''}
                        />
                    </PaginationItem>
                    {[...Array(totalPages)].map((_, i) => (
                        <PaginationItem key={i}>
                            <PaginationLink
                                href="#"
                                isActive={page === i + 1}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setPage(i + 1);
                                }}
                            >
                                {i + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                    {totalPages > 5 && <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>}
                    <PaginationItem>
                        <PaginationNext
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                setPage(prev => Math.min(prev + 1, totalPages));
                            }}
                            className={page === totalPages ? 'pointer-events-none opacity-50' : ''}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
            <Spacing/>
            <Footer/>
        </Section>
    );
}

export default Games;