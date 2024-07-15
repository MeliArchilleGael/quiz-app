import {OptionProps} from "@/src/types/compoment";
import {number} from "prop-types";

export default function Option({option, idQuestion, type}: { option: OptionProps, idQuestion: number, type: string }) {
    const id = option.id + Number.parseInt(Math.random().toString())
    return (
        <label htmlFor={`item-${id}`} className="flex cursor-pointer gap-2 py-2 border-2 px-3 rounded-md">
            <input type={type} name={`choice_${idQuestion}`} id={`item-${id}`}/>
            <p>{option.text}</p>
        </label>
    )
}