import mongoose, {Schema, model} from "mongoose"

export interface MailDocument extends mongoose.Document{
    _id: string,
    from_email: string,
    to_email: string,
    subject: string,
    message: string,
    createdAt: string,
    updatedAt: string,
}

const MailSchema = new Schema<MailDocument>({
        from_email: {
            type: String,
            required: [true, "Votre email est nécessaire"],
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                "l'email est invalide",
            ],
            unique:false
        },
        to_email: {
            type: String,
            required: true
        },
        subject: {
            type: String,
            required: [true, "Veuillez choisir le sujet de votre message"],
        },
        message:{
            type: String,
            required: [true,"Le message ne peut pas etre vide"],
        },
    },
    {
        timestamps: true,
    }
);

const Mail = mongoose.models?.Mail || model<MailDocument>("Mail", MailSchema);
export default Mail;