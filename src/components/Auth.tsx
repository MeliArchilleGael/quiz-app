import React, {ReactNode, useEffect} from "react";
import {useSession, signOut} from "next-auth/react";
import {usePathname, useRouter} from "next/navigation";
import {updateSession} from "@/src/actions/session";


export default function Auth({children}: {
    children: ReactNode
}) {

    const {data: session, status} = useSession();
    const router = useRouter()
    const pathname = usePathname();

    //console.log('Session on the auth component ', session)

    useEffect(() => {
        if (!session && !session?.user && status !== "loading") {
            router.push("/")
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = session?.user?.id
                const res = await fetch(`/api/user/access?userId=${userId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                await res.json().then((data) => {

                   // console.log("Here is the data ", data)

                    updateSession(data)

                    if (data.access.length === 0) {
                        router.push("/no-access");

                    } else if (pathname === "/no-access")
                        router.push('/dashboard')
                })

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (status === "authenticated")
            fetchData();

        const interval = setInterval(fetchData, 5000);

        return () => {
            clearInterval(interval)
        };
    }, [status]);


    return (
        <div className="mx-2 md:mx-0">
            {children}
        </div>
    )
}