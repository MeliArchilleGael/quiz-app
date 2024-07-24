import Link from "next/link";


export default function SubjectPage() {

    return(
        <>
            <p className="text-center text-lg font-bold">Liste des sujets</p>
            <div className="flex justify-end px-5">
                <Link href="/admin/subject/create"
                    className="shadow-md text-sm rounded-md py-2 px-3 bg-green-600 text-white ">
                    Nouveau
                </Link>
            </div>


        </>
    )
}