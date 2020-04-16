import * as t from 'io-ts';
import { either } from 'fp-ts/lib/Either';

// represents a Date from an ISO string
const DateFromString = new t.Type<Date, string, unknown>(
    'DateFromString',
    (u): u is Date => u instanceof Date,
    (u, c) =>
        either.chain(t.string.validate(u, c), s => {
            const d = new Date(s);
            return isNaN(d.getTime()) ? t.failure(u, c) : t.success(d);
        }),
    a => a.toISOString(),
);

// represents a base64 encoded PDF
const Base64Pdf = new t.Type<string, string, unknown>(
    'Base64Pdf',
    (input: unknown): input is string => typeof input === 'string',
    (input, context) =>
        either.chain(t.string.validate(input, context), s => {
            const b64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/; // regex for all valid b64 character combinations
            return b64regex.test(s) && atob(s).includes('%PDF') ? t.success(s) : t.failure(input, context);
        }),
    t.identity,
);

// represents a fødselsnummer that is a string an 11 characters long
const FnrFromString = new t.Type<string, string, unknown>(
    'FnrFromString',
    (input: unknown): input is string => typeof input === 'string',
    (input, context) =>
        either.chain(t.string.validate(input, context), s => {
            const lenghtFnr = 11;
            return s.length === lenghtFnr ? t.success(s) : t.failure(input, context);
        }),
    t.identity,
);

const RequiredProps = t.type({
    sykmeldingId: t.string,
    oppgaveid: t.string,
    ferdigstilt: t.boolean,
    pdfPapirSmRegistrering: Base64Pdf,
});

const OptionalProps = t.partial({
    journalpostId: t.string,
    fnr: FnrFromString,
    aktorId: t.string,
    dokumentInfoId: t.string,
    datoOpprettet: DateFromString,
});

export const Oppgave = t.intersection([RequiredProps, OptionalProps]);

export type Oppgave = t.TypeOf<typeof Oppgave>;
