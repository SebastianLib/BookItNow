import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const service = searchParams.get('service');
    const data = await getServerSession(authOptions);
    try {
        const categories = await db.category.findMany({
            include: {
                services: true,
            },
        });

        const whereClause: {
            service:{
                categoryId: string;
            },
            serviceId?: string
        } = {
            service: {
                categoryId: category!,
            },
        };
        
        if (service !== "null" && service) {
            whereClause.serviceId = service;
        }

        const users = await db.userService.findMany({
            where: {
                ...whereClause,
                NOT:{
                    userId: data?.user.id
                }
            },
            include: {
                user: true,
                service: {
                    include: {
                        category: true,
                    },
                },
            },
            distinct: ["userId"],
        });

        return NextResponse.json({users:users, categories:categories}, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}