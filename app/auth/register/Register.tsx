"use client"

import {FormEvent, useState} from "react";
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { register } from "@/actions/register";
import {useRouter} from "next/navigation";

export default function RegisterPage() {
    const [error, setError] = useState<string | null>(null);

    const [pseudo, setPseudo] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [success,setSuccess] = useState<boolean>(false);
    const [loading,setLoading] = useState<boolean | null>(null);
    const [showMessage, setShowMessage] = useState<boolean>(false);
    const router = useRouter();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await register({
                name: pseudo,
                email,
                password,
            });

            if (res?.error) {
                console.error('Registration error:', res.error);
                setError(res.error);
                setSuccess(false);
                setShowMessage(true);
            } else {
                setSuccess(true);
                setError(null);
                setShowMessage(true);
            }
        } catch (error) {
            console.error('Unexpected error during registration:', error);
            setError('An unexpected error occurred. Please try again.');
            setSuccess(false);
            setShowMessage(true);
        } finally {
            setLoading(false);
            router.push('/login')
            if (showMessage) {
                setTimeout(() => {
                    setShowMessage(false);
                }, 2000);
            }
        }
    };

    return (
        <div className="w-full h-screen lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
            <div className="hidden bg-muted lg:block">
                <Image
                    src="/image/defaultAuth.jpg"
                    alt="Image"
                    width="1920"
                    height="1080"
                    className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
            <div className="flex items-center justify-center py-12">
                <div className="mx-auto grid w-[350px] gap-6">
                    <div className="grid gap-2 text-center">
                        <h1 className="text-3xl font-bold">Inscription</h1>
                        <p className="text-balance text-muted-foreground">
                            Entrez vos informations ci-dessous pour créer votre compte
                        </p>
                    </div>
                    <form onSubmit={handleSubmit} className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="firstName">Prénom</Label>
                            <Input
                                onChange={e => setPseudo(e.target.value)}
                                id="pseudo"
                                name="pseudo"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                onChange={e => setEmail(e.target.value)}
                                id="email"
                                type="email"
                                name="email"
                                placeholder="m@example.com"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Mot de passe</Label>
                            <Input
                                onChange={e => setPassword(e.target.value)}
                                id="password"
                                type="password"
                                name="password"
                                required
                            />
                        </div>
                        {showMessage && (
                            <p className={success ? 'text-green-500' : 'text-red-500'}>
                                {success ? 'Compte créé avec succès !' : error}
                            </p>
                        )}
                        {loading && <p className="text-orange">Veuillez patientez..</p> }
                        <Button type="submit" className="w-full bg-orange">
                            Créer un compte
                        </Button>
                    </form>
                    <div className="mt-4 text-center text-sm">
                        Vous avez déjà un compte ?
                        <Link href="/auth/login" className="underline hover:text-orange ml-2">
                            Se connecter
                        </Link>
                    </div>
                    <div className="mt-4 text-center text-sm">
                        <Link href="/" className="underline hover:text-orange">
                            Retour à la page d'accueil
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}