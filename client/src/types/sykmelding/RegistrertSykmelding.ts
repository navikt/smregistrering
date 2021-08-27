/* eslint-disable @typescript-eslint/no-redeclare */
import { z } from 'zod';

import { Arbeidsgiver } from './Arbeidsgiver';
import { Behandler } from './Behandler';
import { KontaktMedPasient } from './KontaktMedPasient';
import { MedisinskVurdering } from './MedisinskVurdering';
import { MeldingTilNAV } from './MeldingTilNav';
import { Periode } from './Periode';

export const RegistrertSykmelding = z.object({
    pasientFnr: z.string(),
    sykmelderFnr: z.string(),
    perioder: z.array(Periode),
    medisinskVurdering: MedisinskVurdering,
    arbeidsgiver: Arbeidsgiver,
    behandletDato: z.string(),
    skjermesForPasient: z.boolean(),
    behandler: Behandler,
    kontaktMedPasient: KontaktMedPasient,
    syketilfelleStartDato: z.string().nullable(),
    meldingTilNAV: MeldingTilNAV.nullable(),
    meldingTilArbeidsgiver: z.string().nullable(),
    harUtdypendeOpplysninger: z.boolean().nullable(),
    navnFastlege: z.string().nullable(),
});
export type RegistrertSykmelding = z.infer<typeof RegistrertSykmelding>;
