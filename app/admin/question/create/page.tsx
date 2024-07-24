

import CreateQuestionForm from "@/src/components/Admin/forms/CreateQuestionForm";
import {ReadSubject} from "@/src/actions/admin/subject";
import {ReadCategory} from "@/src/actions/admin/category";
import CreateCategoryForm from "@/src/components/Admin/forms/CreateCategoryForm";

export  default async function CreateQuestion() {

    const subjects = await ReadSubject()

    const categories = await ReadCategory()

    return (
        <>
            <p className="text-center text-lg font-bold">Créer une nouvelle question</p>
            <div className="flex gap-5 flex-col">
                <CreateQuestionForm
                    subjects={subjects.subjects}
                    categories={categories.categories}
                />

                <CreateCategoryForm/>
            </div>
        </>
    )
}