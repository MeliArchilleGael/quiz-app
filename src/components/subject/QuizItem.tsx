import {OptionProps, QuizItemProps, ResponseOption} from "@/src/types/compoment";
import {useEffect, useState} from "react";
import Option from "@/src/components/subject/Options";
import QuestionTimer from "@/src/components/QuestionTimer";
import Image from "next/image";


export default function QuizItem({question, handleClickOption, answer, showGoodAnswer = false, showingRecap = false}: {
    question: QuizItemProps,
    handleClickOption: (data: ResponseOption) => void,
    answer: ResponseOption,
    showGoodAnswer?: boolean
    showingRecap?: boolean
}) {

    const [readingAudio, setReadingAudio] = useState<boolean>(false)

    const [response, setResponse] = useState<ResponseOption>({
        idOptions: answer?.idOptions ?? []
    })


    useEffect(() => {
        setReadingAudio(question.questionType === 'multimedia' && question.mediaType === "audio")

        const update = async () => {
            const n = {
                idOptions: answer?.idOptions ?? []
            }
            await setResponse(n)
        }

        update()

    }, [question]);

    const readingEnded = () => {
        setReadingAudio(false)
    }

    const handleLocalClickOption = async (option: OptionProps) => {
        let newOption
        const value = option.id
        let res = response

        if (question.multipleChoice) {
            if (response.idOptions.includes(value)) {
                newOption = response.idOptions.filter((item) => item !== value)
            } else {
                newOption = [...response.idOptions, value]
            }
        } else {
            newOption = [value]
            res.option = [option]
        }

        res.idOptions = [...newOption]

        await setResponse(res);

        handleClickOption(res)
    }


    return (
        <div
            className="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] min-w-full max-w-[90%]  rounded-lg font-[sans-serif] overflow-hidden mt-4">
            <div className="p-6 relative">
                <h3 className="text-lg font-semibold">{question.title}</h3>

                {question.questionType === "multimedia" && question.mediaType === "audio" &&
                    <div>
                        <div className="flex justify-center items-center">
                            <video className=" h-[90px] w-full" controls={true}
                                   autoPlay={!(showGoodAnswer || showingRecap)} onEnded={readingEnded}>
                                <source src={question.mediaLink} type="audio/mpeg"/>
                            </video>
                        </div>

                        {!readingAudio &&
                            <div className="my-3">
                                <QuestionTimer label="Fin de la question dans "
                                               timer={question.durationInSeconds * 1000}/>
                            </div>}
                    </div>
                }

                {(!readingAudio || showGoodAnswer || showingRecap) &&
                    <div className="flex flex-col items-center gap-5 h-full mt-5">
                        {question.questionType === "multimedia" && question.mediaType === 'image' &&
                            <div className="">
                                <Image width={500} height={500} src={question.mediaLink} alt="image de la question "/>
                            </div>
                        }
                        <div className="flex flex-col gap-3 w-full">
                            {question.options.map((option: OptionProps, index: number) =>
                                <Option key={index} option={option}
                                        handleClickOption={(option) => handleLocalClickOption(option)}
                                        idQuestion={question.id}
                                        multipleChoice={question.multipleChoice}
                                        idOptions={response.idOptions}
                                        showGoodAnswer={showGoodAnswer}
                                />
                            )}
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}