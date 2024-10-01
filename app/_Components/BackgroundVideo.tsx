import React from 'react';

const BackgroundVideo = ({ src }) => {
    return (
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <video
                className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 object-cover"
                autoPlay
                loop
                muted
                playsInline
            >
                <source src={src} type="video/mp4" />
                Votre navigateur ne supporte pas la vidéo HTML5.
            </video>
        </div>
    );
};

export default BackgroundVideo;
