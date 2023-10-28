import { authOptions } from "@/services/Auth/authOption";
import prisma from "@/services/Prisma/prismadb";
import bcrypt from "bcrypt";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const session = await getServerSession(authOptions)
    if (session?.user.role !== "sales" && session?.user.role !== "admin") {
        console.log(session?.user.role);

        return new NextResponse("User is not authorized to perform the following task", { status: 402 })
    }

    try {
        const body = await request.json();
        const {
            name,
            filledDate,
            bookedDate,
            points } = body;

        if (!points || !name || !filledDate || !bookedDate) {
            return new NextResponse("All Fields are mandatory", { status: 400 });
        }

        const guest = await prisma.guest.create({
            data: {
                name,
                filledDate,
                bookedDate,
                points
            },
        });

        return NextResponse.json(guest, { status: 200 });
    } catch (error) {
        console.log(error, "Register error");
        return new NextResponse("internal error", { status: 400 });
    }
}



