import React from 'react';
import { Section } from "@/app/_Components/Section";
import { AlertTriangle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";

const Unauthorized: React.FC = () => {
    return (
        <Section>
            <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
                <AlertTriangle className="w-20 h-20 text-orange mb-6" />
                <h1 className="text-4xl font-bold text-[hsl(0,0%,98%)] mb-4">
                    Acces refusé
                </h1>
                <p className="text-xl text-[hsl(240,5%,64.9%)] mb-8 max-w-md">
                    Oops! Vous n'avez pas le droit d'acceder a cette page..
                </p>
                <div className="space-y-4">
                    <p className="text-[hsl(240,5%,64.9%)]">
                       Si vous pensez que c'est une erreur, contactez notre support.
                    </p>
                    <Link href="/">
                        <Button className="mt-4 inline-flex items-center text-[hsl(0,0%,98%)] bg-orange hover:bg-orange/90">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Retour a la page d'acceuil
                        </Button>
                    </Link>
                </div>
            </div>
        </Section>
    );
};

export default Unauthorized;