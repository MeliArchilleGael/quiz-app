"use client"
import Link from "next/link";
import {QuizItemProps, StepperProps} from "@/src/types/compoment";
import Stepper from "@/src/components/subject/Stepper";
import {useEffect, useState} from "react";
import QuizItem from "@/src/components/subject/QuizItem";
import Auth from "@/src/components/Auth";

export default function SubjectDetails({params}: {
    params: { slug: string }
}) {

    const [steps, setSteps] = useState<StepperProps[]>([])

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0)

    const questions: QuizItemProps[] = [
        {
            id: 1,
            options: [
                {
                    id: 1,
                    text: "Here is the option 1"
                },
                {
                    id: 2,
                    text: "Here is the option 2"
                },
                {
                    id: 3,
                    text: "Here is the option 3"
                }
            ],
            text: "Ecoutez l'audio suivant : ",
            type: "audio",
            optionType: "checkbox",
            link_audio: "/river.mp3"
        },
        {
            id: 2,
            options: [
                {
                    id: 11,
                    text: "Here is the option 1"
                },
                {
                    id: 21,
                    text: "Here is the option 2"
                },
                {
                    id: 31,
                    text: "Here is the option 3"
                }
            ],
            text: "Here is the question 2",
            type: "text",
            optionType: "radio",
            link_audio: ""
        },
        {
            id: 3,
            options: [
                {
                    id: 1,
                    text: "Here is the option 1"
                },
                {
                    id: 2,
                    text: "Here is the option 2"
                },
                {
                    id: 3,
                    text: "Here is the option 3"
                }
            ],
            text: "Here is the question 3",
            type: "text",
            optionType: "checkbox",
            link_audio: ""
        },
        {
            id: 3,
            options: [
                {
                    id: 1,
                    text: "Here is the option 1"
                },
                {
                    id: 2,
                    text: "Here is the option 2"
                },
                {
                    id: 3,
                    text: "Here is the option 3"
                }
            ],
            text: "Here is the question 3",
            type: "text",
            optionType: "checkbox",
            link_audio: ""
        },
        {
            id: 3,
            options: [
                {
                    id: 1,
                    text: "Here is the option 1"
                },
                {
                    id: 2,
                    text: "Here is the option 2"
                },
                {
                    id: 3,
                    text: "Here is the option 3"
                }
            ],
            text: "Here is the question 3",
            type: "text",
            optionType: "checkbox",
            link_audio: ""
        },
        {
            id: 3,
            options: [
                {
                    id: 1,
                    text: "Here is the option 1"
                },
                {
                    id: 2,
                    text: "Here is the option 2"
                },
                {
                    id: 3,
                    text: "Here is the option 3"
                }
            ],
            text: "Here is the question 3",
            type: "text",
            optionType: "checkbox",
            link_audio: ""
        }, {
            id: 3,
            options: [
                {
                    id: 1,
                    text: "Here is the option 1"
                },
                {
                    id: 2,
                    text: "Here is the option 2"
                },
                {
                    id: 3,
                    text: "Here is the option 3"
                }
            ],
            text: "Here is the question 3",
            type: "text",
            optionType: "checkbox",
            link_audio: ""
        },
        {
            id: 3,
            options: [
                {
                    id: 1,
                    text: "Here is the option 1"
                },
                {
                    id: 2,
                    text: "Here is the option 2"
                },
                {
                    id: 3,
                    text: "Here is the option 3"
                }
            ],
            text: "Here is the question 3",
            type: "text",
            optionType: "checkbox",
            link_audio: ""
        }, {
            id: 3,
            options: [
                {
                    id: 1,
                    text: "Here is the option 1"
                },
                {
                    id: 2,
                    text: "Here is the option 2"
                },
                {
                    id: 3,
                    text: "Here is the option 3"
                }
            ],
            text: "Here is the question 3",
            type: "text",
            optionType: "checkbox",
            link_audio: ""
        }, {
            id: 3,
            options: [
                {
                    id: 1,
                    text: "Here is the option 1"
                },
                {
                    id: 2,
                    text: "Here is the option 2"
                },
                {
                    id: 3,
                    text: "Here is the option 3"
                }
            ],
            text: "Here is the question 3",
            type: "text",
            optionType: "checkbox",
            link_audio: ""
        }, {
            id: 3,
            options: [
                {
                    id: 1,
                    text: "Here is the option 1"
                },
                {
                    id: 2,
                    text: "Here is the option 2"
                },
                {
                    id: 3,
                    text: "Here is the option 3"
                }
            ],
            text: "Here is the question 3",
            type: "text",
            optionType: "checkbox",
            link_audio: ""
        },

        {
            id: 3,
            options: [
                {
                    id: 1,
                    text: "Here is the option 1"
                },
                {
                    id: 2,
                    text: "Here is the option 2"
                },
                {
                    id: 3,
                    text: "Here is the option 3"
                }
            ],
            text: "Here is the question 3",
            type: "text",
            optionType: "checkbox",
            link_audio: ""
        }, {
            id: 3,
            options: [
                {
                    id: 1,
                    text: "Here is the option 1"
                },
                {
                    id: 2,
                    text: "Here is the option 2"
                },
                {
                    id: 3,
                    text: "Here is the option 3"
                }
            ],
            text: "Here is the question 3",
            type: "text",
            optionType: "checkbox",
            link_audio: ""
        }, {
            id: 3,
            options: [
                {
                    id: 1,
                    text: "Here is the option 1"
                },
                {
                    id: 2,
                    text: "Here is the option 2"
                },
                {
                    id: 3,
                    text: "Here is the option 3"
                }
            ],
            text: "Here is the question 3",
            type: "text",
            optionType: "checkbox",
            link_audio: ""
        }, {
            id: 3,
            options: [
                {
                    id: 1,
                    text: "Here is the option 1"
                },
                {
                    id: 2,
                    text: "Here is the option 2"
                },
                {
                    id: 3,
                    text: "Here is the option 3"
                }
            ],
            text: "Here is the question 3",
            type: "text",
            optionType: "checkbox",
            link_audio: ""
        }, {
            id: 3,
            options: [
                {
                    id: 1,
                    text: "Here is the option 1"
                },
                {
                    id: 2,
                    text: "Here is the option 2"
                },
                {
                    id: 3,
                    text: "Here is the option 3"
                }
            ],
            text: "Here is the question 3",
            type: "text",
            optionType: "checkbox",
            link_audio: ""
        }, {
            id: 3,
            options: [
                {
                    id: 1,
                    text: "Here is the option 1"
                },
                {
                    id: 2,
                    text: "Here is the option 2"
                },
                {
                    id: 3,
                    text: "Here is the option 3"
                }
            ],
            text: "Here is the question 3",
            type: "text",
            optionType: "checkbox",
            link_audio: ""
        }, {
            id: 3,
            options: [
                {
                    id: 1,
                    text: "Here is the option 1"
                },
                {
                    id: 2,
                    text: "Here is the option 2"
                },
                {
                    id: 3,
                    text: "Here is the option 3"
                }
            ],
            text: "Here is the question 3",
            type: "text",
            optionType: "checkbox",
            link_audio: ""
        }, {
            id: 3,
            options: [
                {
                    id: 1,
                    text: "Here is the option 1"
                },
                {
                    id: 2,
                    text: "Here is the option 2"
                },
                {
                    id: 3,
                    text: "Here is the option 3"
                }
            ],
            text: "Here is the question 3",
            type: "text",
            optionType: "checkbox",
            link_audio: ""
        }, {
            id: 3,
            options: [
                {
                    id: 1,
                    text: "Here is the option 1"
                },
                {
                    id: 2,
                    text: "Here is the option 2"
                },
                {
                    id: 3,
                    text: "Here is the option 3"
                }
            ],
            text: "Here is the question 3",
            type: "text",
            optionType: "checkbox",
            link_audio: ""
        }, {
            id: 3,
            options: [
                {
                    id: 1,
                    text: "Here is the option 1"
                },
                {
                    id: 2,
                    text: "Here is the option 2"
                },
                {
                    id: 3,
                    text: "Here is the option 3"
                }
            ],
            text: "Here is the question 3",
            type: "text",
            optionType: "checkbox",
            link_audio: ""
        }, {
            id: 3,
            options: [
                {
                    id: 1,
                    text: "Here is the option 1"
                },
                {
                    id: 2,
                    text: "Here is the option 2"
                },
                {
                    id: 3,
                    text: "Here is the option 3"
                }
            ],
            text: "Here is the question 3",
            type: "text",
            optionType: "checkbox",
            link_audio: ""
        }, {
            id: 3,
            options: [
                {
                    id: 1,
                    text: "Here is the option 1"
                },
                {
                    id: 2,
                    text: "Here is the option 2"
                },
                {
                    id: 3,
                    text: "Here is the option 3"
                }
            ],
            text: "Here is the question 3",
            type: "text",
            optionType: "checkbox",
            link_audio: ""
        }, {
            id: 3,
            options: [
                {
                    id: 1,
                    text: "Here is the option 1"
                },
                {
                    id: 2,
                    text: "Here is the option 2"
                },
                {
                    id: 3,
                    text: "Here is the option 3"
                }
            ],
            text: "Here is the question 3",
            type: "text",
            optionType: "checkbox",
            link_audio: ""
        },

        {
            id: 3,
            options: [
                {
                    id: 1,
                    text: "Here is the option 1"
                },
                {
                    id: 2,
                    text: "Here is the option 2"
                },
                {
                    id: 3,
                    text: "Here is the option 3"
                }
            ],
            text: "Here is the question 3",
            type: "text",
            optionType: "checkbox",
            link_audio: ""
        },
        {
            id: 3,
            options: [
                {
                    id: 1,
                    text: "Here is the option 1"
                },
                {
                    id: 2,
                    text: "Here is the option 2"
                },
                {
                    id: 3,
                    text: "Here is the option 3"
                }
            ],
            text: "Here is the question 3",
            type: "text",
            optionType: "checkbox",
            link_audio: ""
        },
        {
            id: 3,
            options: [
                {
                    id: 1,
                    text: "Here is the option 1"
                },
                {
                    id: 2,
                    text: "Here is the option 2"
                },
                {
                    id: 3,
                    text: "Here is the option 3"
                }
            ],
            text: "Here is the question 3",
            type: "text",
            optionType: "checkbox",
            link_audio: ""
        },
        {
            id: 3,
            options: [
                {
                    id: 1,
                    text: "Here is the option 1"
                },
                {
                    id: 2,
                    text: "Here is the option 2"
                },
                {
                    id: 3,
                    text: "Here is the option 3"
                }
            ],
            text: "Here is the question 3",
            type: "text",
            optionType: "checkbox",
            link_audio: ""
        }, {
            id: 3,
            options: [
                {
                    id: 1,
                    text: "Here is the option 1"
                },
                {
                    id: 2,
                    text: "Here is the option 2"
                },
                {
                    id: 3,
                    text: "Here is the option 3"
                }
            ],
            text: "Here is the question 3",
            type: "text",
            optionType: "checkbox",
            link_audio: ""
        },
        {
            id: 3,
            options: [
                {
                    id: 1,
                    text: "Here is the option 1"
                },
                {
                    id: 2,
                    text: "Here is the option 2"
                },
                {
                    id: 3,
                    text: "Here is the option 3"
                }
            ],
            text: "Here is the question 3",
            type: "text",
            optionType: "checkbox",
            link_audio: ""
        }, {
            id: 3,
            options: [
                {
                    id: 1,
                    text: "Here is the option 1"
                },
                {
                    id: 2,
                    text: "Here is the option 2"
                },
                {
                    id: 3,
                    text: "Here is the option 3"
                }
            ],
            text: "Here is the question 3",
            type: "text",
            optionType: "checkbox",
            link_audio: ""
        }, {
            id: 3,
            options: [
                {
                    id: 1,
                    text: "Here is the option 1"
                },
                {
                    id: 2,
                    text: "Here is the option 2"
                },
                {
                    id: 3,
                    text: "Here is the option 3"
                }
            ],
            text: "Here is the question 3",
            type: "text",
            optionType: "checkbox",
            link_audio: ""
        }, {
            id: 3,
            options: [
                {
                    id: 1,
                    text: "Here is the option 1"
                },
                {
                    id: 2,
                    text: "Here is the option 2"
                },
                {
                    id: 3,
                    text: "Here is the option 3"
                }
            ],
            text: "Here is the question 3",
            type: "text",
            optionType: "checkbox",
            link_audio: ""
        },

        {
            id: 3,
            options: [
                {
                    id: 1,
                    text: "Here is the option 1"
                },
                {
                    id: 2,
                    text: "Here is the option 2"
                },
                {
                    id: 3,
                    text: "Here is the option 3"
                }
            ],
            text: "Here is the question 3",
            type: "text",
            optionType: "checkbox",
            link_audio: ""
        }, {
            id: 3,
            options: [
                {
                    id: 1,
                    text: "Here is the option 1"
                },
                {
                    id: 2,
                    text: "Here is the option 2"
                },
                {
                    id: 3,
                    text: "Here is the option 3"
                }
            ],
            text: "Here is the question 3",
            type: "text",
            optionType: "checkbox",
            link_audio: ""
        }, {
            id: 3,
            options: [
                {
                    id: 1,
                    text: "Here is the option 1"
                },
                {
                    id: 2,
                    text: "Here is the option 2"
                },
                {
                    id: 3,
                    text: "Here is the option 3"
                }
            ],
            text: "Here is the question 3",
            type: "text",
            optionType: "checkbox",
            link_audio: ""
        }, {
            id: 3,
            options: [
                {
                    id: 1,
                    text: "Here is the option 1"
                },
                {
                    id: 2,
                    text: "Here is the option 2"
                },
                {
                    id: 3,
                    text: "Here is the option 3"
                }
            ],
            text: "Here is the question 3",
            type: "text",
            optionType: "checkbox",
            link_audio: ""
        }, {
            id: 3,
            options: [
                {
                    id: 1,
                    text: "Here is the option 1"
                },
                {
                    id: 2,
                    text: "Here is the option 2"
                },
                {
                    id: 3,
                    text: "Here is the option 3"
                }
            ],
            text: "Here is the question 3",
            type: "text",
            optionType: "checkbox",
            link_audio: ""
        }, {
            id: 3,
            options: [
                {
                    id: 1,
                    text: "Here is the option 1"
                },
                {
                    id: 2,
                    text: "Here is the option 2"
                },
                {
                    id: 3,
                    text: "Here is the option 3"
                }
            ],
            text: "Here is the question 3",
            type: "text",
            optionType: "checkbox",
            link_audio: ""
        }, {
            id: 3,
            options: [
                {
                    id: 1,
                    text: "Here is the option 1"
                },
                {
                    id: 2,
                    text: "Here is the option 2"
                },
                {
                    id: 3,
                    text: "Here is the option 3"
                }
            ],
            text: "Here is the question 3",
            type: "text",
            optionType: "checkbox",
            link_audio: ""
        }, {
            id: 3,
            options: [
                {
                    id: 1,
                    text: "Here is the option 1"
                },
                {
                    id: 2,
                    text: "Here is the option 2"
                },
                {
                    id: 3,
                    text: "Here is the option 3"
                }
            ],
            text: "Here is the question 3",
            type: "text",
            optionType: "checkbox",
            link_audio: ""
        }, {
            id: 3,
            options: [
                {
                    id: 1,
                    text: "Here is the option 1"
                },
                {
                    id: 2,
                    text: "Here is the option 2"
                },
                {
                    id: 3,
                    text: "Here is the option 3"
                }
            ],
            text: "Here is the question 3",
            type: "text",
            optionType: "checkbox",
            link_audio: ""
        }, {
            id: 3,
            options: [
                {
                    id: 1,
                    text: "Here is the option 1"
                },
                {
                    id: 2,
                    text: "Here is the option 2"
                },
                {
                    id: 3,
                    text: "Here is the option 3"
                }
            ],
            text: "Here is the question 3",
            type: "text",
            optionType: "checkbox",
            link_audio: ""
        }, {
            id: 3,
            options: [
                {
                    id: 1,
                    text: "Here is the option 1"
                },
                {
                    id: 2,
                    text: "Here is the option 2"
                },
                {
                    id: 3,
                    text: "Here is the option 3"
                }
            ],
            text: "Here is the question 3",
            type: "text",
            optionType: "checkbox",
            link_audio: ""
        }, {
            id: 3,
            options: [
                {
                    id: 1,
                    text: "Here is the option 1"
                },
                {
                    id: 2,
                    text: "Here is the option 2"
                },
                {
                    id: 3,
                    text: "Here is the option 3"
                }
            ],
            text: "Here is the question 3",
            type: "text",
            optionType: "checkbox",
            link_audio: ""
        }, {
            id: 3,
            options: [
                {
                    id: 1,
                    text: "Here is the option 1"
                },
                {
                    id: 2,
                    text: "Here is the option 2"
                },
                {
                    id: 3,
                    text: "Here is the option 3"
                }
            ],
            text: "Here is the question 3",
            type: "text",
            optionType: "checkbox",
            link_audio: ""
        },

    ]

    useEffect(() => {
        const numberQuestion = questions.length
        if (numberQuestion > 0) {
            let st: StepperProps[] = []
            for (let i = 0; i < numberQuestion; i++) {
                const newStep: StepperProps = {
                    num: i + 1,
                    active: i === 0,
                    lastElement: i === numberQuestion - 1,
                }
                st = [...st, newStep]
            }

            setSteps(st)
        }
    }, [questions.length]);

    const handleClickNext = () => {
        let nextIndex = currentQuestionIndex
        if (currentQuestionIndex < questions.length - 1 /*&& questions[currentQuestionIndex].type!=="audio"*/) {
            nextIndex++
            setCurrentQuestionIndex(nextIndex)

            //update the stepper
            let currentStep = steps[nextIndex]
            currentStep.active = true

        }
    }

    const handleClickPrev = () => {
        let prevIndex = currentQuestionIndex
        if (currentQuestionIndex > 0 /*&& questions[currentQuestionIndex].type!=="audio"*/) {
            prevIndex--
            setCurrentQuestionIndex(prevIndex)

            let currentStep = steps[currentQuestionIndex]
            currentStep.active = false
        }
    }

    const goTo = (index: number) => {
        if (index < questions.length) {
            setCurrentQuestionIndex(index)
        }
    }

    return (
        <Auth>
            <div className="my-10">
                <div className="flex items-center max-w-screen-lg flex-wrap w-full mx-auto">
                    <Stepper steps={steps} goTo={goTo}/>
                </div>

                <div className="mt-8">
                    <div className="flex justify-center flex-col items-center gap-8">

                        {<QuizItem question={questions[currentQuestionIndex]}/>}


                        <div className="flex gap-8 ">
                            <button onClick={handleClickPrev}
                                    className="border-2 bg-red-600 text-white px-8 py-2 rounded-md">
                                Prev
                            </button>
                            <button onClick={handleClickNext}
                                    className="border-2 bg-blue-800 text-white px-8 py-2 rounded-md">
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Auth>
    )
}
