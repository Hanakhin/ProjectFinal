"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image"
import Link from "next/link"
import { signIn } from "next-auth/react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const LoginFormSchema = z.object({
    email: z.string().email("Adresse email invalide"),
    password: z.string().min(1, "Le mot de passe est requis"),
});

type LoginFormValues = z.infer<typeof LoginFormSchema>;

export default function LoginPage() {
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(LoginFormSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const onSubmit = async (values: LoginFormValues) => {
        try {
            const res = await signIn("credentials", {
                email: values.email,
                password: values.password,
                redirect: false,
            });

            if (res?.error) {
                setError(res.error);
            } else if (res?.ok) {
                router.push("/");
            }
        } catch (e) {
            console.error(e);
            setError("Une erreur inattendue s'est produite");
        }
    };

    const handleGoogleLogin = () => {
        signIn("google", { callbackUrl: "/" });
    };

    return (
        <div className="w-full h-screen lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
            <div className="flex items-center justify-center py-12">
                <div className="mx-auto grid w-[350px] gap-6">
                    <div className="grid gap-2 text-center">
                        <h1 className="text-3xl font-bold">Connexion</h1>
                        <p className="text-balance text-muted-foreground">
                            Entrez votre email ci-dessous pour vous connecter à votre compte
                        </p>
                    </div>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
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
                            <div className="flex items-center">
                                <Label htmlFor="password">Mot de passe</Label>
                            </div>
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
                            Se connecter
                        </Button>
                        <Button variant="outline" className="w-full" onClick={handleGoogleLogin}>
                            Se connecter avec Google
                        </Button>
                    </form>
                    <div className="mt-4 text-center text-sm">
                        Vous n'avez pas de compte ?
                        <Link href="/auth/register" className="underline hover:text-orange ml-2">
                            S'inscrire
                        </Link>
                    </div>
                    <div className="mt-4 text-center text-sm">
                        <Link href="/" className="underline hover:text-orange">
                            Retour a la page d'acceuil
                        </Link>
                    </div>
                </div>
            </div>
            <div className="hidden bg-muted lg:block">
                <Image
                    src="/image/defaultAuth.jpg"
                    alt="Image"
                    width="1920"
                    height="1080"
                    className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </div>
    )
}