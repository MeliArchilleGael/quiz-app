'use server'


import {CreateQuestionFormType, CreateSubjectFormType} from "@/src/types/compoment";

export async function CreateQuestion(data: CreateQuestionFormType) {

    try {
        const question = await fetch(process.env.APP_URL + "/api/question", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "multipart/form-data",
            },ù
        });

        return await question.json()

    }catch (error: any) {
        console.log("Error while fetching the question ", error)
        return {}
    }

}

export async function ReadQuestion() {
    const subjects = await fetch(process.env.APP_URL+'/api/question', {
        headers: {
            "Content-Type": "application/json"
        }
    })

    return subjects.json()
}