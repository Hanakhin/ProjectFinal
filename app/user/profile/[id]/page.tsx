"use client"

import React from 'react';
import {Mail, UserIcon} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {useSession} from "next-auth/react";
import {Section} from "@/app/_Components/Section";
import Nav from "@/app/_Components/Nav/Nav";

const UserDetail = () => {

    const {data:session} = useSession()
    console.log(session?.user)
    return (
        <Section>
            <Nav/>
            <div className="max-w-7xl mx-auto px-4 py-12">
                    <div className="flex flex-col lg:flex-row">
                        <div className="lg:w-2/3 lg:pl-12">
                            <h1 className="text-4xl font-bold text-white mb-4 capitalize">{session?.user?.name}</h1>
                            <div className="grid grid-cols-2 gap-6 mb-8">
                                <div className="flex items-center">
                                    <Mail className="text-gray-400 mr-2" />
                                    <div>
                                        <p className="text-sm text-gray-400">Email</p>
                                        <p className="text-white">{session?.user?.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <UserIcon className="text-gray-400 mr-2" />
                                    <div>
                                        <p className="text-sm text-gray-400">Rôle</p>
                                        <p className="text-white">{session?.user?.role}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-row gap-4">
                                {session?.user?.role === 'admin' && (
                                    <>
                                        <Link href={`/admin/users/edit/${session?.user?._id}`}>
                                            <Button className={'hover:bg-orange'}>Modifier</Button>
                                        </Link>
                                        <Button onClick={() => handleDeleteUser(session?.user?._id)} className={'hover:bg-red-600'}>Supprimer</Button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
        </Section>
    );
};

export default UserDetail;
