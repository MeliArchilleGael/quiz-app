"use server"

import {OptionProps, QuizItemProps, ResponseOption} from "@/src/types/compoment";
import {revalidatePath} from "next/cache";

export async function calculateScore(answerOption: ResponseOption[], userId: string, subjectId: string | undefined) {
    let point = 0

    let answers: any[] = []

    answerOption.map((answer) => {

        //construct the AnswerTableStructure
        let ans: { userId: string, questionId: string | undefined, option: OptionProps[] } = {
            userId: userId,
            questionId: answer?.question?.id,
            option: [],
        }


        //calculate point
        if (answer?.question?.category) {
            const pointOfQuestion = answer.question.category.pointPerQuestion
            const options = answer.option
            let correctAnswer: boolean = true
            options?.map((option) => {
                if (!option.isCorrect)
                    correctAnswer = false
                ans.option.push(option)
            })
            if (correctAnswer)
                point += pointOfQuestion
        }

        answers.push(ans)
    })

    const result = {
        userId: userId,
        subjectId: subjectId,
        userScore: point,
    }

    return {
        result,
        answers
    }
}


export async function ReadResult(questions: QuizItemProps[]) {
    let answers: ResponseOption[] = []

    questions.map((question) => {
        if (question.answers) {
            let ans: ResponseOption = {
                idOptions: [],
                option: [],
                question: question
            }
            question.answers.map((answer) => {
                answer.optionChoose.map((optionChoose) => {
                    ans.idOptions.push(optionChoose.optionId)
                    const option: OptionProps = {
                        id: optionChoose.option?.id ?? '',
                        isCorrect: optionChoose.option?.isCorrect ?? false,
                        optionText: optionChoose.option?.optionText ?? "",
                    }
                    ans.option?.push(option)
                })
            })

            answers.push(ans)
        }
    })

    return answers
}

export async function ReadResultAdmin(searchPath?: string) {
    let search = null
    if (searchPath)
        search = searchPath

    console.log('Here is the search', search)

    const rs = await fetch(`${process.env.APP_URL}/api/result${search !== null ? '?search=' + search : ''}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-store"
    })

    return rs.json()
}