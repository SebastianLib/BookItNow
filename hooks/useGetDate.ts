"use server"
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { format } from "date-fns";
import { getServerSession } from "next-auth";

export const useGetDate = async ({ selectedDate }: { selectedDate: Date }) => {
    const session = await getServerSession(authOptions);  
    if(!session) return null;  
    const result = await db.userAvailability.findFirst({
        where: {
            date: format(selectedDate, 'yyyy-MM-dd'),
            userId: session.user.id
        },
    });
    if(result) return result;
    return null;
};