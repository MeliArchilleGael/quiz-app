import Link from "next/link";
import EditSVG from "@/src/components/ui/EditSVG";
import DeleteSVG from "@/src/components/ui/DeleteSVG";
import {CreateSubjectFormType} from "@/src/types/compoment";
import {ReadUsers} from "@/src/actions/admin/users";


export default async function SubjectPage() {

    const us = await ReadUsers()
    const users = us.users

    return (
        <>
            <p className="text-center text-lg font-bold">Liste des utilisateurs </p>

            <div className="flex justify-end px-5">
                <Link href="/admin/users/create"
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
                            Email
                        </th>
                        <th className="p-4 text-left text-xs font-semibold text-gray-800">
                            Date de début
                        </th>
                        <th className="p-4 text-left text-xs font-semibold text-gray-800">
                            Date de fin
                        </th>
                        <th className="p-4 text-left text-xs font-semibold text-gray-800">
                            Actions
                        </th>
                    </tr>
                    </thead>

                    <tbody className="whitespace-nowrap">
                    {users.map((user : any) =>
                        <tr key={user.id} className="hover:bg-gray-50">
                            <td className="p-4 text-[15px] text-gray-800">{user.name}</td>
                            <td className="p-4 text-[15px] text-gray-800">{user.email}</td>
                            <td className="p-4 text-[15px] text-gray-800">{new Date(user.access[0]?.startDate).toLocaleString()}</td>
                            <td className="p-4 text-[15px] text-gray-800">{new Date(user.access[0]?.endDate).toLocaleString()}</td>

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