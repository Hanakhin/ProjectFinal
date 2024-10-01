import React from 'react';
import Link from 'next/link';

const NotFound: React.FC = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-secondary ">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-orange">404</h1>
                <h2 className="mt-4 text-2xl font-semibold text-primary">Page Not <span className={'text-orange'}>Found</span></h2>
                <p className="mt-2 text-primary">
                    Sorry, the page you are looking for does not exist.
                </p>
                <Link href="/homepage" className="mt-6 inline-block px-4 py-2 text-white bg-orange rounded hover:bg-orange/80">
                    Go to Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;