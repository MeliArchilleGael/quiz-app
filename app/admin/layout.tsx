"use client"

import {ReactNode, useEffect} from "react";
import SideBarMenu from "@/src/components/Admin/SideBarMenu";
import Navbar from "@/src/components/Admin/NavBar";
import AuthFooter from "@/src/components/Admin/AdminFooter";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import {signOutDeleteSession} from "@/src/lib/auth";

export default function Layout({children}: { children: ReactNode }) {

    const {data: session, status} = useSession();

    const router = useRouter()

    useEffect(() => {
        const userEmail = session?.user.email

        if ((!session && status !== "loading") || !userEmail || userEmail !== 'admin@gmail.com') {
            signOutDeleteSession()
        }
    }, [status, session]);


    return (
        <>
            <SideBarMenu/>
            <div className="relative md:ml-72">
                {/* Header */}
                <Navbar/>
                <hr className="md:min-w-full"/>

                <div className="p-5 w-full">
                    <div>
                        {children}
                    </div>
                </div>

                <footer className="block py-4">
                    <AuthFooter/>
                </footer>
            </div>

        </>
    );
}
