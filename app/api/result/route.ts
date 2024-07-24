

import {prisma} from "@/src/lib/prisma";
import {NextResponse} from "next/server";

export async function GET(req: Request) {
    try {
        const {searchParams} = new URL(req.url)
        const search = searchParams.get('search')

        let results
        if (!search)
            results = await prisma.result.findMany({
                include: {
                    subject: {
                        select: {
                            passScore: true,
                            subjectName: true,
                        }
                    },
                    user: {
                        select: {
                            email: true,
                            name: true,
                        }
                    }
                },
                orderBy: {
                    createdAt: 'desc'
                }
            })
        else
            results = await prisma.result.findMany({
                include: {
                    subject: {
                        select: {
                            passScore: true,
                            subjectName: true,
                        }
                    },
                    user: {
                        where: {
                            OR: [
                                {email: {contains : search}},
                                {name: {contains : search}},
                            ]
                        },
                        select: {
                            email: true,
                            name: true,
                        }
                    }
                }
            })


        return NextResponse.json({
            results: results
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