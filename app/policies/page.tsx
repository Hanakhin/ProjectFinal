"use client"

import React from 'react';
import { Section } from "@/app/_Components/Section";
import { Lock } from 'lucide-react';
import Nav from "@/app/_Components/Nav/Nav";
import {Spacing} from "@/app/_Components/Spacing";

const PolitiqueConfidentialite: React.FC = () => {
    return (
        <Section>
            <Nav/>
            <Spacing/>
            <div className="max-w-4xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-[hsl(0,0%,98%)] mb-6">Politique de Confidentialité</h1>
                <div className="space-y-6 text-[hsl(240,5%,64.9%)]">
                    <p>
                        Chez <span className="text-orange font-semibold">GameZone</span>, nous prenons votre vie privée au sérieux. Cette politique décrit comment nous collectons, utilisons et protégeons vos informations personnelles.
                    </p>
                    <h2 className="text-2xl font-semibold text-[hsl(0,0%,98%)] mt-4 mb-2">Collecte d'Informations</h2>
                    <p>
                        Nous collectons les informations que vous nous fournissez directement, par exemple lorsque vous créez un compte, effectuez un achat ou contactez notre équipe de support.
                    </p>
                    <h2 className="text-2xl font-semibold text-[hsl(0,0%,98%)] mt-4 mb-2">Utilisation des Informations</h2>
                    <p>
                        Nous utilisons vos informations pour fournir, maintenir et améliorer nos services, traiter les transactions et communiquer avec vous.
                    </p>
                    <h2 className="text-2xl font-semibold text-[hsl(0,0%,98%)] mt-4 mb-2">Protection des Données</h2>
                    <p>
                        <Lock className="inline w-5 h-5 text-orange mr-2" />
                        Nous mettons en œuvre diverses mesures de sécurité pour assurer la protection de vos informations personnelles.
                    </p>
                    <p>
                        Pour des informations plus détaillées, veuillez lire notre politique de confidentialité complète.
                    </p>
                </div>
            </div>
        </Section>
    );
};

export default PolitiqueConfidentialite;
