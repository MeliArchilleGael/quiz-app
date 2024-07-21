import {NextResponse} from "next/server";
import {prisma} from "@/src/lib/prisma";

export async function  GET (req: Request) {
    const { searchParams } = new URL(req.url);
    const subjectSlug = searchParams.get('slug');
    const userId = searchParams.get('userId');

    if (!subjectSlug || !userId) {
        return NextResponse.json(
            {
                status: 'error',
                message: 'The subject is required',
            },
            { status: 400 }
        );
    }

    console.log("userId", userId)

    try {
        const subject = await prisma.subject.findUnique({
            where: {
                slug: subjectSlug,
            },
            include: {
                questions: {
                    include: {
                        category: {
                          select: {
                              categoryName: true,
                              pointPerQuestion: true,
                          }
                        },
                        options: {
                            select: {
                                id: true,
                                isCorrect: true,
                                optionOrder: true,
                                optionText: true,
                            }
                        },
                        answers: {
                            where: {
                                userId: userId
                            },
                            include: {
                                optionChoose: {
                                    include: {
                                        option: true
                                    }
                                }
                            }
                        }
                    }
                },
                results: {
                    select: {
                        userScore: true,
                    },
                    where: {
                        userId: userId
                    }
                },
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