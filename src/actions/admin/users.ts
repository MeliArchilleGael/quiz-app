"use server"

export async function ReadUsers() {
    const users = await fetch(process.env.APP_URL+'/api/user', {
        headers: {
            "Content-Type": "application/json"
        }, cache: "no-cache"
    })

    return users.json()
}