import Link from "next/link";
import {CreateQuestionFormType, CreateSubjectFormType} from "@/src/types/compoment";
import EditSVG from "@/src/components/ui/EditSVG";
import DeleteSVG from "@/src/components/ui/DeleteSVG";
import {ReadQuestion} from "@/src/actions/admin/question";


export default async function QuestionPage() {

    const q = await ReadQuestion()
    const questions = q.questions

    return (
        <>
            <p className="text-center text-lg font-bold">Liste des questions </p>
            <div className="flex justify-end px-5">
                <Link href="/admin/question/create"
                      className="shadow-md text-sm rounded-md py-2 px-3 bg-green-600 text-white ">
                    Nouvelle
                </Link>
            </div>


            <div className="font-sans mt-8 ">
                <table className="min-w-full bg-white divide-y divide-gray-200">
                    <thead className="bg-gray-100 whitespace-nowrap">
                    <tr>
                        <th className="p-4 text-left text-xs font-semibold text-gray-800">
                            Titre
                        </th>
                        <th className="p-4 text-left text-xs font-semibold text-gray-800">
                            Type de question
                        </th>
                        <th className="p-4 text-left text-xs font-semibold text-gray-800">
                            Type de media
                        </th>
                        <th className="p-4 text-left text-xs font-semibold text-gray-800">
                            Durée en secondes
                        </th>
                        <th className="p-4 text-left text-xs font-semibold text-gray-800">
                            Category
                        </th>
                        <th className="p-4 text-left text-xs font-semibold text-gray-800">
                            Actions
                        </th>
                    </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200 whitespace-nowrap">
                    {questions.map((question : CreateQuestionFormType) =>
                        <tr key={question.id} className="hover:bg-gray-50">
                            <td className="p-4 text-[15px] text-gray-800 w-max text-wrap">{question.title}</td>
                            <td className="p-4 text-[15px] text-gray-800">{question.questionType}</td>
                            <td className="p-4 text-[15px] text-gray-800">{question.mediaType}</td>
                            <td className="p-4 text-[15px] text-gray-800">{question.durationInSeconds}</td>
                            <td className="p-4 text-[15px] text-gray-800">{question.category?.categoryName}</td>

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