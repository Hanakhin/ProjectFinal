import mongoose, { model, Schema, Document } from "mongoose";

export interface CartDocument extends Document {
    _id: string;
    games: mongoose.Types.ObjectId[]; // Tableau d'ObjectIds référant les jeux
    user: mongoose.Types.ObjectId; // ObjectId référant l'utilisateur
    totalPrice: number;
    createdAt: Date;
    updatedAt: Date;
}

const CartSchema = new Schema<CartDocument>({
    games: [{
        type: Schema.Types.ObjectId,
        ref: "Game", // Référence au modèle Game
        required: true
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: "User", // Référence au modèle User
        unique: true, // Un utilisateur ne peut avoir qu'un seul panier
        required: true
    },
    totalPrice: {
        type: Number,
        default: 0, // Initialisation par défaut à 0
    },
}, { timestamps: true }); // Ajoute createdAt et updatedAt automatiquement

// Middleware pour calculer le prix total avant de sauvegarder
CartSchema.pre<CartDocument>("save", async function (next) {
    // Suppose que chaque jeu a un champ `price`
    const gameIds = this.games;
    const games = await mongoose.model('Game').find({ _id: { $in: gameIds } }).select('price');

    this.totalPrice = games.reduce((acc, game) => acc + game.price, 0);
    next();
});

const Cart = mongoose.models?.Cart || model<CartDocument>("Cart", CartSchema);
export default Cart;
