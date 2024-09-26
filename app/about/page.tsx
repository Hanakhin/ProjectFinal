"use client"

import React from 'react';
import { Section } from "@/app/_Components/Section";
import { Gamepad, Users, Shield, Star } from 'lucide-react';
import Nav from "@/app/_Components/Nav/Nav";
import {Spacing} from "@/app/_Components/Spacing";

const APropos: React.FC = () => {
    return (
        <Section>
            <Nav/>
            <Spacing/>
            <div className="max-w-4xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-[hsl(0,0%,98%)] mb-6">À propos de GameZone</h1>
                <div className="space-y-6 text-[hsl(240,5%,64.9%)]">
                    <p>
                        Bienvenue sur <span className="text-orange font-semibold">GameZone</span>, votre destination ultime pour tout ce qui concerne le gaming. Fondée en 2023, nous sommes passionnés par l'idée d'offrir les meilleures expériences de jeu à notre communauté.
                    </p>
                    <p>
                        Notre mission est de créer un espace où les joueurs de tous niveaux peuvent découvrir de nouveaux titres, se connecter avec d'autres passionnés et rester informés des dernières technologies et tendances du jeu vidéo.
                    </p>
                    <h2 className="text-2xl font-semibold text-[hsl(0,0%,98%)] mt-4 mb-2">Ce que nous offrons</h2>
                    <ul className="list-disc list-inside pl-4 space-y-2">
                        <li className="flex items-center">
                            <Gamepad className="w-5 h-5 text-orange mr-2" />
                            Une sélection soignée de jeux les mieux notés
                        </li>
                        <li className="flex items-center">
                            <Star className="w-5 h-5 text-orange mr-2" />
                            Des critiques d'experts et des recommandations
                        </li>
                        <li className="flex items-center">
                            <Users className="w-5 h-5 text-orange mr-2" />
                            Un forum communautaire dynamique
                        </li>
                        <li className="flex items-center">
                            <Shield className="w-5 h-5 text-orange mr-2" />
                            Des offres et promotions exclusives
                        </li>
                    </ul>
                    <p>
                        Rejoignez-nous dans notre mission de rendre le gaming plus accessible, agréable et gratifiant pour tous.
                    </p>
                </div>
            </div>
        </Section>
    );
};

export default APropos;
