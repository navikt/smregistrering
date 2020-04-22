import * as iots from 'io-ts';
import { either } from 'fp-ts/lib/Either';

// represents a Date from an ISO string
const DateFromString = new iots.Type<Date, string, unknown>(
    'DateFromString',
    (input: unknown): input is Date => input instanceof Date,
    (input, context) =>
        either.chain(iots.string.validate(input, context), str => {
            const date = new Date(str);
            return isNaN(date.getTime()) ? iots.failure(input, context) : iots.success(date);
        }),
    date => date.toISOString(),
);

// represents a base64 encoded PDF
const Base64Pdf = new iots.Type<string, string, unknown>(
    'Base64Pdf',
    (input: unknown): input is string => typeof input === 'string',
    (input, context) =>
        either.chain(iots.string.validate(input, context), str => {
            const b64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/; // regex for all valid b64 character combinations
            return b64regex.test(str) && atob(str).includes('%PDF') ? iots.success(str) : iots.failure(input, context);
        }),
    iots.identity,
);

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
