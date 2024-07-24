
import {prisma} from "@/src/lib/prisma";
import {NextResponse} from "next/server";
import {CreateCategoryFormType, CreateQuestionFormType, CreateSubjectFormType} from "@/src/types/compoment";

export async function GET(req: Request) {
    try {
        const categories = await prisma.category.findMany()

        return NextResponse.json({
            categories: categories
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
        const {
            pointPerQuestion,
            categoryName,
        } = (await req.json()) as CreateCategoryFormType;

        const category = await prisma.category.create({
            data: {
                pointPerQuestion: Number.parseInt(pointPerQuestion.toString()),
                categoryName: categoryName,
            }
        })

        return NextResponse.json({
            category: {...category},
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