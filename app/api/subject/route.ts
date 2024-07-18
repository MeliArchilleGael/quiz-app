

import {prisma} from "@/src/lib/prisma";
import {NextResponse} from "next/server";

export async function GET(req: Request) {
    try {
        const subjects = await prisma.subject.findMany()

        return NextResponse.json({
            subjects: subjects
        })

    } catch (error: any) {
        return new NextResponse(
            JSON.stringify({
                status: "error",
                message: error.message,
            }),
            {status: 500}
        );
    }
}