// components/GameImage.tsx
import React from 'react';
import Image from 'next/image';

interface GameImageProps {
    src: string;
    alt: string;
    sizes?: string;
    priority?: boolean;
    aspectRatio?: string;
}

const GameImage: React.FC<GameImageProps> = ({ src, alt, sizes, priority, aspectRatio = '16 / 9' }) => {
    return (
        <div className="relative w-full h-auto" style={{ aspectRatio }}>
            <Image
                src={src}
                alt={alt}
                fill
                style={{ objectFit: 'cover' }}
                sizes={sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
                priority={priority}
            />
        </div>
    );
};

export default GameImage;
