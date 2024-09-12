// app/admin/game/manage/update/[id]/page.tsx

"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getOneGame, updateGame } from '@/actions/games'; // Assurez-vous d'importer les actions appropriées
import GameForm from '@/app/_Components/GameForm';
import LoadingSpinner from "@/app/_Components/LoadingSpinner";
import Error from "@/app/_Components/Error";
import {GameDocument} from "@/models/Game";

const UpdateGamePage = ({ params }: { params: { id: string } }) => {
    const [game, setGame] = useState<GameDocument | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchGame = async () => {
            try {
                setLoading(true);
                const result = await getOneGame(params.id); // Récupérer le jeu par ID
                if (result) {
                    setGame(result);
                } else {
                    setError('Aucun jeu trouvé avec cet ID');
                }
            } catch (err) {
                console.error("Erreur lors de la récupération du jeu:", err);
                setError('Erreur lors de la récupération du jeu');
            } finally {
                setLoading(false);
            }
        };

        fetchGame();
    }, [params.id]);

    const handleSubmit = async (gameData: GameDocument) => {
        try {
            const result = await updateGame(gameData._id, gameData);
            if (result.success) {
                router.push('/admin/games'); // Rediriger vers la page des jeux après la mise à jour
            } else {
                setError(result.error || "Erreur lors de la mise à jour du jeu");
            }
        } catch (err) {
            console.error("Erreur lors de la soumission du formulaire:", err);
            setError("Une erreur est survenue lors de la soumission du formulaire");
        }
    };

    if (loading) return <LoadingSpinner />;
    if (error) return <Error message={error} />;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Modifier le jeu</h1>
            <GameForm
                game={game}
                handleSubmit={handleSubmit}
                handleClose={() => router.push('/admin/games')}
            />
        </div>
    );
};

export default UpdateGamePage;
