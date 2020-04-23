import * as iots from 'io-ts';

import { Base64Pdf, DateFromString } from './CustomTypes';

const RequiredProps = iots.type({
    sykmeldingId: iots.string,
    oppgaveid: iots.number,
    pdfPapirSykmelding: Base64Pdf,
});

const OptionalProps = iots.partial({
    journalpostId: iots.string,
    fnr: iots.string,
    aktorId: iots.string,
    dokumentInfoId: iots.string,
    datoOpprettet: DateFromString,
});

export const Oppgave = iots.intersection([RequiredProps, OptionalProps]);

export type Oppgave = iots.TypeOf<typeof Oppgave>;
