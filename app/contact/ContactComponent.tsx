"use client"

import React, { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from 'next/navigation'; // Importez le hook useRouter

const ContactComponent = () => {
    const { data: session } = useSession();
    const router = useRouter(); // Initialisez le router

    const [mailSubject, setMailSubject] = useState("");
    const [mailMessage, setMailMessage] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState<boolean>(false);

    const subjectOptions = [
        "J'ai une question",
        "Problème avec un achat",
        "Problème avec mon compte",
        "Autre demande"
    ];

    const handleSendMail = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!session || !session.user?.email) {
            setError("Vous devez vous connecter pour envoyer un mail.");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    from: session.user.email,
                    subject: mailSubject,
                    message: mailMessage,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to send email');
            }

            setSuccess(true);
            setMailSubject("");
            setMailMessage("");

        } catch (err) {
            console.error("Erreur lors de l'envoi du mail:", err);
            setError("Une erreur est survenue lors de l'envoi du mail.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (error || success) {
            const timeoutId = setTimeout(() => {
                setError("");
                setSuccess(false);
                router.push('/')
            }, 1000);

            return () => clearTimeout(timeoutId);
        }
    }, [error, router, success]);

    if (!session) {
        return (
            <div className="max-w-md mx-auto text-center">
                <p className="text-red-500">Vous devez vous connecter pour envoyer un mail.</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSendMail} className="max-w-md mx-auto h-full w-full flex flex-col justify-center items-center">
            <div className="relative z-0 w-full mb-5 group">
                <Select value={mailSubject} onValueChange={setMailSubject}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Choisissez le sujet" />
                    </SelectTrigger>
                    <SelectContent className={'cursor-pointer'}>
                        {subjectOptions.map((option) => (
                            <SelectItem key={option} value={option} className={'cursor-pointer'}>
                                {option}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="relative z-0 w-full mb-5 group">
                <textarea
                    name="message"
                    id="message"
                    rows={4}
                    className="block py-2.5 px-0 w-full text-sm text-foreground bg-transparent border-0 border-b-2 border-muted appearance-none focus:outline-none focus:ring-0 focus:border-primary peer resize-none"
                    placeholder=" "
                    required
                    value={mailMessage}
                    onChange={(e) => setMailMessage(e.target.value)}
                ></textarea>
                <label htmlFor="message" className="peer-focus:font-medium absolute text-sm text-muted-foreground duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Message</label>
            </div>

            <button type="submit" disabled={loading} className="text-background bg-primary focus:ring-4 focus:outline-none focus:ring-primary/50 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center inline-flex gap-2 items-center hover:bg-orange disabled:opacity-50">
                {loading ? 'Envoi en cours...' : 'Envoyer le mail'} <PaperPlaneIcon/>
            </button>

            {error && <p className="text-red-500 mt-2">{error}</p>}
            {success && <p className="text-green-500 mt-2">Message envoyé avec succès!</p>}
        </form>
    )
}

export default ContactComponent;
