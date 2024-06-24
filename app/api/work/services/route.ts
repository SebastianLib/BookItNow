import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user.id) {
            return NextResponse.json({ message: "unauthorized" }, { status: 401 });
        }
        const services = await req.json();

        if (!services) {
            return NextResponse.json({ message: "Services data is missing" }, { status: 400 });
        }

        for (const service of services) {
            try {
                await db.userService.create({
                    data: {
                        userId: session.user.id,
                        serviceId: service.id,
                        minutes: service.minutes,
                    },
                });
            } catch (error) {
                console.error("Error creating service:", error);
                return NextResponse.json({ message: "Failed to add services" }, { status: 500 });
            }
        }

        return NextResponse.json({ message: "All Services added successfully" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user.id) {
            return NextResponse.json({ message: "unauthorized" }, { status: 401 });
        }
        const data = await req.json();

        if (!data) {
            return NextResponse.json({ message: "data is missing" }, { status: 400 });
        }
        await db.userService.update({
            where: {
                id: data.id,
            },
            data: {
                minutes: data.value,
            },
        });

        return NextResponse.json({ message: "Service updated successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}