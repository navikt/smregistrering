import * as iots from 'io-ts';

import {
    Arbeidsgiver,
    Behandler,
    KontaktMedPasient,
    MedisinskVurdering,
    MeldingTilNAV,
    Periode,
    Prognose,
} from './RegistrertSykmelding';
import { Base64Pdf, DateFromString, DateTimeFromString } from './CustomTypes';

const PapirSmRegistering = iots.partial({
    fnr: iots.union([iots.string, iots.null]),
    datoOpprettet: iots.union([DateTimeFromString, iots.null]),
    syketilfelleStartDato: iots.union([DateFromString, iots.null]),
    arbeidsgiver: iots.union([Arbeidsgiver, iots.null]),
    medisinskVurdering: iots.union([MedisinskVurdering, iots.null]),
    skjermesForPasient: iots.union([iots.boolean, iots.null]),
    perioder: iots.union([iots.array(Periode), iots.null]),
    prognose: iots.union([Prognose, iots.null]),
    tiltakNAV: iots.union([iots.string, iots.null]),
    tiltakArbeidsplassen: iots.union([iots.string, iots.null]),
    andreTiltak: iots.union([iots.string, iots.null]),
    meldingTilNAV: iots.union([MeldingTilNAV, iots.null]),
    meldingTilArbeidsgiver: iots.union([iots.string, iots.null]),
    kontaktMedPasient: iots.union([KontaktMedPasient, iots.null]),
    behandletTidspunkt: iots.union([DateFromString, iots.null]),
    behandler: iots.union([Behandler, iots.null]),
});
export type PapirSmRegistering = iots.TypeOf<typeof PapirSmRegistering>;

export const Oppgave = iots.intersection([
    iots.type({
        oppgaveid: iots.number,
        pdfPapirSykmelding: Base64Pdf,
    }),
    iots.partial({
        fnr: iots.union([iots.string, iots.null]), // TODO: fjerne herfra siden den allerede er i PapirSmRegistering
        sykmeldingId: iots.union([iots.string, iots.null]), // Fjerne?
        papirSmRegistering: iots.union([PapirSmRegistering, iots.null]),
    }),
]);

export type Oppgave = iots.TypeOf<typeof Oppgave>;
