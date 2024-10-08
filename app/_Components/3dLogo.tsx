"use client"

import {useFrame} from "@react-three/fiber";
import React, {useRef} from "react";
import {useGLTF} from "@react-three/drei";
import {useSpring, animated} from "@react-spring/three";

export default function Model3D({ rotation = [0, 0, 0] }) {
    const modelRef = useRef();
    const { scene } = useGLTF('/3d/model/logoGameZone.glb');

    const [spring, api] = useSpring(() => ({
        position: [30, 0, 0], // Position initiale (hors écran à droite)
        config: { mass: 1, tension: 280, friction: 60 }
    }));

    React.useEffect(() => {
        const timer = setTimeout(() => {
            api.start({ position: [6, 0, 0] }); // Position finale (à droite de l'écran)
        }, 0);
        return () => clearTimeout(timer);
    }, [api]);

    useFrame((state) => {
        if (modelRef.current) {
            // Calculer la rotation en fonction du temps
            const time = state.clock.getElapsedTime();
            const rotationAmplitude = Math.PI / 6; // 30 degrés

            // Appliquer une rotation sinusoïdale sur l'axe Y
            modelRef.current.rotation.y += 0.008;

            // Fixer la rotation sur l'axe X
            modelRef.current.rotation.x = 0;

            // Fixer la position Y (hauteur)
            modelRef.current.position.y = 0;
            modelRef.current.rotation.z = 1.5708;
        }
    });

    return (
        <animated.mesh ref={modelRef} position={spring.position}>
            <primitive object={scene} />
        </animated.mesh>
    );
}
