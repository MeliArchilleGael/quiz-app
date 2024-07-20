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
    result ?: any[]
}

export type QuizItemProps = {
    id: string,
    options: OptionProps[],
    durationInSeconds: number,
    title: string,
    questionType: "audio" | "text",
    multipleChoice: boolean,
    mediaLink?: string,
    category?: Category,
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