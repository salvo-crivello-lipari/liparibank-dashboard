import { z } from 'zod'

export const loginFormSchema = z.object({
  email: z.email('Inserisci un indirizzo email valido'),
})

export type TLoginFormValues = z.infer<typeof loginFormSchema>
