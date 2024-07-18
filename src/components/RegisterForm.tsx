"use client"

import Spinner from "@/src/components/ui/Spinner";
import React, {ChangeEvent, useState} from "react";
import {signIn} from "next-auth/react";

export default function RegisterForm() {

    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);
    const [formValues, setFormValues] = useState({
        email: "",
        password: "",
        name: "",
    });

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            setFormValues({email: "", password: "", name: ""});

            console.log(formValues)

            const res = await fetch("/api/user/register", {
                method: "POST",
                body: JSON.stringify(formValues),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            setLoading(false);

            console.log(res);
            setLoading(false);
            if (!res.ok) {
                setError((await res.json()).message);
                return;
            }
        } catch (error: any) {
            setLoading(false);
            setError(error.statusText);
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
                <input type="text" placeholder="Enter Name"
                       name="name"
                       value={formValues.name}
                       onChange={handleChange}
                       className="px-4 py-3 bg-gray-100 w-full text-sm outline-none border-b-2 border-blue-500 rounded"/>
                {/*{state?.errors?.email && <p className="mt-2 text-red-400">{state.errors.email}</p>}*/}
            </div>


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

            <button type="submit" disabled={loading}
                    className="mt-8 w-full flex justify-center gap-3 px-4 py-2.5 mx-auto text-center text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
                {loading && <Spinner/>}
                {loading ? 'Submitting...' : 'Sign up'}
            </button>
        </form>
    )
}