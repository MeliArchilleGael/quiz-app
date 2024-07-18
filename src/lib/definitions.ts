import  {z} from 'zod'

export const SignInFormSchema = z.object({

    email: z.string().email({ message: 'Adresse email invalide .' }).trim(),
    password: z
        .string()
        .min(8, { message: 'Le mot de pass doit avoir au moins 8 caractéres ' })
        .regex(/[a-zA-Z]/, { message: 'Doit contenir au moins une lettre.' })
        .trim(),
})

export type FormState = | {
    errors?: {
        name?: string[]
        email?: string[]
        password?: string[]
    }
    message?: string
}
    | undefined

export type SessionPayload = {

} | undefined