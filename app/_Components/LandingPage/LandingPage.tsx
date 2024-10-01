"use client"

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import Model3D from '../3dLogo';
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import BackgroundVideo from "@/app/_Components/BackgroundVideo";
function LandingPage() {
    return (
        <div className="relative w-screen h-screen overflow-hidden bg-[#0a0a0a]">
            <BackgroundVideo src="/video/bg.mp4" />
            <div className="absolute top-0 left-0 w-full h-full flex items-center z-10">
                <div className="ml-[5%] text-[#e0e0e0] flex flex-col p-4 animate-slide-fade-in">
                    <h1 className="text-5xl mb-4 flex gap-4 font-orbitron">Bienvenue sur GameZone</h1>
                    <Link href={'/homepage'} className={'w-fit'}>
                        <button className="px-5 py-2.5 text-lg bg-[hsl(0,0%,98%)]/20 backdrop-blur-md border border-[hsl(0,0%,98%)]/30 text-[hsl(0,0%,98%)] rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:bg-orange/50 inline-flex items-center justify-center">
                            Get Started <ArrowRight />
                        </button>
                    </Link>
                </div>
            </div>
            <Canvas className="absolute top-0 left-0 w-full h-full">
                <PerspectiveCamera makeDefault position={[0, 0, 15]} />
                <ambientLight intensity={1} />
                <directionalLight intensity={1} position={[10, 10, 5]} />
                <pointLight intensity={1} position={[-10, -10, -5]} />
                <Suspense fallback={null}>
                    <Model3D
                        rotation={[Math.PI / -2, 0, 0]}
                    />
                </Suspense>
            </Canvas>
        </div>
    );
}

export default LandingPage;
