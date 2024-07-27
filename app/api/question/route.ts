import {prisma} from "@/src/lib/prisma";
import {NextResponse} from "next/server";
import multer from 'multer';
import path from "path";
import fs from "fs"
import {promisify} from "util";
import {pipeline} from 'stream'

const pump = promisify(pipeline);

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
        const formData = await req.formData()
        const file = formData.get("file") as File || null
        let uploadDir: string = ""
        if (file) {
            uploadDir = `./public/upload`
            const buffer = Buffer.from(await file.arrayBuffer());
            // write the file on the upload directory
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, {recursive: true});
            }
            fs.writeFileSync(uploadDir+`/${file.name}`, buffer)
        }

        const options = JSON.parse((formData.get('options'))?.toString() ?? "[]")

        const op: any[] = []
        options?.map((p: any) => op.push({
            optionText: p.optionText,
            isCorrect: p.isCorrect,
        }))

        const question = await prisma.question.create({
            data: {
                durationInSeconds: Number.parseInt(formData.get('durationInSeconds')?.toString() ?? "0"),
                subjectId: formData.get('subjectId') as string,
                title: formData.get('title') as string,
                multipleChoice: JSON.parse(formData.get('multipleChoice')?.toString() ?? "") as boolean,
                questionType: formData.get('questionType') as string,
                mediaType: formData.get('mediaType') as string,
                mediaLink: `/upload/${file.name}`,
                categoryId: formData.get('categoryId') as string,
                options: {
                    create: [...op]
                }
            },
            include: {
                options: true
            }

        })

        console.log("Here is the question save  ", question )

        return NextResponse.json({
            question: {...question},
        });

    } catch (error: any) {
        console.log("Error ", error)
        return new NextResponse(
            JSON.stringify({
                status: "error",
                message: error.message,
            }),
            {status: 500}
        );
    }

}
