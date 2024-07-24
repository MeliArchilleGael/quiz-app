import {prisma} from "@/src/lib/prisma";
import {NextResponse} from "next/server";
import {CreateQuestionFormType, CreateSubjectFormType} from "@/src/types/compoment";

export async function GET(req: Request) {
    try {
        const questions = await prisma.question.findMany()

        return NextResponse.json({
            questions: questions
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

export async function POST(req: Request) {

    try {
        const d = await req.json()
        const {
            categoryId,
            mediaLink,
            mediaType,
            questionType,
            multipleChoice,
            title,
            durationInSeconds,
            subjectId,
            options,
        } = (d) as CreateQuestionFormType;

        console.log("Error while fetching the question ", d)

        const op: any[] = []
        options?.map((p)=> op.push({
            optionText: p.optionText,
            isCorrect: p.isCorrect,
        }))

        console.log('Here are option op', op)
        const question = await prisma.question.create({
            data: {
                durationInSeconds: Number.parseInt(durationInSeconds.toString()),
                subjectId: subjectId,
                title: title,
                multipleChoice: multipleChoice,
                questionType: questionType,
                mediaType: mediaType,
                mediaLink: mediaLink,
                categoryId: categoryId,
                options: {
                    create: [...op]
                }
            },
            include: {
                options: true
            }

        })

        return NextResponse.json({
            question: {...question},
        });

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