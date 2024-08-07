"use client"
import Link from "next/link";
import {signOut} from "next-auth/react";
import Auth from "@/src/components/Auth";
import {useEffect, useState} from "react";
import AccessTimer from "@/src/components/AccessTimer";
import Spinner from "@/src/components/ui/Spinner";
import {useRouter} from "next/navigation";
import {deleteSession} from "@/src/actions/session";
import {signOutDeleteSession} from "@/src/lib/auth";

type Subject = {
    subjectName: string,
    description: string,
    id: string,
    durationInMinutes: number,
    slug: string,
}

export default function SubjectDashboard() {

    const [subjects, setSubjects] = useState([])

    const [loadingLogOut, setLoadingLogOut] = useState(false)

    const [loadingReadData, setLoadingReadData] = useState(false)

    const router = useRouter()

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoadingReadData(true)
                const subjects = await fetch(`/api/subject`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                const sub = await subjects.json()

                setSubjects(sub.subjects)

                setLoadingReadData(false)

            } catch (error: any) {
                console.log("Error while fetching the data ", error)
            }
        }

        fetchData()

        return () => {
        };
    }, []);

    const logOut = async () => {
        setLoadingLogOut(true)
        await signOutDeleteSession()
        setLoadingLogOut(false)
    }

    return (
        <Auth>
            {loadingReadData ?
                <div className="min-h-screen flex justify-center items-center">
                    <Spinner className="w-7 h-7 text-blue-600"/>
                </div>
                :
                <div>
                    <div className="relative font-sans bg-blue-500">
                        <div
                            className="min-h-[150px] md:min-h-[200px] relative z-50 h-full mx-auto flex flex-col justify-center items-center text-center text-white">
                            <h2 className="sm:text-4xl text-2xl font-bold mb-6">WEB QUIZZ APP </h2>

                            <div className="flex gap-5 items-center flex-col md:flex-row">
                                <AccessTimer/>

                                <button onClick={logOut} disabled={loadingLogOut}
                                        className={`border-2 bg-red text-white px-8 py-2 rounded-md ${loadingLogOut ? 'cursor-not-allowed' : ''}`}>
                                    {loadingLogOut && <Spinner/>}
                                    <span>Se Deconnecter </span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="my-8 px-4 md:px-8">

                        <div className="grid grid-cols-3 gap-5">
                            {subjects.map((subject: Subject, index: number) =>
                                <CardSubject key={index} subject={subject}/>
                            )}
                        </div>
                    </div>
                </div>
            }
        </Auth>
    )
}


const CardSubject = ({subject}: {
    subject: Subject
}) => {

    return (

        <Link href={"/dashboard/subject/" + subject.slug} type="div"
              className="bg-white cursor-pointer shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] w-full col-span-3 md:col-span-2 lg:col-span-1 rounded-lg font-[sans-serif] overflow-hidden mx-auto mt-4">
            <div className="p-6">
                <h3 className="text-lg font-semibold">{subject.subjectName}</h3>
                <p className="my-2 text-md text-gray-500 leading-relaxed">
                    {subject.description}
                </p>
                <p className="text-right font-bold text-sm">Durée : <span>{subject.durationInMinutes}</span> Minutes</p>
            </div>
        </Link>
    )
}