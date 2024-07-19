"use client"
import Link from "next/link";
import {QuizItemProps, StepperProps, Subject} from "@/src/types/compoment";
import Stepper from "@/src/components/subject/Stepper";
import {useEffect, useState} from "react";
import QuizItem from "@/src/components/subject/QuizItem";
import Auth from "@/src/components/Auth";
import QuestionTimer from "@/src/components/QuestionTimer";

export default function SubjectDetails({params}: {
    params: { slug: string }
}) {

    const [steps, setSteps] = useState<StepperProps[]>([])

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0)

    const [questions, setQuestions] = useState<QuizItemProps[]>([])

    const [subject, setSubject] = useState<Subject>()

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

    useEffect(() => {
        const fetchData = async  () => {
            try {
                const subject = await fetch(`/api/subject/question?slug=${params.slug}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                const sub = await subject.json()
                console.log("Here is the subject ", sub)

                setQuestions([...sub.subject.questions])
                setSubject({...sub.subject})

            }catch (error: any){
                console.log("Error while fetching the data ", error)
            }
        }

        fetchData()

    }, []);

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
            <div className="h-screen flex items-center justify-center">
                {questions.length > 0 ?
                    <div>
                        <QuestionTimer timer={subject?.durationInMinutes}/>
                        <div className="flex items-center flex-wrap w-full mx-auto">
                            <Stepper steps={steps} goTo={goTo}/>
                        </div>

                        <div className="mt-8">
                            <div className="flex justify-center flex-col items-center gap-8">

                                <QuizItem question={questions[currentQuestionIndex]}/>

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
                    :
                    <div>

                    </div>
                }
            </div>
        </Auth>
    )
}
