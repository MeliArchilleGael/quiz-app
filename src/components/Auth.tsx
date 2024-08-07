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

    useEffect(() => {
        if (!session && status !== "loading") {
            router.push("/")
        }
    }, [status, session]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (session && session.user) {
                    const userId = session.user.id
                    const res = await fetch(`/api/user/access?userId=${userId}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });

                    await res.json().then((data) => {

                        updateSession(data)

                        if (data.access.length === 0) {
                            router.push("/no-access");

                        } else if (pathname === "/no-access")
                            router.push('/dashboard')
                    })
                }

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
    }, [status, session, pathname]);


    return (
        <div className="mx-2 md:mx-0">
            {children}
        </div>
    )
}