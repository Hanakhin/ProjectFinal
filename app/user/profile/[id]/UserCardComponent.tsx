import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { User, Mail, Briefcase, Edit, Trash } from 'lucide-react';

export function UserProfileCard() {
    const { data: session } = useSession();
    const defaultAvatar = '/image/avatar/default.svg';

    return (
        <Card className="w-full max-w-3xl bg-background text-[hsl(0,0%,98%)] border-none">
            <CardHeader className="bg-background p-6 border-b-primary border-b">
                <div className="flex items-center space-x-4">
                    <Avatar className="w-24 h-24">
                        <AvatarImage src={session?.user?.image || defaultAvatar} alt={session?.user?.name || "User"} />
                        <AvatarFallback>{session?.user?.name?.[0] || "avatar"}</AvatarFallback>
                    </Avatar>
                    <div>
                        <CardTitle className="text-2xl font-bold">{session?.user?.name}</CardTitle>
                        <p className="text-orange">{session?.user?.role}</p>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                        <Mail className="text-[hsl(0,0%,98%)]" />
                        <div>
                            <h6 className="font-semibold">Email</h6>
                            <p className="text-[hsl(240,5%,64.9%)]">{session?.user?.email}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Briefcase className="text-[hsl(0,0%,98%)]" />
                        <div>
                            <h6 className="font-semibold">Rôle</h6>
                            <p className="text-[hsl(240,5%,64.9%)] capitalize">{session?.user?.role}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <User className="text-[hsl(0,0%,98%)]" />
                        <div>
                            <h6 className="font-semibold">ID Utilisateur</h6>
                            <p className="text-[hsl(240,5%,64.9%)]">{session?.user?.id}</p>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex justify-between">
                    <Link href={`/admin/users/edit/${session?.user?.id}`}>
                        <Button variant="outline" className="flex items-center space-x-2 bg-[hsl(240,3.7%,15.9%)] text-[hsl(0,0%,98%)] hover:bg-[hsl(0,0%,98%)] hover:text-[hsl(240,5.9%,10%)] transition-colors duration-300">
                            <Edit size={16} /> <span>Modifier</span>
                        </Button>
                    </Link>
                    <Button className="flex items-center space-x-2 bg-[hsl(0,62.8%,30.6%)] text-[hsl(0,0%,98%)] hover:bg-[hsl(22.64,100%,61.4%)] transition-colors duration-300">
                        <Trash size={16} /> <span>Supprimer</span>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}