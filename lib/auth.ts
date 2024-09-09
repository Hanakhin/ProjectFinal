import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import type {NextAuthOptions} from "next-auth";
import credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {

    providers:[
        credentials({
            name: "Credentials",
            id: "credentials",
            credentials: {
                email: {label: "Email", type: "text"},
                password: {label: "Password", type: "password"},
            },
            async authorize(credentials) {
                await connectDB();
                const user = await User.findOne({
                    email: credentials?.email,
                }).select("+password");

                if(!user) throw new Error("Wrong Email");

                const passwordMatch = await bcrypt.compare(
                    credentials!.password,
                    user.password
                );
                if(!passwordMatch) throw new Error("Wrong Password");
                return user;
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            authorization:{
                params:{
                    prompt:"consent",
                    access_type:"offline",
                    response_type:"code"
                }
            }
        }),
    ],
    callbacks:{
        async jwt({token,user, account}){
            if(user){
                token.role = user.role;
                token.id = user.id;
            }
            if(account && account.provider === "google"){
                await connectDB();
                const existingUser = await User.findOne({email: token.email});
                if(!existingUser){
                    const newUser = await User.create({
                        email: token.email,
                        name: token.name,
                        role: 'user',
                    });
                    token.id = newUser.id;
                    token.role = newUser.role;
                }else{
                    token.id = existingUser.id;
                    token.role = existingUser.role;
                }
            }
            return token;
        },
        async session({session,token}){
            if(session.user){
                (session.user as any).role = token.role;
                (session.user as any).id = token.id
            }
            return session;
        },
    },
    session: {
        strategy:"jwt"
    },
    pages:{
        signIn:'/auth/login'
    },
    secret: process.env.AUTH_SECRET
}