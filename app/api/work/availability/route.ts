import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { format } from "date-fns";

export async function POST(req: Request) {

    try {
        const session = await getServerSession(authOptions);
        if (!session?.user.id) {
            return NextResponse.json({ message: "unauthorized" },
                { status: 401 })
        }
        const data = await req.json();

        if (data.hours.length === 0) {
            await db.userAvailability.deleteMany({
                where: {
                    userId: session.user.id,
                    date: format(data.date, 'yyyy-MM-dd')
                }
            })
            return NextResponse.json({ message: "You have removed hours successfully" }, { status: 201 })
        }

        const existingDay = await db.userAvailability.findFirst({
            where: {
                userId: session.user.id,
                date: format(data.date, 'yyyy-MM-dd')
            },
            include: {
                hours: true
            }
        })

        if (existingDay) {
            await db.hours.deleteMany({
                where: {
                    userAvailabilityId: existingDay.id
                }
            });

            await db.userAvailability.update({
                where: {
                    id: existingDay.id
                },
                data: {
                    hours: {
                        create: data.hours.map((hour: number) => ({
                            time: hour
                        }))
                    }
                }
            });

            return NextResponse.json({ message: "You have updated hours successfully" }, { status: 201 });
        }

        await db.userAvailability.create({
            data: {
                date: format(data.date, 'yyyy-MM-dd'),
                userId: session.user.id,
                hours: {
                    create: (
                        data.hours.map((hour: string) => (
                            { time: hour }
                        ))
                    )
                }
            },
            include: {
                hours: true,
            }
        })

        return NextResponse.json({ message: "You have added hours successfully" }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 })

    }
}