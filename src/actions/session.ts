export const updateSession = async (data: any) => {
    const response = await fetch('/api/session', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    return await response.json()
}

export const getSession = async () => {
    const response = await fetch('/api/session');

    return await response.json()
}


export const deleteSession = async () => {
    const response = await fetch('/api/session', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    console.log(response)

    return await response.json()
}