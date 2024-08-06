"use client"

import Spinner from "@/src/components/ui/Spinner";
import {ChangeEvent, useEffect, useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import {signIn, useSession} from "next-auth/react";
import {updateSession} from "@/src/actions/session"

export default function LoginForm() {

    const [error, setError] = useState("");

    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

    const {data: session, status, update} = useSession()

    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formValues, setFormValues] = useState({
        email: "",
        password: "",
    });

    useEffect(() => {
        if (status === "authenticated") {
            redirectUser()
        }
    }, [status])

    //console.log("Here is the session ", session)

    const redirectUser = async () => {

        const userId = session?.user?.id
        if (session && userId) {
            try {
                const res = await fetch(`/api/user/access?userId=${userId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                const data = await res.json()

                await updateSession(data)

                if (data.access.length > 0) {
                    router.push(callbackUrl);
                } else {
                    router.push("/no-access");
                }
            } catch (error: any) {
                console.log('Error', error)
            }
        }
    }


    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            setFormValues({email: "", password: ""});

            const res = await signIn("credentials", {
                redirect: false,
                email: formValues.email,
                password: formValues.password,
                callbackUrl,
            });

            setLoading(false);

            console.log(res);

            if (!res?.error) {
                await redirectUser()
            } else {
                setError("invalid email or password");
                console.log(res?.error)
            }
        } catch (error: any) {
            setLoading(false);
            setError(error);
        }
    };


    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormValues({...formValues, [name]: value});
    };
    return (
        <form onSubmit={onSubmit} className="space-y-4 font-[sans-serif] max-w-lg mx-auto">
             {error && (
                <p className="text-center bg-red-300 py-4 mb-6 rounded">{error}</p>
            )}
            <div>
                <input type="email" placeholder="Enter Email"
                       name="email"
                       value={formValues.email}
                       onChange={handleChange}
                       className="px-4 py-3 bg-gray-100 w-full text-sm outline-none border-b-2 border-blue-500 rounded"/>
                {/*{state?.errors?.email && <p className="mt-2 text-red-400">{state.errors.email}</p>}*/}
            </div>

            <div>
                <input type="password" placeholder="Enter Password" value={formValues.password}
                       name="password"
                       onChange={handleChange}
                       className="px-4 py-3 bg-gray-100 w-full text-sm outline-none border-b-2 border-transparent focus:border-blue-500 rounded"/>
            </div>

            <div className="flex">
                <input type="checkbox" className="w-4"/>
                <label className="text-sm ml-4 ">Remember me</label>
            </div>

            <button type="submit" disabled={loading}
                    className="mt-8 w-full flex justify-center gap-3 px-4 py-2.5 mx-auto text-center text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
                {loading && <Spinner/>}
                {loading ? 'Submitting...' : 'Sign up'}
            </button>
        </form>
    )
}