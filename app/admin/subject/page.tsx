import Link from "next/link";
import EditSVG from "@/src/components/ui/EditSVG";
import DeleteSVG from "@/src/components/ui/DeleteSVG";
import {ReadSubject} from "@/src/actions/admin/subject";
import {CreateSubjectFormType} from "@/src/types/compoment";


export default async function SubjectPage() {

    const sub = await ReadSubject()
    const subjects = sub.subjects

    return (
        <>
            <p className="text-center text-lg font-bold">Liste des sujets</p>

            <div className="flex justify-end px-5">
                <Link href="/admin/subject/create"
                      className="shadow-md text-sm rounded-md py-2 px-3 bg-green-600 text-white ">
                    Nouveau
                </Link>
            </div>

            <div className="font-sans mt-8 ">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-100 whitespace-nowrap">
                    <tr>
                        <th className="p-4 text-left text-xs font-semibold text-gray-800">
                            Nom
                        </th>
                        <th className="p-4 text-left text-xs font-semibold text-gray-800">
                            Description
                        </th>
                        <th className="p-4 text-left text-xs font-semibold text-gray-800">
                            Durée
                        </th>
                        <th className="p-4 text-left text-xs font-semibold text-gray-800">
                            Pass Score
                        </th>
                        <th className="p-4 text-left text-xs font-semibold text-gray-800">
                            Max Score
                        </th>
                        <th className="p-4 text-left text-xs font-semibold text-gray-800">
                            Actions
                        </th>
                    </tr>
                    </thead>

                    <tbody className="whitespace-nowrap">
                    {subjects.map((subject : CreateSubjectFormType) =>
                        <tr key={subject.id} className="hover:bg-gray-50">
                            <td className="p-4 text-[15px] text-gray-800">{subject.subjectName}</td>
                            <td className="p-4 text-[15px] text-gray-800">{subject.description}</td>
                            <td className="p-4 text-[15px] text-gray-800">{subject.durationInMinutes}</td>
                            <td className="p-4 text-[15px] text-gray-800">{subject.passScore}</td>
                            <td className="p-4 text-[15px] text-gray-800">{subject.maxScore}</td>

                            <td className="p-4">
                                <button className="mr-4" title="Edit">
                                    <EditSVG/>
                                </button>
                                <button className="mr-4" title="Delete">
                                    <DeleteSVG/>
                                </button>
                            </td>
                        </tr>
                    )}

                    </tbody>
                </table>
            </div>


        </>
    )
}