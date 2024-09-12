"use client"

import React from 'react';
import AddGameForm from "./AddGameForm";
import Nav from "@/app/_Components/Nav/Nav";

const AddGames: React.FunctionComponent = () => {
    return (
        <div className="min-h-screen main-bg p-8">
            <Nav />
            <div className="max-w-4xl mx-auto custom-bg p-8 mt-8 rounded-lg">
                <h1 className="text-2xl font-bold text-white mb-6">Ajouter un nouveau jeu</h1>
                <AddGameForm/>
            </div>
        </div>
    );
}


export default AddGames;