"use server"

import {getSession} from "next-auth/react";

export const serverSession = async () => {
    const session = await getSession()
}