"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image"
import Link from "next/link"
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { register } from "@/actions/register"; // Ensure this function exists and handles registration

const RegisterFormSchema = z.object({
    firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
    lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
    email: z.string().email("Adresse email invalide"),
    password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères"),
});

type RegisterFormValues = z.infer<typeof RegisterFormSchema>;

export default function RegisterPage() {
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(RegisterFormSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
        }
    });

    const onSubmit = async (values: RegisterFormValues) => {
        try {
            const res = await register({
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                password: values.password,
            });

            if (res?.error) {
                setError(res.error);
            } else {
                router.push("/auth/login");
            }
        } catch (e) {
            console.error(e);
            setError("Une erreur inattendue s'est produite");
        }
    };

    const handleGitHubSignUp = () => {
        // Implement GitHub signup logic here
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
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="firstName">Prénom</Label>
                            <Input
                                {...form.register("firstName")}
                                id="firstName"
                                required
                            />
                            {form.formState.errors.firstName && (
                                <p className="text-red-500 text-xs">{form.formState.errors.firstName.message}</p>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="lastName">Nom</Label>
                            <Input
                                {...form.register("lastName")}
                                id="lastName"
                                required
                            />
                            {form.formState.errors.lastName && (
                                <p className="text-red-500 text-xs">{form.formState.errors.lastName.message}</p>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                {...form.register("email")}
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                            />
                            {form.formState.errors.email && (
                                <p className="text-red-500 text-xs">{form.formState.errors.email.message}</p>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Mot de passe</Label>
                            <Input
                                {...form.register("password")}
                                id="password"
                                type="password"
                                required
                            />
                            {form.formState.errors.password && (
                                <p className="text-red-500 text-xs">{form.formState.errors.password.message}</p>
                            )}
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <Button type="submit" className="w-full bg-orange">
                            Créer un compte
                        </Button>
                        <Button variant="outline" className="w-full" onClick={handleGitHubSignUp}>
                            S'inscrire avec GitHub
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