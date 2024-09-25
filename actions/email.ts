"use server"

import { connectDB } from "@/lib/mongodb";
import Mail, { MailDocument } from '@/models/Mail';

function serializeMail(mail: MailDocument) {
    return {
        _id: mail._id.toString(),
        from_email: mail.from_email,
        to_email: mail.to_email,
        subject: mail.subject,
        message: mail.message,
        createdAt: mail.createdAt?.toString(),
        updatedAt: mail.updatedAt?.toString()
    }
}

export const addEmail = async (values: any) => {
    const {
        from_email,
        subject,
        message
    } = values;

    try {
        await connectDB();

        const mail = new Mail({
            from_email,
            subject,
            message
        });

        const savedMail = await mail.save();

        return { success: true, mail: serializeMail(savedMail) };
    } catch (err) {
        console.error(err);
        return { error: "Une erreur s'est produite lors de l'envoi de votre mail.", err };
    }
}

export const getMailById = async (id: string) => {
    try {
        await connectDB();

        if (!ObjectId.isValid(id)) {
            return { error: "ID de mail invalide" };
        }

        const mail = await Mail.findById(id);

        if (!mail) {
            return { error: "Mail non trouvé" };
        }

        return { success: true, mail: serializeMail(mail) };
    } catch (err) {
        console.error(err);
        return { error: "Une erreur s'est produite lors de la récupération du mail.", err };
    }
}
