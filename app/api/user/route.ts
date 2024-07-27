import {NextResponse} from "next/server";
import {prisma} from "@/src/lib/prisma";


export async function GET() {

    try {
        const users = await prisma.user.findMany({
            include: {
                access: {
                    select: {
                        startDate: true,
                        endDate: true,
                    }
                }
            }
        })
        return NextResponse.json({
            users : users
        })

    } catch (error: any) {
        return new NextResponse(
            JSON.stringify({
                error: error.message
            }), {status: 500}
        );
    }

}