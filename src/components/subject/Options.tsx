import {OptionProps} from "@/src/types/compoment";
import {useEffect, useState} from "react";

type PropsType = {
    option: OptionProps,
    idQuestion: string,
    multipleChoice: boolean,
    handleClickOption: (option: OptionProps) => void,
    idOptions: string[]
}

export default function Option({option, idQuestion, multipleChoice, handleClickOption, idOptions}: PropsType) {

    const id = option.id + idQuestion
    const handleLocalClickOption = (option: OptionProps) => {
        handleClickOption(option)
    }

    useEffect(() => {
        //console.log('New compoment mount  options ')
        return () => {

        };
    }, []);


    return (
        <label onClick={() => handleLocalClickOption(option)} htmlFor={`item-${id}`} className="flex cursor-pointer gap-2 py-2 border-2 px-3 rounded-md">
            <input type={multipleChoice ? "checkbox" : "radio"}
                   name={`choice_${idQuestion}`} id={`item-${id}`}
                   readOnly
                   checked={idOptions.includes(option.id)}
            />
            <p>{option.optionText}</p>
        </label>
    )
}