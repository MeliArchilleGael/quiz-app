export type StepperProps = {
    num?: number,
    active?: boolean,
    lastElement?: boolean,
}

export type Subject = {
    id: string,
    questions: QuizItemProps[],
    durationInMinutes: number,
    passScore: number,
    slug: string,
    subjectName: string,
    description: string,
    results ?: any[]
}

export type QuizItemProps = {
    id: string,
    options: OptionProps[],
    durationInSeconds: number,
    title: string,
    questionType: "multimedia" | "text",
    multipleChoice: boolean,
    mediaLink?: string,
    mediaType?: "audio" | "image",
    category?: Category,
    answers?: ResponseAnswer[]
}

export type Category = {
    pointPerQuestion: number
}

export type OptionProps = {
    id: string,
    optionText: string,
    isCorrect: boolean,
}

export type ResponseOption = {
    idOptions: string[],
    option?: OptionProps[],
    question?: QuizItemProps,
}

export type OptionChoose = {
    optionId: string,
    option?:OptionProps
}
export type ResponseAnswer = {
    id?: string,
    questionId?:string,
    optionChoose: OptionChoose [],
    userId?: string
}