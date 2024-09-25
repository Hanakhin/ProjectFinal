import React, { useMemo } from 'react';
import Logo from "@/app/_Components/Nav/Logo";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { User, LogOut, SquareMenu, Settings, ShoppingBasket } from "lucide-react";
import { Code } from "@/app/_Components/Code";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useCart } from "@/app/contexts/CartContext";

const Nav = () => {
    const { cart } = useCart();
    const { data: session } = useSession();

    // Utiliser useMemo pour optimiser le calcul du nombre d'articles dans le panier
    const cartItemCount = useMemo(() => cart?.games?.length || 0, [cart]);

    return (
        <nav className='w-full inline-flex justify-center items-center mt-5'>
            <div className="h-full w-full inline-flex justify-center items-center">
                <div className="flex flex-1 h-full justify-start items-center">
                    <Logo/>
                </div>

                <div className="flex flex-1 h-full justify-end items-center">
                    {session ? (
                        <div className="flex items-center gap-4">
                            {cartItemCount > 0 && (
                                <Link href={`/cart/${session?.user?.id}`}>
                                    <div className="relative">
                                        <ShoppingBasket className="h-6 w-6 text-primary"/>
                                        <span className="absolute -top-2 -right-2 bg-orange text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                            {cartItemCount}
                                        </span>
                                    </div>
                                </Link>
                            )}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild className={'rounded'}>
                                    <Button variant="secondary" className="flex items-center gap-2">
                                        <User className="h-4 w-4"/>
                                        <Code className='text-orange capitalize'>{session.user?.email}</Code>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className={'rounded border-0 '}>
                                    <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
                                    <DropdownMenuSeparator />

                                    <Link href={`/user/profile/${session?.user?.id}`}>
                                        <DropdownMenuItem className={'cursor-pointer'}>
                                            <User className="mr-2 h-4 w-4" />
                                            Profil
                                        </DropdownMenuItem>
                                    </Link>

                                    <DropdownMenuItem className={'cursor-pointer'}>
                                        <Settings className="mr-2 h-4 w-4" />
                                        <span>Paramètres</span>
                                    </DropdownMenuItem>

                                    {session.user?.role === 'admin' && (
                                        <Link href={'/admin/panel'}>
                                            <DropdownMenuItem className={'cursor-pointer'}>
                                                <SquareMenu className="mr-2 h-4 w-4" />
                                                Administrateur
                                            </DropdownMenuItem>
                                        </Link>
                                    )}
                                    <Link href={`/cart/${session?.user?.id}`}>
                                        <DropdownMenuItem className={'cursor-pointer'}>
                                            <ShoppingBasket className={'mr-2 h-4 w-4'}/>
                                            Panier
                                        </DropdownMenuItem>
                                    </Link>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => signOut()} className={'cursor-pointer '}>
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span className={"hover:text-red-700"}>Se déconnecter</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    ) : (
                        <div className={'inline-flex gap-4'}>
                            <Link href="/auth/register">
                                <Button className='rounded hover:bg-orange'>Register</Button>
                            </Link>
                            <Link href="/auth/login">
                                <Button className='rounded hover:bg-orange'>Login</Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Nav;