import {useState} from "react";
import {OptionProps} from "@/src/types/compoment";
import InputError from "@/src/components/ui/InputError";


export default function TagOptionInput({data = [], updateDate, label, label2, errors}: {
    data?: OptionProps[],
    updateDate: (data: OptionProps[]) => void
    label: string,
    label2: string
    errors: string
}) {

    const [optionText, setOptionText] = useState("")
    const [goodAnswer, setGoodAnswer] = useState(false)
    const [indexEdit, setIndexEdit] = useState(-1)

    const UpdateDataLocal = (data: OptionProps[]) => {
        updateDate(data)
    }

    const handleClickAdd = () => {
        const d: OptionProps[] = data

        const option: OptionProps = {
            isCorrect: goodAnswer,
            optionText: optionText,
        }
        if (indexEdit === -1) {
            d.push(option)
        } else {
            d[indexEdit] = option
            setIndexEdit(-1)
        }
        setOptionText("")
        setGoodAnswer(false)

        UpdateDataLocal(d)
    }

    const handleClickRemove = (index: number) => {
        const newDataL = data
        newDataL.splice(index, 1)
        UpdateDataLocal(newDataL)
    }

    const updateOption = (index: number) => {
        setIndexEdit(index)
        const d = data[index]

        setOptionText(d.optionText)
        setGoodAnswer(d.isCorrect)
    }

    return (
        <div className="flex flex-col w-full items-center">
            <div className="w-full items-center ">
                <div className="flex items-center mt-1 sm:space-y-0 sm:space-x-4">
                    <div className="w-full flex flex-col gap-4 my-3">
                        <label htmlFor="input1">
                            <span className="ml-2">{label}</span>
                            <input id="input1"
                                   value={optionText}
                                   onChange={(e) => setOptionText(e.target.value)}
                                   className="mt-1 py-2 px-5 w-full border rounded-md placeholder:text-gray-400"
                                   type="text" placeholder={label}/>
                        </label>

                        <label className="flex items-center" htmlFor="input2">
                            <input id="input2"
                                   checked={goodAnswer}
                                   onChange={(e) => setGoodAnswer(e.target.checked)}
                                   className="mt-1 py-3 px-5"
                                   type="checkbox"/>
                            <span className="ml-2">{label2}</span>
                        </label>

                    </div>
                    <div onClick={handleClickAdd}
                         className="w-full text-center py-3 px-8 text-sm font-medium bg-purple-500 text-gray-100 rounded-2xl cursor-pointer sm:w-min hover:bg-purple-700 hover:text-gray-50 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-50 mb-4 sm:mb-0">
                        <span>Ajouter</span>
                    </div>
                </div>
                <div
                    className='px-2 pt-2 pb-11 mb-3 flex flex-col w-full flex-wrap rounded-lg bg-purple-200 dark:bg-gray-400'>
                    {data &&
                        data.map((option, index) => (
                            <span key={index}
                                  className={`flex pl-4 pr-2 py-2 m-1 justify-between items-center text-sm font-medium text-white rounded-xl cursor-pointer hover:bg-gray-500 hover:text-gray-100 ${option.isCorrect ? ' bg-blue-500 ' : ' bg-black ' }` }>
                                <span className="w-full" onClick={() => updateOption(index)}>{option.optionText}</span>
                                <svg
                                    onClick={() => handleClickRemove(index)}
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 ml-3 hover:text-gray-300"
                                    viewBox="0 0 20 20"
                                    fill="currentColor">
                                    <path fillRule="evenodd"
                                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                          clipRule="evenodd"/>
                                            </svg>
                                    </span>
                        ))
                    }

                </div>
            </div>
            <InputError message={errors} className="mt-2"/>
        </div>
    )
}
