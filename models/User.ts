import mongoose, {Schema, model} from "mongoose"

export interface UserDocument extends mongoose.Document{
    _id: string,
    name: string,
    email: string,
    password: string,
    role:string,
    image: string
    createdAt: Date,
    updatedAt: Date
}

const UserSchema = new Schema<UserDocument>({
        email: {
            type: String,
            unique: true,
            required: [true, "Email is required"],
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                "Email is invalid",
            ],
        },
        password: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: [true, "Name is required"]
        },
        role:{
            type: String,
            enum:['user','admin'],
            default: 'user',
        },
        image:{
            type: String,
            default: "/images/avatar.png",
        }
    },
    {
        timestamps: true,
    }
);

const User = mongoose.models?.User || model<UserDocument>("User", UserSchema);
export default User;