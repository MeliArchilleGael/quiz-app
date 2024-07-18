import React, {ReactNode, useEffect} from "react";
import {useSession, signOut} from "next-auth/react";
import {usePathname, useRouter} from "next/navigation";


export default function Auth({children}: {
    children: ReactNode
}) {

    const {data: session, status} = useSession();
    const router = useRouter()
    const pathname = usePathname();

    //console.log('Session on the auth component ', session)

    useEffect(() => {
        if (!session && !session?.user) {
            router.push("/")
        }
    }, [session, router]);

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

                const data = await res.json()
               // console.log("Fetch data call ",data.access)
                if (data.access.length === 0) {
                    router.push("/no-access");
                }else if (pathname==="/no-access")
                    router.push('/dashboard')
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
    }, []);


    return (
        <div>
            {children}
        </div>
    )
}