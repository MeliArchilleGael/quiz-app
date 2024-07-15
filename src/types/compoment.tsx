export type StepperProps = {
    num?: number,
    active?: boolean,
    lastElement?: boolean,
}

export type QuizItemProps = {
    id: number,
    options: OptionProps[],
    text: string,
    type: "audio" | "text" ,
    optionType: "checkbox" | "radio",
    link_audio ?: string
}

export type OptionProps = {
    id: number,
    text: string,
}