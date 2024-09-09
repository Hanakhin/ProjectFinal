import Link from 'next/link';
import Image from 'next/image';

const Logo = () => {
    return (
        <Link href="/" className="flex flex-col items-center space-x-2 hover:opacity-80 transition-opacity duration-300 ">
            <Image
                src="/image/logo/test.svg"
                alt="GameStore Logo"
                width={250}
                height={250}
                className="w-100 h-100"
            />
            <h2 className={'text-xs text-orange/80 self-end'}>Vos jeux aux meilleurs prix !</h2>
        </Link>
    );
};

export default Logo;