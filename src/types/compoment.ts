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
    slug: string ,
    subjectName: string,
    description: string,
}

export type QuizItemProps = {
    id: string,
    options: OptionProps[],
    durationInSeconds: number,
    title: string,
    questionType: "audio" | "text" ,
    multipleChoice: boolean,
    mediaLink ?: string
}

export type OptionProps = {
    id: string,
    optionText: string,
    isCorrect: boolean,
}