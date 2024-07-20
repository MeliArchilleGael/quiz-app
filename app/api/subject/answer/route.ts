import {hash} from "bcryptjs";
import {prisma} from "@/src/lib/prisma";
import {NextResponse} from "next/server";


export async function POST(req: Request) {
    try {
        const {answers, result} = (await req.json()) as {
            answers: any[],
            result: any
        };

        if (answers && result) {
            answers.map(async (answer) => {
                const an = await prisma.answer.create({
                    data: {
                        userId: answer.userId,
                        questionId: answer.questionId
                    },
                });

                answer.option.map(async (op: any) => {
                    const o = await prisma.optionChoose.create({
                        data: {
                            option: {
                                connect: {
                                    id: op.id
                                }
                            },
                            answer: {
                                connect: {
                                    id: an.id
                                }
                            }
                        },
                    });
                })
            })

            const res = await prisma.result.create({
                data: {
                    user: {
                        connect: {
                            id: result.userId
                        }
                    },
                    subject: {
                        connect: {
                            id: result.subjectId
                        }
                    },
                    userScore: result.userScore,
                },
            });

            return NextResponse.json({
                result: res,
            });
        }

        return new NextResponse(
            JSON.stringify({
                status: "error",
                message: "Must pass data wheel ",
            }),
            {status: 500}
        );

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
