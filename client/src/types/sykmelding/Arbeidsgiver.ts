/* eslint-disable @typescript-eslint/no-redeclare */
import { z } from 'zod';

export const HarArbeidsgiver = z.enum(['EN_ARBEIDSGIVER', 'FLERE_ARBEIDSGIVERE', 'INGEN_ARBEIDSGIVER']);
export type HarArbeidsgiver = z.infer<typeof HarArbeidsgiver>;

export const HarArbeidsgiverValues: Record<HarArbeidsgiver, string> = {
    EN_ARBEIDSGIVER: 'Én arbeidsgiver',
    FLERE_ARBEIDSGIVERE: 'Flere arbeidsgivere',
    INGEN_ARBEIDSGIVER: 'Ingen arbeidsgiver',
};

export const Arbeidsgiver = z.object({
    harArbeidsgiver: HarArbeidsgiver,
    navn: z.string().nullable(),
    yrkesbetegnelse: z.string().nullable(),
    stillingsprosent: z.number().nullable(),
});
export type Arbeidsgiver = z.infer<typeof Arbeidsgiver>;
