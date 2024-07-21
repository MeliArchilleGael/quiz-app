import {OptionProps} from "@/src/types/compoment";
import {useEffect, useState} from "react";

type PropsType = {
    option: OptionProps,
    idQuestion: string,
    multipleChoice: boolean,
    handleClickOption: (option: OptionProps) => void,
    idOptions: string[]
    showGoodAnswer?: boolean
}

export default function Option(
    {
        option,
        idQuestion,
        multipleChoice,
        handleClickOption,
        idOptions,
        showGoodAnswer
    }: PropsType) {

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
        <label onClick={() => handleLocalClickOption(option)} htmlFor={`item-${id}`}
               className={`flex cursor-pointer gap-2 py-2 border-2 px-3 rounded-md ${showGoodAnswer ? (idOptions.includes(option.id) ? (option.isCorrect ? 'border-green-500' : 'border-red-500') : (option.isCorrect ? 'border-green-500' : '')) : ''}`}>

            <input type={multipleChoice ? "checkbox" : "radio"}
                   name={`choice_${idQuestion}`} id={`item-${id}`}
                   readOnly
                   checked={idOptions.includes(option.id)}
            />
            <p>{option.optionText}</p>
        </label>
    )
}