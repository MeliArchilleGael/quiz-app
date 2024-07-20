import {OptionProps, QuizItemProps, ResponseOption} from "@/src/types/compoment";
import {useEffect, useState} from "react";
import Option from "@/src/components/subject/Options";
import QuestionTimer from "@/src/components/QuestionTimer";


export default function QuizItem({question, handleClickOption, answer}: {
    question: QuizItemProps,
    handleClickOption: (data: ResponseOption) => void,
    answer: ResponseOption,
}) {

    const [readingAudio, setReadingAudio] = useState<boolean>(false)

    const [response, setResponse] = useState<ResponseOption>({
        idOptions: answer?.idOptions ?? []
    })

    const [point, setPoint] = useState<number>(0)


    useEffect(() => {
        setReadingAudio(question.questionType === 'audio')

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
            className="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] w-full max-w-2xl rounded-lg font-[sans-serif] overflow-hidden mt-4">
            <div className="p-6 relative">
                <h3 className="text-lg font-semibold">{question.title}</h3>

                {question.questionType === "audio" &&
                    <div>
                        <div className="flex justify-center items-center">
                            <video className=" h-[80px] w-full" controls={true} autoPlay={false} onEnded={readingEnded}>
                                <source src={question.mediaLink} type="audio/mpeg"/>
                            </video>
                        </div>

                        {!readingAudio &&
                            <QuestionTimer label="Fin du suject dans " timer={question.durationInSeconds * 1000}/>}
                    </div>
                }

                {!readingAudio &&
                    <div className="flex flex-col gap-3 mt-5">
                        {question.options.map((option: OptionProps, index: number) =>
                            <Option key={index} option={option}
                                    handleClickOption={(option) => handleLocalClickOption(option)}
                                    idQuestion={question.id}
                                    multipleChoice={question.multipleChoice}
                                    idOptions={response.idOptions}
                            />
                        )}
                    </div>
                }
            </div>
        </div>
    )
}