import NextAuth from "next-auth"
User
declare module "next-auth" {
    interface User {
        username: string;
        isCreator: boolean;
    }
  interface Session {
    user: User
  }
}