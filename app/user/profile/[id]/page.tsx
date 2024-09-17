"use client"

import React, { useState } from 'react';
import { Mail, UserIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { Section } from "@/app/_Components/Section";
import Nav from "@/app/_Components/Nav/Nav";
import { deleteUser } from "@/actions/users";
import DeleteUserModal from '@/app/_Components/modal/UserConfirmationModal';

const UserDetail = () => {
    const { data: session } = useSession();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();



    const handleDeleteUser = () => {
        setIsModalOpen(true);
    };

    const confirmDeleteUser = async () => {
        if (!session?.user?.id) {
            console.error("Aucun utilisateur connecté ou ID utilisateur manquant");
            return;
        }

        try {
            await deleteUser(session.user.id);
            setIsModalOpen(false);
            // La redirection et le toast seront gérés dans le modal
        } catch (error) {
            console.error("Erreur lors de la suppression de l'utilisateur:", error);
        }
    };

    const handleRedirect = () => {
        router.push('/');
    };

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
                                    <Link href={`/admin/users/edit/${session?.user?.id}`}>
                                        <Button className={'hover:bg-orange'}>Modifier</Button>
                                    </Link>
                                    <Button onClick={handleDeleteUser} className={'hover:bg-red-600'}>Supprimer</Button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <DeleteUserModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={confirmDeleteUser}
                onRedirect={handleRedirect}
            />
        </Section>
    );
};

export default UserDetail;
