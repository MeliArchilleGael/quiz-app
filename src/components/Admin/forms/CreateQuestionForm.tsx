'use client'

import InputError from "@/src/components/ui/InputError";
import {useForm} from "react-hook-form";
import PrimaryButton from "@/src/components/ui/PrimaryButton";
import InputLabel from "@/src/components/ui/InputLabel";
import {showToast, slug} from "@/src/lib/util";
import {CreateQuestion} from "@/src/actions/admin/question";
import {CreateQuestionFormType, MediaType, OptionProps, QuestionType} from "@/src/types/compoment";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import TagOptionInput from "@/src/components/ui/TagOptionInput";

export default function CreateQuestionForm({categories, subjects}: {
    categories: any[],
    subjects: any[],
}) {

    const [isMultimediaQuestion, setIsMultimediaQuestion] = useState(false)

    const [loadingSave, setLoadingSave] = useState(false)

    const [options, setOption] = useState<OptionProps[]>()

    const {
        register,
        handleSubmit,
        setValue,
        formState: {errors},
        reset,
        watch,
    } = useForm<CreateQuestionFormType>({
        defaultValues: {
            categoryId: "",
            title: "",
            questionType: QuestionType.null,
            mediaType: MediaType.null,
            mediaLink: "",
            durationInSeconds: 0,
            multipleChoice: false,
        }
    })

    /* Watch change on the QuestionType input */
    const w = watch("questionType")

    useEffect(() => {
        const subscription = watch(({questionType}, {name, type}) => {
                if (questionType === "multimedia") {
                    setIsMultimediaQuestion(true)
                } else {
                    setIsMultimediaQuestion(false)
                }
            }
        )
        return () => subscription.unsubscribe()

    }, [w])

    const router = useRouter()
    const onSubmit = async (data: CreateQuestionFormType) => {

        setLoadingSave(true)
        data.options = options

        await CreateQuestion(data)

        showToast('Question crée', 'success')

        reset()
        setOption([])
        setLoadingSave(false)
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-10 border p-8 rounded-md shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)]">

            <div className="flex flex-wrap gap-5">
                <div className="flex flex-col gap-2 w-full">
                    <InputLabel value="Titre" htmlFor="name" defaultValue="Nom"/>
                    <input type="text" className="w-full border py-1 px-3 rounded-md"
                           {...register('title', {required: true})}
                    />
                    {errors.title &&
                        <InputError message="Ce champs est requis" className=""/>
                    }
                </div>

                <div className="flex flex-col gap-2 w-full">
                    <InputLabel value="Categorie "/>
                    <select className="w-full border py-1 px-3 rounded-md"
                            {...register('categoryId', {required: true})} name="categoryId"
                            id="categoryId">
                        {categories && categories.map((category, id) =>
                            <option key={id} value={category.id}>
                                {category.categoryName} : {category.pointPerQuestion} point par question
                            </option>
                        )}
                    </select>
                    {errors.categoryId &&
                        <InputError message="Ce champs est requis" className=""/>
                    }
                </div>

                <div className="flex flex-col gap-2 w-full">
                    <InputLabel value="Sujet "/>
                    <select className="w-full border py-1 px-3 rounded-md"
                            {...register('subjectId', {required: true})} name="" id="">
                        {subjects && subjects.map((subject, id) =>
                            <option key={id} value={subject.id}>
                                {subject.subjectName}
                            </option>
                        )}
                    </select>
                    {errors.subjectId &&
                        <InputError message="Ce champs est requis" className=""/>
                    }
                </div>

                <div className="flex flex-col gap-2 w-full">
                    <InputLabel value="Type de question"/>
                    <select className="w-full border py-1 px-3 rounded-md"
                            {...register('questionType', {required: true})}
                            name="questionType" id="questionType"
                    >
                        {Object.values(QuestionType).map((text, index) =>
                            <option key={index} value={text}>{text}</option>
                        )}
                    </select>

                    {errors.questionType &&
                        <InputError message="Error" className=""/>
                    }
                </div>

                {isMultimediaQuestion &&
                    <>
                        <div className="flex flex-col gap-2 w-full">
                            <InputLabel value="Durée de la question en secondes"/>
                            <input type="number" className="w-full border py-1 px-3 rounded-md"
                                   {...register('durationInSeconds', {required: true})}
                            />
                            {errors.durationInSeconds &&
                                <InputError message="Ce champs est requis" className=""/>
                            }
                        </div>

                        <div className="flex flex-col gap-2 w-full">
                            <InputLabel value="Type de media"/>
                            <select className="w-full border py-1 px-3 rounded-md" {...register('mediaType')} name=""
                                    id="">
                                {Object.values(MediaType).map((text, index) =>
                                    <option key={index} value="">{text}</option>
                                )}
                            </select>

                            {errors.mediaType &&
                                <InputError message="Error" className=""/>
                            }
                        </div>
                    </>
                }

                <div className="flex flex-col gap-2 w-full">
                    <div className="flex gap-3 items-center">
                        <input type="checkbox" className="border p-3 rounded-md"
                               {...register('multipleChoice')}
                        />
                        <InputLabel value="Question à choix multiple ?"/>
                    </div>
                    {errors.multipleChoice &&
                        <InputError message="Ce champs est requis" className=""/>
                    }
                </div>

                <div className="shadow-xl w-full border rounded-md my-3 p-5 ">
                    <h1 className="text-center my-2 font-bold">Ajouter les options pour cette question </h1>
                    <TagOptionInput
                        data={options}
                        errors=""
                        label="Titre de l'option "
                        label2="Est une bonne réponse"
                        updateDate={(data) => setOption([...data])}
                    />
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