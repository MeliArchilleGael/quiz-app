"use client"
import {QuizItemProps, ResponseOption, StepperProps, Subject} from "@/src/types/compoment";
import Stepper from "@/src/components/subject/Stepper";
import {useEffect, useState} from "react";
import QuizItem from "@/src/components/subject/QuizItem";
import Auth from "@/src/components/Auth";
import QuestionTimer from "@/src/components/QuestionTimer";
import {calculateScore, ReadResult} from "@/src/actions/answer";
import {useSession} from "next-auth/react";
import Spinner from "@/src/components/ui/Spinner";

export default function SubjectDetails({params}: {
    params: { slug: string }
}) {

    const [steps, setSteps] = useState<StepperProps[]>([])

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0)

    const [questions, setQuestions] = useState<QuizItemProps[]>([])

    const [subject, setSubject] = useState<Subject>()

    const [subjectDurationInMilliseconds, setSubjectDurationInMilliseconds] = useState<number>()

    const [answerOption, setAnswerOption] = useState<ResponseOption[]>([])

    const [showRecap, setShowRecap] = useState<boolean>(false)

    const [showScore, setShowScore] = useState(false)

    const [timeEnd, setTimeEnd] = useState(false)

    const {data: session, status} = useSession();

    const [loadingSaveAnswers, setLoadingSaveAnswers] = useState(false)
    const [loadingReadData, setLoadingReadData] = useState(false)

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
        const fetchData = async () => {
            const userId = session?.user?.id
            if (userId) {
                try {
                    setLoadingReadData(true)
                    const subject = await fetch(`/api/subject/question?slug=${params.slug}&userId=${userId}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        cache: "no-cache"
                    });

                    const sub = await subject.json()

                    setQuestions([...sub.subject.questions])

                    setSubject({...sub.subject})

                    setSubjectDurationInMilliseconds(sub.subject.durationInMinutes * 60000)

                    setLoadingReadData(false)

                } catch (error: any) {
                    console.log("Error while fetching the data ", error)
                    setLoadingReadData(false)
                }
            }
        }

        fetchData()

    }, [params.slug, session?.user, showScore]);

    useEffect(() => {
        const update = async () => {
            const results = subject?.results
            const questions = subject?.questions

            if (results && questions)
                if (results?.length > 0 && questions.length > 0) {

                    const result = await ReadResult(questions)

                    setAnswerOption(result)

                    setShowScore(true)

                } else {
                    setShowScore(false)
                }
        }
        update()
    }, [subject]);


    const handleClickNext = () => {
        if (showRecap) {
            submitUserAnswer()
            return
        }
        let nextIndex = currentQuestionIndex
        if (currentQuestionIndex < questions.length - 1 /*&& questions[currentQuestionIndex].type!=="audio"*/) {

            nextIndex++

            setCurrentQuestionIndex(nextIndex)
            //update the stepper
            let currentStep = steps[nextIndex]

            currentStep.active = true

        } else {
            setShowRecap(true)
        }
        if (currentQuestionIndex <= questions.length - 1 /*&& questions[currentQuestionIndex].type!=="audio"*/) {
            const currentAnswer = answerOption[currentQuestionIndex]
            if (!currentAnswer) {
                console.log("One ", currentAnswer)
                updateAnswer({idOptions: [], question: questions[currentQuestionIndex]})
            }
        }
    }

    const submitUserAnswer = async () => {

        setLoadingSaveAnswers(true)

        const userId = session?.user?.id

        const data = await calculateScore(answerOption, userId, subject?.id)

        const result = await saveAnswer(data.answers, data.result)

        setShowScore(true)

        setLoadingSaveAnswers(false)
        console.log("Here is the result ", result)
        return
    }

    const saveAnswer = async (answers: any[], result: any) => {
        try {
            const data = {
                answers: answers,
                result: result
            }
            const res = await fetch("/api/subject/answer", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            return await res.json()

        } catch (error: any) {
            console.log("Error while saving the result ", error)
        }
    }

    const handleClickPrev = () => {
        let prevIndex = currentQuestionIndex
        if (showRecap) {
            setShowRecap(false)
            return
        }
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

    const updateAnswer = (response: ResponseOption) => {
        if (showRecap || showScore)
            return
        let answer = answerOption
        answer[currentQuestionIndex] = response
        answer[currentQuestionIndex].question = questions[currentQuestionIndex]
        setAnswerOption([...answer])
    }

    const TimeEndSubject = async () => {
        await setTimeEnd(true)
        await submitUserAnswer()
    }

    const TimeQuestionEnd = () => {
        handleClickNext()

        //console.log("Question time end & next call ")
    }

    return (
        <Auth>
            <div className="min-h-screen my-5 flex min-w-full items-center justify-center">
                {loadingReadData ?
                    <Spinner className="h-7 w-7 text-green-500"/>
                    :
                    !showScore ?
                        questions.length > 0 ?
                            <div>
                                <QuestionTimer timeEnd={TimeEndSubject} label="Fin du suject dans "
                                               timer={subjectDurationInMilliseconds}/>
                                <div className="flex items-center flex-wrap w-full mx-auto">
                                    <Stepper steps={steps} goTo={goTo}/>
                                </div>

                                <div className="mt-8">
                                    <div className="flex justify-center flex-col items-center gap-8">

                                        {showRecap ?
                                            answerOption.map((answer: ResponseOption, index: number) =>
                                                <QuizItem key={index} handleClickOption={
                                                    (data) => {
                                                        updateAnswer(data)
                                                    }}
                                                          question={answer.question}
                                                          answer={answer}
                                                          showingRecap={showRecap}
                                                          questionTimeEnded={TimeQuestionEnd}
                                                />)
                                            :
                                            <QuizItem
                                                handleClickOption={
                                                    (data) => {
                                                        updateAnswer(data)
                                                    }}
                                                question={questions[currentQuestionIndex]}
                                                answer={answerOption[currentQuestionIndex]}
                                                questionTimeEnded={TimeQuestionEnd}
                                            />
                                        }

                                        {(showRecap || (questions[currentQuestionIndex].mediaType !== "audio")) &&
                                            <div className="flex gap-8 ">
                                                {currentQuestionIndex > 0 &&
                                                    <button disabled={loadingSaveAnswers} onClick={handleClickPrev}
                                                            className={`border-2 bg-red-600 text-white px-8 py-2 rounded-md cursor-pointer ${loadingSaveAnswers ? 'cursor-not-allowed' : ''}`}>
                                                        Prev
                                                    </button>
                                                }
                                                <button disabled={loadingSaveAnswers} onClick={handleClickNext}
                                                        className={`border-2 bg-blue-800 text-white px-8 py-2 rounded-md ${loadingSaveAnswers ? 'cursor-not-allowed' : ''}`}>
                                                    {loadingSaveAnswers && <Spinner/>}
                                                    {showRecap ? <span>Enregistrer </span> : <span>Suivant</span>}
                                                </button>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                            :
                            <div>
                                {/*<div className="bg-white border-2 rounded-md shadow-2xl p-8">
                                    <p className="text-center py-5">Pas de question dans ce subjet </p>
                                </div>*/}
                            </div>

                        :
                        <div className="flex justify-center flex-col items-center gap-8">
                            {answerOption.map((answer: ResponseOption, index: number) =>
                                    <QuizItem key={index} handleClickOption={
                                        (data) => {
                                            updateAnswer(data)
                                        }}
                                              question={answer.question}
                                              answer={answer}
                                              showGoodAnswer={showScore}
                                              questionTimeEnded={TimeQuestionEnd}
                                    />
                                )
                            }
                        </div>
                    /*<div className="bg-white border-2 rounded-xl shadow-2xl p-8">
                        <p className="text-center py-5"> Vos réponses on été enregistré avec sucess </p>
                    </div>*/


                }
            </div>
        </Auth>
    )
}
