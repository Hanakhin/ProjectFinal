"use client"


import React, { useState, useEffect } from 'react';
import { Section } from "@/app/_Components/Section";
import { User, Mail, ShieldCheck, Clock, Edit } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import {getUsers} from "@/actions/users";

interface UserType {
    id: number;
    name: string;
    email: string;
    role: string;
    createdAt: string;
}

const Users: React.FC = () => {
    const [users, setUsers] = useState<UserType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

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

    if (loading) return <Section><p>Loading users...</p></Section>;
    if (error) return <Section><p>Error: {error}</p></Section>;

    return (
        <Section>
            <h1 className="text-2xl font-bold mb-6 text-[hsl(0,0%,98%)]">User Management</h1>
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
                        <tr key={user.id} className="bg-[hsl(240,10%,3.9%)] border-b border-[hsl(240,3.7%,15.9%)]">
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
                                <a href="#" className="font-medium text-[hsl(22.64,100%,61.4%)] hover:underline">
                                    <Edit className="w-4 h-4 inline" />
                                </a>
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