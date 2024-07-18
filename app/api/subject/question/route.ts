import {NextResponse} from "next/server";
import {prisma} from "@/src/lib/prisma";


export async function  GET (req: Request) {
    const { searchParams } = new URL(req.url);
    const subjectSlug = searchParams.get('slug');

    if (!subjectSlug) {
        return NextResponse.json(
            {
                status: 'error',
                message: 'The subject is required',
            },
            { status: 400 }
        );
    }

    try {

        const subject = await prisma.subject.findUnique({
            where: {
                slug: subjectSlug,
            },
            include: {
                questions: {
                    include: {
                        options: {
                            select: {
                                id: true,
                                isCorrect: true,
                                optionOrder: true,
                                optionText: true,
                            }
                        }
                    }
                }
            }
        })

        return NextResponse.json({
            subject: subject
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