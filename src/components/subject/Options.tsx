import {OptionProps} from "@/src/types/compoment";
import {number} from "prop-types";

export default function Option({option, idQuestion, multipleChoice}: { option: OptionProps, idQuestion: string, multipleChoice: boolean }) {

    const id = option.id + idQuestion

    return (
        <label htmlFor={`item-${id}`} className="flex cursor-pointer gap-2 py-2 border-2 px-3 rounded-md">
            <input type={multipleChoice ? "checkbox" : "radio"} name={`choice_${idQuestion}`} id={`item-${id}`}/>
            <p>{option.optionText}</p>
        </label>
    )
}