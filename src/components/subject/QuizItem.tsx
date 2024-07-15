import {OptionProps, QuizItemProps} from "@/src/types/compoment";
import {useEffect, useState} from "react";
import Option from "@/src/components/subject/Options";

export default function QuizItem ({question}:  { question: QuizItemProps, }) {

    const [readingAudio, setReadingAudio] = useState<boolean>(false)

    useEffect(() => {
        setReadingAudio(question.type === 'audio')
    }, [question]);

    const readingEnded = () => {
        setReadingAudio(false)

    }
    return (
        <div
            className="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] w-full max-w-2xl rounded-lg font-[sans-serif] overflow-hidden mt-4">
            <div className="p-6 relative">
                <h3 className="text-lg font-semibold">{question.text}</h3>

                {question.type === "audio" &&
                    <div className="flex justify-center items-center">
                        <video className=" h-[80px] w-full" controls={true} autoPlay={false} onEnded={readingEnded}>
                            <source src={question.link_audio} type="audio/mpeg"/>
                        </video>
                    </div>
                }

                {!readingAudio &&
                    <div className="flex flex-col gap-3 mt-5">
                        {question.options.map((option: OptionProps, index: number) =>
                            <Option key={index} option={option} idQuestion={question.id} type={question.optionType}/>
                        )}
                    </div>
                }
            </div>
        </div>
    )
}