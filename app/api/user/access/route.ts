import {prisma} from "@/src/lib/prisma";
import {NextResponse} from "next/server";

export async function GET(req: Request) {

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
        return NextResponse.json(
            {
                status: 'error',
                message: 'userId is required',
            },
            { status: 400 }
        );
    }

    try {
        const currentDateTime = new Date()
        const currentDateTimeString = currentDateTime.toISOString()
        const access = await prisma.access.findMany({
            where: {
                userId: userId,
                startDate: { lte:currentDateTimeString },
                endDate: { gt: currentDateTimeString},
            },
            select: {
                startDate: true,
                endDate: true,
            }
        })

        return NextResponse.json({
            access: access
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