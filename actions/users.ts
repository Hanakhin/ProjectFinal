"use server"

import {connectDB} from "@/lib/mongodb";
import User,{UserDocument} from '@/models/User'

export async function getUsers(): Promise<Partial<UserDocument>[] | null>{
    try {
        await connectDB()
        const allUsers = await User.find()

        if (allUsers && allUsers.length > 0) {
            console.log('utilisateurs trouvés',allUsers.length)

            return allUsers.map(user => ({
                _id: user._id.toString(),
                name: user.name,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt?.toISOString(),
                updatedAt: user.updatedAt?.toISOString()
            }));
        } else {
            console.log('aucun utilisateur trouvé');
            return null
        }
    }catch(err){
        console.log('erreur lors de la recuperation des utilisateurs:', err);
        throw err;
    }
}

export async function deleteUser(_id: string): Promise<{ success?: boolean; error?: string }> {
    try {
        await connectDB();
        const user = await User.findById(_id);

        if (user) {
            await user.deleteOne();
            return { success: true };
        } else {
            return { error: "Aucun utilisateur trouvé à supprimer" };
        }
    } catch (err) {
        console.error("Erreur lors de la suppression de l'utilisateur:", err);
        return { error: "Une erreur est survenue lors de la suppression de l'utilisateur" };
    }
}
export async function getOneUser(_id: string): Promise<{ user?: any; error?: string }> {
    try {
        await connectDB();
        const user = await User.findById(_id);

        if (user) {
            return { user: user.toObject() };
        } else {
            return { error: "Aucun utilisateur trouvé" };
        }
    } catch (err) {
        console.error("Erreur lors de la récupération de l'utilisateur:", err);
        return { error: "Une erreur est survenue lors de la récupération de l'utilisateur" };
    }
}
