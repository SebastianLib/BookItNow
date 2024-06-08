import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

    try {
        const session = await getServerSession(authOptions);
        if (!session?.user.id) {
            return NextResponse.json({ message: "unauthorized" },
                { status: 401 })
        }
        const data = await req.json();  
        
        if(data.hours.length === 0){
            await db.userAvailability.deleteMany({
                where:{
                    userId: session.user.id,
                    day: data.day
                }
            })
            return NextResponse.json({ message: "You have removed hours successfully" }, { status: 201 })
        }

        const existingDay = await db.userAvailability.findFirst({
            where:{
                userId: session.user.id,
                day: data.day
            }
        })
        
        if(existingDay){
            await db.userAvailability.updateMany({
                where:{
                    userId: session.user.id,
                    day: data.day
                },
                data:{
                    ...data,
                    userId: session.user.id
                }
            })
            return NextResponse.json({ message: "You have updated hours successfully" }, { status: 201 })
        }

        await db.userAvailability.create({
            data:{
                ...data,
                userId: session.user.id
            }
        })

        return NextResponse.json({ message: "You have added hours successfully" }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 })

    }
}