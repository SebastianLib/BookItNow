import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import  db  from "./db";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db),
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt"
    },
    pages: {
        signIn: "/"
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "email", type: "email", placeholder: "jsmith@gmail.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {

                if (!credentials?.email || !credentials?.password) {
                    return null
                }

                const existingUser = await db.user.findUnique({
                    where: { email: credentials.email }
                })
                if (!existingUser) {
                    return null
                }

                const passwordMatch = await compare(credentials.password, existingUser.password)

                if (!passwordMatch) {
                    return null
                }

                return existingUser
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
                
            if (user) {
                return {
                    ...token,
                    isCreator: user.isCreator
                };
            }
            return token;
        },
        async session({ session, token }) {
            const user = await db.user.findUnique({
                where: {
                    email: session.user.email
                }
            });
        
            if (user) {
                const { password, ...rest } = user;
        
                return {
                    ...session,
                    user: rest 
                };
            } else {
                return session;
            }
        }
    }
}  