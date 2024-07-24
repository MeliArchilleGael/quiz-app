import Link from "next/link";


export default function ResultTestCard({result}: {
    result: {
        email: string,
        score: number,
        pasScore: number,
        subjectName: string,
        userName: string,
        createdAt: string,
    }
}) {

    return (
        <div className="w-full mt-3 border px-6 py-4 bg-white shadow-lg rounded-lg">
            <p className="text-sm pb-2"></p>
            <div className="flex items-center gap-5">
                <div className="flex w-full justify-between items-center gap-3">
                    <div className="flex flex-col gap-1">
                        <p className="">
                            <strong>Nom du sujet : </strong>
                            <span> {result.subjectName} </span>
                        </p>
                        <p className="">
                            <strong>Nom de l'utilisateur : </strong>
                            <span> {result.userName} </span>
                        </p>
                        <p className="">
                            <strong>Email: </strong>
                            <span> {result.email} </span>
                        </p>
                        <p className="">
                            <strong>Score: </strong>
                            <span> {result.score} </span>
                        </p>
                        <p className="">
                            <strong>Result : </strong>
                            <span> {`${result.score > result.pasScore ? 'Pass' : 'Echec'}`} </span>
                        </p>
                        <p className="">
                            <strong>Date : </strong>
                            <span> {new Date(result.createdAt).toLocaleString()} </span>
                        </p>
                    </div>
                    <div>
                        <div className="flex justify-center gap-3 items-center">
                            <Link className="rounded-lg text-center px-3 py-1 bg-green-600 text-white" href="">
                                <i className="fa cursor-pointer fa-pencil"/>
                                <span>Detail</span>
                            </Link>
                            <Link className="rounded-lg text-center px-3 py-1 bg-red-600 text-white" href="">
                                <i className="fa cursor-pointer fa-pencil"/>
                                <span>Supprimer</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}