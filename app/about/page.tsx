"use client"

import React from 'react';
import { Section } from "@/app/_Components/Section";
import { Gamepad, Users, Shield, Star } from 'lucide-react';
import Nav from "@/app/_Components/Nav/Nav";
import {Spacing} from "@/app/_Components/Spacing";

const About: React.FC = () => {
    return (
        <Section>
            <Nav/>
            <Spacing/>
            <div className="max-w-4xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-[hsl(0,0%,98%)] mb-6">About GameZone</h1>
                <div className="space-y-6 text-[hsl(240,5%,64.9%)]">
                    <p>
                        Welcome to <span className="text-orange font-semibold">GameZone</span>, your ultimate destination for all things gaming. Founded in 2023, we're passionate about bringing the best gaming experiences to our community.
                    </p>
                    <p>
                        Our mission is to create a space where gamers of all levels can discover new titles, connect with fellow enthusiasts, and stay up-to-date with the latest in gaming technology and trends.
                    </p>
                    <h2 className="text-2xl font-semibold text-[hsl(0,0%,98%)] mt-4 mb-2">What We Offer</h2>
                    <ul className="list-disc list-inside pl-4 space-y-2">
                        <li className="flex items-center">
                            <Gamepad className="w-5 h-5 text-orange mr-2" />
                            A curated selection of top-rated games
                        </li>
                        <li className="flex items-center">
                            <Star className="w-5 h-5 text-orange mr-2" />
                            Expert reviews and recommendations
                        </li>
                        <li className="flex items-center">
                            <Users className="w-5 h-5 text-orange mr-2" />
                            A vibrant community forum
                        </li>
                        <li className="flex items-center">
                            <Shield className="w-5 h-5 text-orange mr-2" />
                            Exclusive deals and promotions
                        </li>
                    </ul>
                    <p>
                        Join us in our journey to make gaming more accessible, enjoyable, and rewarding for everyone.
                    </p>
                </div>
            </div>
        </Section>
    );
};

export default About;