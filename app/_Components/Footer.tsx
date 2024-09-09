import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Footer: React.FC = () => {
    return (
        <footer className="rounded-lg shadow m-4">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <Link href="/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                        <Image src="/image/logo/Logo.svg" className="h-8" width={150} height={150} alt="GameZone Logo" />
                    </Link>
                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-[hsl(240,5%,64.9%)] sm:mb-0">
                        <li>
                            <Link href="/about" className="hover:underline hover:text-[hsl(22.64,100%,61.4%)] me-4 md:me-6">About</Link>
                        </li>
                        <li>
                            <Link href="/privacy-policy" className="hover:underline hover:text-[hsl(22.64,100%,61.4%)] me-4 md:me-6">Privacy Policy</Link>
                        </li>
                        <li>
                            <Link href="/terms-of-service" className="hover:underline hover:text-[hsl(22.64,100%,61.4%)] me-4 md:me-6">Terms of Service</Link>
                        </li>
                        <li>
                            <Link href="/contact" className="hover:underline hover:text-[hsl(22.64,100%,61.4%)]">Contact</Link>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 border-[hsl(240,3.7%,15.9%)] sm:mx-auto lg:my-8" />
                <span className="block text-sm text-[hsl(240,5%,64.9%)] sm:text-center">
                    © {new Date().getFullYear()} <Link href="/" className="hover:underline hover:text-[hsl(22.64,100%,61.4%)]">GameZone™</Link>. All Rights Reserved.
                </span>
            </div>
        </footer>
    );
};

export default Footer;