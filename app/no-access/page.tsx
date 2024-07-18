"use client"
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth";
import {signOut, useSession} from "next-auth/react"
import {useRouter, useSearchParams} from "next/navigation";
import Auth from "@/src/components/Auth";

export default function NoAccess() {

    const { data: session }  =  useSession();

    const searchParams = useSearchParams();
    const router = useRouter()
    const logOut = async ()=> {
        const callbackUrl = searchParams.get("callbackUrl") || "/";

        await signOut({
            callbackUrl: callbackUrl,
            redirect: false
        })
        router.push('/')
    }

    return (
        <Auth>
            <div className="h-screen flex justify-center items-center">
                <div className="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] w-full max-w-lg rounded-lg font-[sans-serif] overflow-hidden mx-auto mt-4">
                    <div className="p-6 gap-5">
                        <p className="text-lg">Welcome </p>
                        <p className="text-lg"> <span className="font-bold"> {session?.user?.name} </span> Sorry but access expire contact the admin for more information</p>
                        <div className="mt-8 text-center">
                            <button onClick={logOut} className="bg-blue-600 p-2 text-white px-8 rounded-md ">
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Auth>
    )
}