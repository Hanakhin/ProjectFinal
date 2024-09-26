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
        to_email,
        from_email,
        subject,
        message
    } = values;

    try {
        await connectDB();

        const mail = new Mail({
            to_email,
            from_email,
            subject,
            message
        });

        const savedMail = await mail.save();
        const serialized = serializeMail(savedMail);

        return { success: true, mail: serialized };
    } catch (err) {
        console.error(err);
        return { error: "Une erreur s'est produite lors de l'envoi de votre mail.", err };
    }
}

export const getMails = async () => {
    await connectDB();

    try {
        const emails = await Mail.find(); // Fetch emails from the database

        if (emails.length > 0) {
            // Serialize each email before returning
            const serializedEmails = emails.map(serializeMail);
            return { success: true, emails: serializedEmails }; // Return serialized emails
        }

        return { success: false, error: "Aucun email" }; // Return error if no emails are found
    } catch (err) {
        console.error(err);
        return { success: false, error: "Une erreur est survenue lors de la récupération des emails." }; // Return a user-friendly error message
    }
}

