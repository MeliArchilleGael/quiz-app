"use client"
import Link from "next/link";
import {useSession} from "next-auth/react";
import Auth from "@/src/components/Auth";
import {useEffect, useState} from "react";

type Subject = {
    subjectName: string,
    description: string,
    id: string,
    durationInMinutes: number,
    slug: string,
}

export default function SubjectDashboard() {

    const [subjects, setSubjects] = useState([])

    useEffect(() => {
        const fetchData = async  () => {
            try {
                const subjects = await fetch(`/api/subject`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                const sub = await subjects.json()
                console.log("Here are data ", sub)
                setSubjects(sub.subjects)

            }catch (error: any){
                console.log("Error while fetching the data ", error)
            }
        }

        fetchData()

        return () => {
        };
    }, []);

    return (
        <Auth>
            <div className="relative font-sans bg-blue-500">
                <div
                    className="min-h-[150px] md:min-h-[200px] relative z-50 h-full mx-auto flex flex-col justify-center items-center text-center text-white">
                    <h2 className="sm:text-4xl text-2xl font-bold mb-6">WEB QUIZZ APP </h2>
                </div>
            </div>
            <div className="my-8 px-4 md:px-8">
                <div className="flex flex-wrap justify-start gap-y-8 ">
                    {subjects.map((subject: Subject, index: number) =>
                        <CardSubject key={index} subject={subject} />
                    )}
                </div>
            </div>
        </Auth>
    )
}


const CardSubject = ({subject}: {
    subject: Subject
}) => {

    return (
        <Link href={"/dashboard/subject/"+subject.slug} type="div" className="bg-white cursor-pointer shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] w-full max-w-sm md:max-w-md rounded-lg font-[sans-serif] overflow-hidden mx-auto mt-4">
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