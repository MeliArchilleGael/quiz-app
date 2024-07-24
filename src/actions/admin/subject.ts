'use server'


import {CreateSubjectFormType} from "@/src/types/compoment";

export async function CreateSubject(data: CreateSubjectFormType) {

    const subject = await fetch(process.env.APP_URL + "/api/subject", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    });

    return await subject.json()
}

export async function ReadSubject() {
    const subjects = await fetch(process.env.APP_URL+'/api/subject', {
        headers: {
            "Content-Type": "application/json"
        }
    })

    return subjects.json()
}