import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Footer: React.FC = () => {
    return (
        <footer className="rounded-lg shadow m-4">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                        <Image src="/image/logo/Logo.svg" className="h-8" width={150} height={150} alt="GameZone Logo"/>
                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-[hsl(240,5%,64.9%)] sm:mb-0">
                        <li>
                            <Link href="/about"
                                  className="hover:underline hover:text-[hsl(22.64,100%,61.4%)] me-4 md:me-6">A
                                Propos</Link>
                        </li>
                        <li>
                            <Link href="/policies"
                                  className="hover:underline hover:text-[hsl(22.64,100%,61.4%)] me-4 md:me-6">Gestion
                                des données</Link>
                        </li>
                        <li>
                            <Link href="/terms"
                                  className="hover:underline hover:text-[hsl(22.64,100%,61.4%)] me-4 md:me-6">Termes</Link>
                        </li>
                        <li>
                            <Link href="/contact"
                                  className="hover:underline hover:text-[hsl(22.64,100%,61.4%)]">Contact</Link>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 border-[hsl(240,3.7%,15.9%)] sm:mx-auto lg:my-8"/>
                <span className="block text-sm text-[hsl(240,5%,64.9%)] sm:text-center">
                    © {new Date().getFullYear()} GameZone™. Tout droits réservés.
                </span>
                <span className="block text-sm text-[hsl(240,5%,64.9%)] sm:text-center">
                    -Site réalisé par Hanakhin Nouni-Massotte-
                </span>
            </div>
        </footer>
    );
};

export default Footer;