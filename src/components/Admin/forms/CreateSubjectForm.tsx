'use client'

import InputError from "@/src/components/ui/InputError";
import {useForm} from "react-hook-form";
import PrimaryButton from "@/src/components/ui/PrimaryButton";
import InputLabel from "@/src/components/ui/InputLabel";
import {slug} from "@/src/lib/util";
import {CreateSubject} from "@/src/actions/admin/subject";
import {CreateSubjectFormType} from "@/src/types/compoment";
import {useRouter} from "next/navigation";
import {revalidatePath} from "next/cache";

export default function CreateSubjectForm() {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: {errors},
        reset
    } = useForm<CreateSubjectFormType>({
        defaultValues: {
            subjectName: "",
            description: "",
            slug: "",
            passScore: 0,
            maxScore: 0,
            durationInMinutes: 0,
        }
    })

    const router = useRouter()

    const onSubmit = async (data: CreateSubjectFormType) => {
        setValue("slug", slug(data.subjectName))

        await CreateSubject(data)

        reset()
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10">

            <div className="flex flex-wrap gap-5">
                <div className="flex flex-col gap-2 w-full">
                    <InputLabel value="Nom du sujet" htmlFor="name" defaultValue="Nom"/>
                        <input type="text" className="w-full border py-1 px-3 rounded-md"
                               {...register('subjectName', {required: true})}
                        />
                    {errors.subjectName &&
                        <InputError message="Ce champs est requis" className=""/>
                    }
                </div>

                <div className="flex flex-col gap-2 w-full">
                    <InputLabel value="description"/>
                    <input type="text" className="w-full border py-1 px-3 rounded-md"
                           {...register('description', {required: true})}
                    />
                    {errors.description &&
                        <InputError message="Ce champs est requis" className=""/>
                    }
                </div>

                <div className="flex flex-col gap-2 w-full">
                    <InputLabel value="Durée en minutes"/>
                    <input type="number" className="w-full border py-1 px-3 rounded-md"
                           {...register('durationInMinutes', {required: true, min: 5, valueAsNumber: true})}
                    />
                    {errors.durationInMinutes &&
                        <InputError message="Vérifier que le temps est supérieur a 5 minutes" className=""/>
                    }
                </div>

                <div className="flex flex-col gap-2 w-full">
                    <InputLabel value="Score max du sujet "/>
                    <input type="number" className="w-full border py-1 px-3 rounded-md"
                           {...register('maxScore', {required: true})}
                    />
                    {errors.maxScore &&
                        <InputError message="Ce champs est requis" className=""/>
                    }
                </div>

                <div className="flex flex-col gap-2 w-full">
                    <InputLabel value="Pass score"/>
                    <input type="number" className="w-full border py-1 px-3 rounded-md"
                           {...register('passScore', {required: true})}
                    />
                    {errors.passScore &&
                        <InputError message="Ce champs est requis" className=""/>
                    }
                </div>
            </div>

            <div className="flex items-center justify-end mt-4">
                <PrimaryButton className="ml-4">
                    <span>Enregistrer</span>
                </PrimaryButton>
            </div>
        </form>
    )
}