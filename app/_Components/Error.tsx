import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
    message: string;
}

const Error: React.FC<ErrorMessageProps> = ({ message }) => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-background">
            <div className="bg-destructive/10 border-2 border-destructive text-destructive px-4 py-3 rounded-lg max-w-md w-full">
                <div className="flex items-center">
                    <AlertCircle className="h-6 w-6 mr-2" />
                    <p className="font-semibold">Une erreur est survenue</p>
                </div>
                <p className="mt-2">{message}</p>
            </div>
            <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
            >
                Réessayer
            </button>
        </div>
    );
};

export default Error;
