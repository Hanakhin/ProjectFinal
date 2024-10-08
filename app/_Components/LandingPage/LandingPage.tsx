"use client"

import React, { Suspense, useState, useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Stars } from '@react-three/drei';
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import Model3D from '../3dLogo';
import BackgroundVideo from "@/app/_Components/BackgroundVideo";

// Composant pour le système de particules
const ParticleSystem = ({ count = 5000 }) => {
    const particles = useRef();

    const particlesPosition = useMemo(() => {
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 20;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
        }
        return positions;
    }, [count]);

    useFrame((state, delta) => {
        for (let i = 0; i < count; i++) {
            particles.current.geometry.attributes.position.array[i * 3 + 1] -= delta * 0.1;
            if (particles.current.geometry.attributes.position.array[i * 3 + 1] < -10) {
                particles.current.geometry.attributes.position.array[i * 3 + 1] = 10;
            }
        }
        particles.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <points ref={particles}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particlesPosition.length / 3}
                    array={particlesPosition}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial size={0.02} color="#f97316" sizeAttenuation transparent opacity={0.6} />
        </points>
    );
};

// Composant pour le compteur
const Counter = ({ value, label }) => (
    <div className="text-center">
        <div className="text-4xl font-bold text-[hsl(0,0%,98%)]">{value}</div>
        <div className="text-sm opacity-75 text-[hsl(240,5%,64.9%)]">{label}</div>
    </div>
);

function LandingPage() {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="relative w-screen min-h-screen overflow-x-hidden bg-gradient-to-b from-[hsl(240,10%,3.9%)] to-[hsl(240,3.7%,15.9%)]">
            <BackgroundVideo src="/video/bg.mp4" />

            <div className="absolute top-0 left-0 w-full min-h-screen flex justify-between items-center z-10">
                <div className="text-[hsl(0,0%,98%)] flex flex-col items-start p-4 animate-slide-fade-in ml-16 max-w-2xl">
                    <h1 className="text-6xl mb-4 font-orbitron text-left text-primary">
                        Bienvenue sur GameZone
                    </h1>
                    <p className="text-xl mb-8 text-left text-[hsl(240,5%,64.9%)]">
                        Plongez dans l'univers du gaming Web3 et découvrez une nouvelle ère de jeux décentralisés.
                    </p>
                    <Link href={'/homepage'} className={'w-fit'}>
                        <button className="px-8 py-4 text-lg bg-orange text-primary rounded-full transition-all duration-100 hover:bg-orange/80 inline-flex justify-center items-center">
                            Commencer ! <ArrowRight className="ml-2" />
                        </button>
                    </Link>

                    <div className="mt-16 grid grid-cols-3 gap-8">
                        <Counter value="100K+" label="Joueurs" />
                        <Counter value="500+" label="Jeux NFT" />
                        <Counter value="1M+" label="Transactions" />
                    </div>
                </div>
            </div>

            <Canvas style={{height:'100vh'}}>
                <PerspectiveCamera makeDefault position={[0, 0, 15]} />
                <ambientLight intensity={0.5} />
                <directionalLight intensity={1} position={[10, 10, 5]} />
                <pointLight intensity={1} position={[10, 10, -5]} />
                <Suspense fallback={null}>
                    <Model3D />
                    <ParticleSystem count={3000} />
                </Suspense>
                <Stars />
            </Canvas>
        </div>
    );
}

export default LandingPage;
