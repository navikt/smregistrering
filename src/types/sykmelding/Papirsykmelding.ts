/* eslint-disable @typescript-eslint/no-redeclare */
import { z } from 'zod';

import { Arbeidsgiver } from './Arbeidsgiver';
import { Behandler } from './Behandler';
import { KontaktMedPasient } from './KontaktMedPasient';
import { MedisinskVurdering } from './MedisinskVurdering';
import { MeldingTilNAV } from './MeldingTilNav';
import { Periode } from './Periode';

export const Papirsykmelding = z.object({
    fnr: z.string().nullable(),
    datoOpprettet: z.string().nullable(),
    syketilfelleStartDato: z.string().nullable(),
    arbeidsgiver: Arbeidsgiver.nullable(),
    medisinskVurdering: MedisinskVurdering.nullable(),
    skjermesForPasient: z.boolean().nullable(),
    perioder: z.array(Periode).nullable(),
    meldingTilNAV: MeldingTilNAV.nullable(),
    meldingTilArbeidsgiver: z.string().nullable(),
    kontaktMedPasient: KontaktMedPasient.nullable(),
    behandletTidspunkt: z.string().nullable(),
    behandler: Behandler.nullable(),
});
export type Papirsykmelding = z.infer<typeof Papirsykmelding>;
