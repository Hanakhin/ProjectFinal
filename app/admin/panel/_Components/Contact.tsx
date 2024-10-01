"use client"

import React, { useEffect, useState } from 'react';
import { Section } from "@/app/_Components/Section";
import {Mail, MessageCircle, Calendar, MoreHorizontal, TextSelect} from 'lucide-react';
import { getMails } from "@/actions/email";
import LoadingSpinner from "@/app/_Components/LoadingSpinner"; // Import your server action

const Contact: React.FC = () => {
    const [emailData, setEmailData] = useState([]); // Initialize as an array to hold email data
    const [error, setError] = useState<string | null>(null); // State to handle errors
    const [loading, setLoading] = useState<boolean>(true); // State to handle loading status

    useEffect(() => {
        const fetchEmails = async () => {
            try {
                const response = await getMails(); // Call the server action to fetch emails
                if (response?.success) {
                    setEmailData(response.emails); // Set email data if successful
                } else {
                    setError(response?.error); // Set error message if no emails found
                }
            } catch (e) {
                console.error("Error fetching emails:", e);
                setError("Une erreur est survenue lors de la récupération des emails."); // Set error state
            } finally {
                setLoading(false); // Set loading to false after the operation completes
            }
        };
        fetchEmails(); // Call the async function
    }, []);

    if (loading) return <Section><LoadingSpinner/>git </Section>;
    if (error) return <Section><p>{error}</p></Section>;

    return (
        <Section>
            <h1 className="text-2xl font-bold mb-6 text-[hsl(0,0%,98%)]">Gestion des Emails</h1>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-[hsl(240,5%,64.9%)]">
                    <thead className="text-xs uppercase bg-[hsl(240,3.7%,15.9%)] text-[hsl(0,0%,98%)]">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">
                                Expéditeur
                                <Mail className="w-4 h-4 ms-1"/>
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">
                                Sujet
                                <TextSelect className="w-4 h-4 ms-1"/>
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">
                                Message
                                <MessageCircle className="w-4 h-4 ms-1"/>
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">
                                Date
                                <Calendar className="w-4 h-4 ms-1"/>
                            </div>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {emailData.map((email) => (
                        <tr key={email._id} className="bg-[hsl(240,10%,3.9%)] border-b border-[hsl(240,3.7%,15.9%)]">
                            <td className="px-6 py-4 font-medium text-[hsl(0,0%,98%)] whitespace-nowrap">{email.from_email}</td>
                            <td className="px-6 py-4">{email.subject}</td>
                            <td className="px-6 py-4">{email.message}</td>
                            <td className="px-6 py-4">{new Date(email.createdAt).toLocaleDateString("fr-FR")}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </Section>
    );
};

export default Contact;
