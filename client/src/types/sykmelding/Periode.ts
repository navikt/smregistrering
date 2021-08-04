/* eslint-disable @typescript-eslint/no-redeclare */
import { z } from 'zod';

const MedisinskArsakType = z.enum([
    'TILSTAND_HINDRER_AKTIVITET',
    'AKTIVITET_FORVERRER_TILSTAND',
    'AKTIVITET_FORHINDRER_BEDRING',
    'ANNET',
]);
type MedisinskArsakType = z.infer<typeof MedisinskArsakType>;

export const MedisinskArsakTypeValues: Record<MedisinskArsakType, string> = {
    TILSTAND_HINDRER_AKTIVITET: 'Helsetilstanden hindrer pasienten i å være i aktivitet',
    AKTIVITET_FORVERRER_TILSTAND: 'Aktivitet vil forverre helsetilstanden',
    AKTIVITET_FORHINDRER_BEDRING: 'Aktivitet vil hindre/forsinke bedring av helsetilstanden',
    ANNET: 'Annet',
};

const MedisinskArsak = z.object({
    beskrivelse: z.string().nullable(),
    arsak: z.array(MedisinskArsakType),
});

const ArbeidsrelatertArsakType = z.enum(['MANGLENDE_TILRETTELEGGING', 'ANNET']);
type ArbeidsrelatertArsakType = z.infer<typeof ArbeidsrelatertArsakType>;

export const ArbeidsrelatertArsakTypeValues: Record<ArbeidsrelatertArsakType, string> = {
    MANGLENDE_TILRETTELEGGING: 'Manglende tilrettelegging på arbeidsplassen',
    ANNET: 'Annet',
};

const ArbeidsrelatertArsak = z.object({
    beskrivelse: z.string().nullable(),
    arsak: z.array(ArbeidsrelatertArsakType),
});

const AktivitetIkkeMulig = z.object({
    medisinskArsak: MedisinskArsak.nullable(),
    arbeidsrelatertArsak: ArbeidsrelatertArsak.nullable(),
});

const Gradert = z.object({
    reisetilskudd: z.boolean(),
    grad: z.number().nullable(),
});

export const Periode = z.object({
    fom: z.string().transform((arg) => new Date(arg)),
    tom: z.string().transform((arg) => new Date(arg)),
    aktivitetIkkeMulig: AktivitetIkkeMulig.nullable(),
    avventendeInnspillTilArbeidsgiver: z.string().nullable(),
    behandlingsdager: z.number().nullable(),
    gradert: Gradert.nullable(),
    reisetilskudd: z.boolean(),
});
export type Periode = z.infer<typeof Periode>;
