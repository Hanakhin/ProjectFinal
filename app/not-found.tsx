import React from "react";
import Link from "next/link";


const NotFound : React.FC = () => {
    return (
        <div className={'flex flex-col h-screen w-screen justify-center items-center'}>
            <Link href={'/'} >
                NOT FOUND, <span className={'hover:text-destructive'}>RETOUR</span>
            </Link>
        </div>
    )
}

export default NotFound;