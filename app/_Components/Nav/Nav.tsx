import React from 'react';
import Logo from "@/app/_Components/Nav/Logo";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { User, LogOut, SquareMenu,Settings } from "lucide-react";
import { Code } from "@/app/_Components/Code";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const Nav = () => {
    const { data: session } = useSession();

    return (
        <nav className='w-full inline-flex justify-center items-center mt-5'>
            <div className="h-full w-full inline-flex justify-center items-center">
                <div className="flex flex-1 h-full justify-start items-center">
                    <Logo/>
                </div>

                <div className="flex flex-1 h-full justify-end items-center">
                    {session ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild className={'rounded'}>
                                <Button variant="secondary" className="flex items-center gap-2">
                                    <User className="h-4 w-4" />
                                    <Code className='text-orange capitalize'>{session.user?.email}</Code>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className={'rounded border-0 '}>
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className={'cursor-pointer'}>
                                    <User className="mr-2 h-4 w-4" />
                                    <span>Profile</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem className={'cursor-pointer'}>
                                    <Settings className="mr-2 h-4 w-4" />
                                    <span>Settings</span>
                                </DropdownMenuItem>
                                {session.user?.role === 'admin' && (
                                    <DropdownMenuItem className={'cursor-pointer'}>
                                        <SquareMenu className="mr-2 h-4 w-4" />
                                        <Link href={'/admin/panel'}>Admin Panel</Link>
                                    </DropdownMenuItem>
                                )}
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => signOut()} className={'cursor-pointer'}>
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Log out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
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