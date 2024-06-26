import NextAuth from "next-auth";

declare module "next-auth" {
    export interface User {
        id: string;
        isCreator: boolean;
        name: string;
        email: string;
        image?: string | null;
        createdAt: Date;
    }

    interface Session {
        user: User;
    }
}