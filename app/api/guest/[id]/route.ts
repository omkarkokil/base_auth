
import { authOptions } from "@/services/Auth/authOption";
import prisma from "@/services/Prisma/prismadb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

interface IParams {
    id?: string
}

export async function DELETE(request: Request, { params }: { params: IParams }) {
    try {
        const session = await getServerSession(authOptions);
        if (session?.user.role !== "admin" && session?.user.role !== "sales") {
            return new NextResponse("user is not authorized", { status: 404 })
        }

        await prisma.guestInfo.deleteMany({ where: { guestId: params.id } });
        await prisma.itinerary.deleteMany({ where: { guestId: params.id } });

        const deleteUser = await prisma.guest.deleteMany({
            where: {
                id: params.id
            }
        })


        return NextResponse.json(deleteUser, { status: 200 })

    } catch (error: any) {
        console.log(error);
        return new NextResponse("internal error", { status: 500 })

    }
}



export async function GET(request: Request, { params }: { params: IParams }) {
    const session = await getServerSession(authOptions);
    if (session?.user.role !== "admin" && session?.user.role !== "sales") {
        return new NextResponse("user not authorized", { status: 404 });
    }

    try {
        const guest = await prisma.guest.findUnique({
            where: {
                id: params.id
            }
        })

        return NextResponse.json(guest);

    } catch (error) {
        console.log(error);
        return new NextResponse(`error  ${error}`, { status: 404 })

    }
}