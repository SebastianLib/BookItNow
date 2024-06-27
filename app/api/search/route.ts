import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    console.log("robota juz");
    
    try {
        const categories = await db.category.findMany({
            include: {
                services: true,
            },
        });
        const users = await db.userService.findMany({
            where: {
                service: {
                    categoryId: category!,
                },
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