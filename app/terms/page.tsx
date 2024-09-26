"use client"

import React from 'react';
import { Section } from "@/app/_Components/Section";
import Nav from "@/app/_Components/Nav/Nav";
import {Spacing} from "@/app/_Components/Spacing";

const ConditionsUtilisation: React.FC = () => {
    return (
        <Section>
            <Nav/>
            <Spacing/>
            <div className="max-w-4xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-[hsl(0,0%,98%)] mb-6">Conditions d'Utilisation</h1>
                <div className="space-y-6 text-[hsl(240,5%,64.9%)]">
                    <p>
                        Bienvenue sur <span className="text-orange font-semibold">GameZone</span>. En utilisant notre service, vous acceptez ces conditions. Veuillez les lire attentivement.
                    </p>
                    <h2 className="text-2xl font-semibold text-[hsl(0,0%,98%)] mt-4 mb-2">Utilisation du Service</h2>
                    <p>
                        Vous devez suivre toutes les politiques mises à votre disposition dans le cadre des Services. N'utilisez pas nos Services de manière abusive.
                    </p>
                    <h2 className="text-2xl font-semibold text-[hsl(0,0%,98%)] mt-4 mb-2">Votre Compte GameZone</h2>
                    <p>
                        Vous pourriez avoir besoin d'un compte GameZone pour utiliser certains de nos Services. Vous êtes responsable du maintien de la sécurité de votre compte.
                    </p>
                    <h2 className="text-2xl font-semibold text-[hsl(0,0%,98%)] mt-4 mb-2">Contenu dans les Services</h2>
                    <p>
                        N'utilisez pas de contenu provenant de nos Services à moins d'avoir obtenu l'autorisation du propriétaire ou d'être autrement autorisé par la loi.
                    </p>
                    <h2 className="text-2xl font-semibold text-[hsl(0,0%,98%)] mt-4 mb-2">Modification et Résiliation de nos Services</h2>
                    <p>
                        Nous modifions et améliorons constamment nos Services. Nous pouvons ajouter ou supprimer des fonctionnalités, et nous pouvons suspendre ou arrêter complètement un Service.
                    </p>
                </div>
            </div>
        </Section>
    );
};

export default ConditionsUtilisation;
