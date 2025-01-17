import {prisma} from "@/src/lib/prisma";
import {NextResponse} from "next/server";
import {CreateSubjectFormType} from "@/src/types/compoment";

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

export async function POST(req: Request) {
    console.log("Here is the req", req)
    try {
        const {
            durationInMinutes,
            slug,
            passScore,
            maxScore,
            subjectName,
            description
        } = (await req.json()) as CreateSubjectFormType;

        const subject = await prisma.subject.create({
            data: {
                subjectName: subjectName,
                slug: slug,
                passScore: Number.parseInt(passScore.toString()),
                durationInMinutes: durationInMinutes,
                description: description,
                maxScore: Number.parseInt(maxScore.toString()),
            }
        })

        return NextResponse.json({
            subject: {...subject},
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