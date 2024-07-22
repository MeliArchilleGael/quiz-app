"use client"

import {ReactNode} from "react";
import SideBarMenu from "@/src/components/Admin/SideBarMenu";
import Navbar from "@/src/components/Admin/NavBar";
import AuthFooter from "@/src/components/Admin/AdminFooter";

export default function Layout({children} : {children: ReactNode}) {


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
