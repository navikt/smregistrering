/* eslint-disable @typescript-eslint/no-redeclare */
import { z } from 'zod'

const Adresse = z.object({
    gate: z.string().nullable(),
    postnummer: z.number().nullable(),
    kommune: z.string().nullable(),
    postboks: z.string().nullable(),
    land: z.string().nullable(),
})

export const Behandler = z.object({
    fornavn: z.string(),
    mellomnavn: z.string().nullable(),
    etternavn: z.string(),
    aktoerId: z.string(),
    fnr: z.string(),
    hpr: z.string().nullable(),
    her: z.string().nullable(),
    adresse: Adresse,
    tlf: z.string().nullable(),
})
export type Behandler = z.infer<typeof Behandler>
