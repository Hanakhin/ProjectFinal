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
            api.start({ position: [7, 0, 0] }); // Position finale (à droite de l'écran)
        }, 0);
        return () => clearTimeout(timer);
    }, [api]);

    useFrame(() => {
        if (modelRef.current) {
            modelRef.current.rotation.z += 0.008;
            modelRef.current.rotation.y += 0.008    ;

        }
    });

    return (
        <animated.primitive
            object={scene}
            ref={modelRef}
            rotation={rotation}
            {...spring}
        />
    );
}
