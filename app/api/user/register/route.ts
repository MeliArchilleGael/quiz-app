
import { prisma } from "@/src/lib/prisma";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import {CreateUserType} from "@/src/types/compoment";
export async function POST (req: Request) {
    try {
        const { name, email, password, startDate, endDate } = (await req.json()) as CreateUserType

        const hashed_password = await hash(password, 12);

        const user = await prisma.user.create({
            data: {
                name,
                email: email,
                password: hashed_password,
                access: {
                    create: {
                        startDate: startDate+':00+00:00',
                        endDate: endDate+':00+00:00'
                    }
                }
            },
        });

        return NextResponse.json({
            user: {
                name: user.name,
                email: user.email,
            },
        });
    } catch (error: any) {
        return new NextResponse(
            JSON.stringify({
                status: "error",
                message: error.message,
            }),
            { status: 500 }
        );
    }
}