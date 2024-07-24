'use server'


import {CreateCategoryFormType} from "@/src/types/compoment";

export async function CreateCategory(data: CreateCategoryFormType) {

    const category = await fetch(process.env.APP_URL + "/api/category", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    });

    return await category.json()
}

export async function ReadCategory() {
    const categories = await fetch(process.env.APP_URL+'/api/category', {
        headers: {
            "Content-Type": "application/json"
        },
        cache: "no-cache"
    })

    return categories.json()
}