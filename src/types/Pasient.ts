/* eslint-disable @typescript-eslint/no-redeclare */
import { z } from 'zod'

export const PasientNavn = z.object({
    fornavn: z.string(),
    etternavn: z.string(),
    mellomnavn: z.string().nullable(),
})
export type PasientNavn = z.infer<typeof PasientNavn>
