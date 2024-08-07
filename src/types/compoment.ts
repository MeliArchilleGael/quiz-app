import {DateTime} from "next-auth/providers/kakao";

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
    id?: string,
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

export type CreateSubjectFormType = {
    id?: string,
    subjectName: string,
    description: string,
    slug: string,
    passScore: number,
    maxScore: number,
    durationInMinutes: number,
}

export enum QuestionType {
    multimedia = "multimedia",
    text = "texte",
    null = ''
}

export enum MediaType {
    image = "image",
    audio = "audio",
    null = "",
}

export type CreateQuestionFormType = {
    id?:string,
    categoryId?: string,
    category?: any,
    subjectId?: string,
    title: string,
    questionType: QuestionType,
    mediaLink: string,
    mediaType: MediaType,
    durationInSeconds: number,
    multipleChoice: boolean,
    options?: OptionProps[],
    file?:any
}

export type CreateCategoryFormType = {
    categoryName : string,
    pointPerQuestion: number,
}


export type CreateUserType = {
    name: string,
    email: string,
    password: string,
    startDate: Date,
    endDate: Date,
}