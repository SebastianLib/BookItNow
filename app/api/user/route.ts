import { db } from "@/lib/db";
import { SignUpSchema } from "@/schemas/SignUpSchema";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

    try {
        const body = await req.json();
        const {name ,email, password, isCreator } = SignUpSchema.parse(body);
        console.log(body);
        
        const existingUserByEmail = await db.user.findUnique({
            where: { email: email }
        });
        if (existingUserByEmail) {
            return NextResponse.json({ user: null, message: "User with this email already exists" },
                { status: 409 })
        }

        const hashedPassword = await hash(password, 10)
        const newUser = await db.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                isCreator
            }
        })
        const { password: newUserPassword, ...rest } = newUser;

        return NextResponse.json({ user: rest, message: "User created successfully" }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 })

    }
}