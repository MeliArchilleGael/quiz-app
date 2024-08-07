'use client'

import InputError from "@/src/components/ui/InputError";
import {useForm} from "react-hook-form";
import PrimaryButton from "@/src/components/ui/PrimaryButton";
import InputLabel from "@/src/components/ui/InputLabel";
import {CreateCategoryFormType} from "@/src/types/compoment";

import {useEffect, useState} from "react";
import {CreateCategory} from "@/src/actions/admin/category";

import {showToast} from "@/src/lib/util";
import {revalidatePath} from "next/cache";
import {useRouter} from "next/navigation";


export default function CreateCategoryForm() {

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm<CreateCategoryFormType>({
        defaultValues: {
            categoryName: "",
            pointPerQuestion: 1
        }
    })

    const [loadingSave, setLoadingSave] = useState(false)

    const router = useRouter()

    const onSubmit = async (data: CreateCategoryFormType) => {

        setLoadingSave(true)

        await CreateCategory(data)

        showToast('Categorie crée', 'success')

        reset()
        setLoadingSave(false)

        router.push('/admin/question/create?reload='+new Date().getTime())
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10 border p-8 rounded-md shadow-md">

            <div className="flex flex-wrap gap-5">
                <div className="flex flex-col gap-2 w-full">
                    <InputLabel value="Titre" htmlFor="name" defaultValue="Nom"/>
                    <input type="text" className="w-full border py-1 px-3 rounded-md"
                           {...register('categoryName', {required: true})}
                    />
                    {errors.categoryName &&
                        <InputError message="Ce champs est requis" className=""/>
                    }
                </div>

                <div className="flex flex-col gap-2 w-full">
                    <InputLabel value="Point par question de cette categorie"/>
                    <input type="number" className="w-full border py-1 px-3 rounded-md"
                           {...register('pointPerQuestion', {required: true, min: 1})}
                    />
                    {errors.pointPerQuestion &&
                        <InputError message="Ce champs est requis" className=""/>
                    }
                </div>


            </div>

            <div className="flex items-center justify-end mt-4">
                <PrimaryButton disabled={loadingSave} className="ml-4">
                    <span>Enregistrer</span>
                </PrimaryButton>
            </div>
        </form>
    )
}