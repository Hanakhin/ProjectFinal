import React from 'react';
import ReactLoading from 'react-loading';

const LoadingSpinner: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-background">
            <ReactLoading type="spinningBubbles" color="#f97316" height={100} width={100} />
            <p className="mt-4 text-foreground text-lg font-semibold">Chargement en cours...</p>
        </div>
    );
};

export default LoadingSpinner;
