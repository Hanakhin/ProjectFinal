
import React, { useEffect, useState } from 'react';
import LoadingSpinner from "@/app/_Components/LoadingSpinner";
import {getGames} from "@/actions/games";

interface GameFetcherProps {
    page: number;
    limit: number;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
    onFetchSuccess: (games: any[], total: number) => void; // Callback pour gérer les jeux récupérés
    onFetchError: (error: string) => void; // Callback pour gérer les erreurs
}

const GameFetcher: React.FC<GameFetcherProps> = ({ page, limit, sortBy, sortOrder, onFetchSuccess, onFetchError }) => {
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                setLoading(true);
                const result = await getGames(page, limit, sortBy, sortOrder);
                if (result && result.games) {
                    onFetchSuccess(result.games, result.total);
                } else {
                    onFetchError('No games data available');
                }
            } catch (err) {
                console.error("Error fetching games:", err);
                onFetchError('Failed to fetch games');
            } finally {
                setLoading(false);
            }
        };

        fetchGames();
    }, [page, limit, sortBy, sortOrder, onFetchSuccess, onFetchError]);

    return (
        <div>
            {loading && <LoadingSpinner/>}
        </div>
    );
};

export default GameFetcher;
