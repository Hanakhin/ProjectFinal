"use client"


import React, { useState, useEffect } from 'react';
import { Section } from "@/app/_Components/Section";
import {User, Mail, ShieldCheck, Clock, AlertTriangle, Trash} from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import {deleteUser, getUsers} from "@/actions/users";
import Modal from "@/app/_Components/modal/CartConfirmationModal";

interface UserType {
    _id: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
}

const Users: React.FC = () => {
    const [users, setUsers] = useState<UserType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [user,setUser] = useState<UserType | null>(null);
    const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                // Assurez-vous que getUsers() retourne Promise<UserType[]>
                const fetchedUsers = await getUsers();
                setUsers(fetchedUsers);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch users');
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const formatDate = (dateString: string): string => {
        try {
            return format(parseISO(dateString), 'dd MMMM yyyy', { locale: fr });
        } catch (error) {
            console.error('Error formatting date:', error);
            return 'Date invalide';
        }
    };

    const handleDelete = async() =>{
        if(!selectedUser)return;
        try{
            const res = await deleteUser(selectedUser._id);
            if(res.success){
                setUsers((prevUsers) => prevUsers.filter(user => user._id !== selectedUser._id));
                setShowModal(false)
            }else{
                setError('Failed to delete user');
            }
        }catch (err){
            console.log(err);
            setError('Failed to delete user');
        }
    }

    if (loading) return <Section><p>Loading users...</p></Section>;
    if (error) return <Section><p>Error: {error}</p></Section>;

    return (
        <Section>
            <h1 className="text-2xl font-bold mb-6 text-[hsl(0,0%,98%)]">Gestion des utilisateurs</h1>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-[hsl(240,5%,64.9%)]">
                    <thead className="text-xs uppercase bg-[hsl(240,3.7%,15.9%)] text-[hsl(0,0%,98%)]">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">
                                Username
                                <User className="w-3 h-3 ms-1.5" />
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">
                                Email
                                <Mail className="w-3 h-3 ms-1.5" />
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">
                                Role
                                <ShieldCheck className="w-3 h-3 ms-1.5" />
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">
                                Created At
                                <Clock className="w-3 h-3 ms-1.5" />
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <span className="sr-only">Edit</span>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user) => (
                        <tr key={user._id} className="bg-[hsl(240,10%,3.9%)] border-b border-[hsl(240,3.7%,15.9%)]">
                            <th scope="row" className="px-6 py-4 font-medium text-[hsl(0,0%,98%)] whitespace-nowrap">
                                {user.name}
                            </th>
                            <td className="px-6 py-4">
                                {user.email}
                            </td>
                            <td className="px-6 py-4">
                                {user.role}
                            </td>
                            <td className="px-6 py-4">
                                {formatDate(user.createdAt)}
                            </td>
                            <td className="px-6 py-4 text-right">
                                <button onClick={()=>{
                                    setSelectedUser(user);
                                    setShowModal(true)
                                }}> <Trash className={'text-primary hover:text-red-600'}/></button>
                                <Modal
                                    isOpen={showModal}
                                    onClose={() => setShowModal(false)}
                                    onConfirm={handleDelete}
                                    title="Confirmer la suppression"
                                >
                                    <div className="text-center">
                                        <AlertTriangle className="mx-auto mb-4 text-red-400 w-14 h-14" />
                                        <p className="text-primary flex flex-col gap-2">
                                            Êtes-vous sûr de vouloir supprimer <span className={'text-orange text-xl'}>{selectedUser?.email}</span> ?
                                        </p>
                                    </div>
                                </Modal>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </Section>
    );
};

export default Users;