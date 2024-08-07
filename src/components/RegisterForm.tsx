"use client"

import Spinner from "@/src/components/ui/Spinner";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {CreateUserType} from "@/src/types/compoment";
import InputError from "@/src/components/ui/InputError";
import {showToast} from "@/src/lib/util";

export default function RegisterForm() {

    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);

    const onSubmit = async (data: CreateUserType) => {

        setError("")
        try {
            setLoading(true);

            const res = await fetch("/api/user/register", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            setLoading(false);

            setLoading(false);
            if (!res.ok) {
                setError((await res.json()).message);
                return;
            }

            showToast('Utilisateur crée', 'success')

            reset()

            //router.push('/admin/user')
        } catch (error: any) {
            setLoading(false);
            setError(error.statusText);
        }
    };

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm<CreateUserType>({
        defaultValues: {
            name: "",
            startDate: new Date(),
            endDate: new Date(),
            email: "",
            password: ""
        }
    })
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 font-[sans-serif]  mx-auto">
            {error && (
                <p className="text-center bg-red-300 py-4 mb-6 rounded">{error}</p>
            )}

            <div>
                <label className="text-sm" htmlFor="name">Nom de l&lsquo;utilisateur </label>
                <input type="text" placeholder="Enter Name"
                       {...register('name', {required: true})}
                       className="px-4 py-3 bg-gray-100 w-full mt-2 text-sm outline-none border-b-2 border-blue-500 rounded"/>
                {errors.name &&
                    <InputError message="Ce champs est requis" className=""/>
                }
            </div>


            <div>
                <label className="text-sm" htmlFor="email">Email</label>
                <input type="email" placeholder="Enter Email"
                       {...register('email', {required: true})}
                       className="px-4 py-3 mt-2 bg-gray-100 w-full text-sm outline-none border-b-2 border-blue-500 rounded"/>
                {errors.email &&
                    <InputError message="Ce champs est requis" className=""/>
                }
            </div>

            <div>
                <label className="text-sm" htmlFor="">Mot de passe </label>
                <input type="text" placeholder="Enter Password"
                       {...register('password', {required: true})}
                       className="px-4 py-3 mt-2 bg-gray-100 w-full text-sm outline-none border-b-2 border-transparent focus:border-blue-500 rounded"/>
                {errors.password &&
                    <InputError message="Ce champs est requis" className=""/>
                }
            </div>

            <div>
                <label className="text-sm" htmlFor="email">Date de début </label>
                <input type="datetime-local"
                       {...register('startDate', {required: true})}
                       className="px-4 py-3 mt-2 bg-gray-100 w-full text-sm outline-none border-b-2 border-blue-500 rounded"/>
                {errors.startDate &&
                    <InputError message="Ce champs est requis" className=""/>
                }
            </div>

            <div>
                <label className="text-sm" htmlFor="email">Date de fin </label>
                <input type="datetime-local"
                       {...register('endDate', {required: true})}
                       className="px-4 py-3 mt-2 bg-gray-100 w-full text-sm outline-none border-b-2 border-blue-500 rounded"/>
                {errors.endDate &&
                    <InputError message="Ce champs est requis" className=""/>
                }
            </div>

            <button type="submit" disabled={loading}
                    className="mt-8 w-full flex justify-center gap-3 px-4 py-2.5 mx-auto text-center text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
                {loading && <Spinner/>}
                {loading ? 'Submitting...' : 'Sign up'}
            </button>
        </form>
    )
}