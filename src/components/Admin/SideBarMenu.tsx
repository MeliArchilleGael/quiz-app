import Sidebar from "@/src/components/Admin/SideBar";
import Link from "next/link";


export default function SideBarMenu() {

    return (
        <Sidebar>
            {/* Navigation */}
            <hr className="my-4 md:min-w-full"/>
            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                <li className="items-center">
                    <Link
                        className="text-xs uppercase py-3 font-bold block w-full"
                        href="/admin"
                    >
                        <i className="fas fa-tv opacity-75 mr-2 text-sm"/> Dashboard
                    </Link>
                </li>
            </ul>

            {/* Divider */}
            <hr className="my-3 md:min-w-full"/>
            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                <li className="items-center">
                    <Link
                        className="text-xs uppercase py-3 font-bold block w-full"
                        href="/admin/result">
                        <i className="fa fa-users mr-2 text-sm"/>
                        <span>Voir les resultas du test</span>
                    </Link>
                </li>
            </ul>


            {/* Divider */}
            <hr className="my-4 md:min-w-full"/>
            <h6 className="md:min-w-full text-gray-400 text-sm uppercase font-bold block pt-1 no-underline">
                Gestion du quiz
            </h6>
            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                <li className="items-center">
                    <Link
                        className="text-xs uppercase py-3 font-bold block w-full"
                        href="/admin/subject">
                        <i className="fa fa-users mr-2 text-sm"/>
                        <span>Sujet</span>
                    </Link>
                </li>
            </ul>

        </Sidebar>
    )
}