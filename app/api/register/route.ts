import prisma from "@/services/Prisma/prismadb";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password, name, role } = body;

        if (!email || !name || !password || !role) {
            return new NextResponse("missing info", { status: 400 });
        }
        const hashedPassword = await bcrypt.hash(password, 12);


        const user = await prisma.user.create({
            data: {
                email,
                name,
                hashedPassword,
                role
            },
        });

        return NextResponse.json(user);
    } catch (error) {
        console.log(error, "Register error");
        return new NextResponse("internal error", { status: 400 });
    }
}
