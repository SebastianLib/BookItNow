import { db } from "@/lib/db";
import { EditUserSchema } from "@/schemas/EditUserProfile";
import { SignUpSchema } from "@/schemas/SignUpSchema";
import { hash, compare } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

    try {
        const body = await req.json();
        const { name, email, password, isCreator } = SignUpSchema.parse(body);

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



export async function PUT(req: Request) {

    try {
        const body = await req.json();
        const { name, email, isCreator, id, image, oldPassword, newPassword } = body;

        const existingUser = await db.user.findUnique({
            where: {
                id
            }
        });
        if (!existingUser) return NextResponse.json({ message: "incorrect password" }, { status: 404 })

        if (oldPassword && newPassword) {
            const passwordMatch = await compare(oldPassword, existingUser.password)

            if (!passwordMatch) return NextResponse.json({ message: "incorrect password" }, { status: 401 })
        const hashedPassword = await hash(newPassword, 10)
            await db.user.update({
                where: {
                    id
                },
                data: {
                    name,
                    email,
                    isCreator,
                    image,
                    password: hashedPassword
                }
            })
            return NextResponse.json({ message: "User updated successfully" }, { status: 201 })
        }


        await db.user.update({
            where: {
                id
            },
            data: {
                name,
                email,
                isCreator,
                image
            }
        })

        return NextResponse.json({ message: "User updated successfully" }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 })

    }
}