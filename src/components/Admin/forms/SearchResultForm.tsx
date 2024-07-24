'use client'
import {FormEvent, useState} from "react";
import {useRouter} from "next/navigation";


export function SearchResultForm({init}: {init : string}) {
    const [search, setSearch] = useState(init)

    const router = useRouter()
    const formSubmit = (e: FormEvent) => {
        e.preventDefault()
        router.push('/admin/result?search=' + search)
    }

    return (
        <form onSubmit={(e) => {
            formSubmit(e)
        }} className="flex flex-col md:flex-row items-center justify-center py-4 md:gap-8 gap-4">
            <div className="relative flex flex-wrap items-stretch w-4/5">
                {/*<span className="z-10 h-full leading-snug font-normal text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                                <i className="fas fa-search"/>
                              </span>*/}
                <input type="text" placeholder="Search here..." name="search"
                       onChange={(event) => setSearch(event.target.value as string)}
                       value={search}
                       className="border p-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full "/>
            </div>

            <input type="submit" className="border cursor-pointer bg-green-600 text-white px-4 py-1 rounded-md "
                   value="Rechecher"/>
        </form>
    )
}