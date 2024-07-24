import ResultTestCard from "@/src/components/Admin/cards/ResultTestCard";

import {ReadResultAdmin} from "@/src/actions/answer";
import {SearchResultForm} from "@/src/components/Admin/forms/SearchResultForm";

export default async function Result({searchParams}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) {

    const search = searchParams.search as string

    const res = await ReadResultAdmin(search)

    const results = res.results
    return (
        <>
            <SearchResultForm init={search}/>

            <p className="text-center text-lg ">Les résultats des tests {search && 'pour : '+search}</p>
            {results.length>0 ?
                results.map((result: any, index: number) => {
                    if(result.user) {
                        return <ResultTestCard key={index} result={{
                            pasScore: result?.subject?.pasScore,
                            score: result.userScore,
                            email: result.user?.email,
                            userName: result.user?.name,
                            subjectName: result.subject?.subjectName,
                            createdAt: result.createdAt,
                        }}/>
                    }
                })
                :
                <p>No data Found </p>
            }
        </>
    )
}