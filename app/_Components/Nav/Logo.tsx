import Link from 'next/link';
import Image from 'next/image';

const Logo = () => {
    return (
        <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-300">
            <Image
                src="/image/logo/Logo.svg"
                alt="GameStore Logo"
                width={40}
                height={40}
                className="w-10 h-10"
            />
            <h1 className="text-3xl font-tomorrow text-primary">GameFlow</h1>
        </Link>
    );
};

export default Logo;