"use server"

import {OptionProps, ResponseOption} from "@/src/types/compoment";

export async function calculateScore(answerOption: ResponseOption[], userId: string, subjectId: string | undefined) {
    let point = 0

    let answers:any[] = []

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