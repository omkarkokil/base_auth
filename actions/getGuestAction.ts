import { toast } from "@/components/ui/use-toast";
import { authOptions } from "@/services/Auth/authOption"
import prisma from "@/services/Prisma/prismadb";
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server";

export const getGuestList = async () => {
    const session = await getServerSession(authOptions);
    if (session?.user.role !== "admin" && session?.user.role !== "sales") {

        return new NextResponse("user not authorized", { status: 404 });
    }

    try {
        const guest = await prisma.guest.findMany({
            orderBy: {
                createdAt: "desc"
            }
        })

        return guest;

    } catch (error) {
        console.log(error);
        return new NextResponse(`error  ${error}`, { status: 404 })

    }
}
