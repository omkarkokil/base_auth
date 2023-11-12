import { toast } from "@/components/ui/use-toast";
import { authOptions } from "@/services/Auth/authOption"
import prisma from "@/services/Prisma/prismadb";
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server";

export const getSingleGuest = async (id: string | undefined) => {
    const session = await getServerSession(authOptions);
    if (session?.user.role !== "admin" && session?.user.role !== "sales") {
        return null
    }

    if (!id) {
        return null;
    }

    try {
        const guest = await prisma.guest.findUnique({
            where: {
                id: id
            },
            include: {
                guestInfo: true,
                itinerary: true,
                roomBooking: true,
                cruise: true,
                vehical: true,
                discount: true,
                flight: true,
                fiberboat: true,
            }
        })
        return guest;

    } catch (error) {
        console.log(error);
        return null

    }
}
