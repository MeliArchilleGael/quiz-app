'use server'


import {CreateQuestionFormType, CreateSubjectFormType} from "@/src/types/compoment";

export async function CreateQuestion(data: FormData) {

    try {
        const question = await fetch(process.env.APP_URL + "/api/question", {
            method: "POST",
            body: data,
        });

        return await question.json()

    }catch (error: any) {
        console.log("Error while fetching the question ", error)
        return null
    }

}

export async function ReadQuestion() {
    const subjects = await fetch(process.env.APP_URL+'/api/question', {
        headers: {
            "Content-Type": "application/json"
        },
        cache: "no-cache"
    })

    return subjects.json()
}