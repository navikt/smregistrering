/* eslint-disable @typescript-eslint/no-redeclare */
import { z } from 'zod'

import { Papirsykmelding } from '../sykmelding/Papirsykmelding'

export const Oppgave = z.object({
    oppgaveid: z.number(),
    pdfPapirSykmelding: z.string(),
    fnr: z.string().nullable(), // TODO: remove
    sykmeldingId: z.string().nullable(), // TODO: remove
    papirSmRegistering: Papirsykmelding.nullable(),
})
export type Oppgave = z.infer<typeof Oppgave>
