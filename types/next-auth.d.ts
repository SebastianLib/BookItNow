import NextAuth from "next-auth";

declare module "next-auth" {
    export interface User {
        isCreator: boolean;
        name?: string | null;
        email?: string | null;
        image?: string | null;
    }

    interface Session {
        user: User;
    }
}