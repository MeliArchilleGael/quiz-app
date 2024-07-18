export type StepperProps = {
    num?: number,
    active?: boolean,
    lastElement?: boolean,
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