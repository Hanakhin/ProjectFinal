import mongoose, { model, Schema } from "mongoose";

export interface GameDocument extends mongoose.Document {
    _id:string;
    title: string;
    description: string;
    imagePath: string;
    price: number;
    createdAt: Date;
    updatedAt: Date;
    category: [string];
    pegi:string;
    gameMode:[string]
    language: string;
    studio:string
    platform:[string]
}

const GameSchema = new Schema<GameDocument>({
    title: {
        type: String,
        unique: true,
        required: [true, "Title is required"],
    },
    description: {
        type: String,
        required: [true, "Description is required"],
    },
    imagePath: {
        type: String,
        default: "",
    },
    category: {
        type: [String],
        required: [true, "Category is required"],
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
    },
    pegi: {
        type: String,
        required: [true, 'PEGI rating is required'],
    },
    gameMode: {
        type: [String],
        required: [true, 'Game mode is required'],
    },
    language: {
        type: String,
        required: [true, 'Language is required'],
    },
    studio: {
        type: String,
        required: [true, 'Studio is required'],
    },
    platform: {
        type: [String],
        required: [true, 'Platform is required'],
    },
}, { timestamps: true });

const Game = mongoose.models?.Game || model<GameDocument>("Game", GameSchema);
export default Game;