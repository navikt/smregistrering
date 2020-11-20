import * as iots from 'io-ts';

export enum Helsepersonellkategori {
    'AA' = 'Ambulansearbeider',
    'AT' = 'ApotekteknikerA',
    'AU' = 'udiograf',
    'BI' = 'Bioingeniør',
    'ET' = 'Ergoterapeut',
    'FA1' = 'Provisorfarmasøyt',
    'FA2' = 'Reseptarfarmasøyt',
    'FB' = 'Fiskehelsebiolog',
    'FO' = 'Fotterapeut',
    'FT' = 'Fysioterapeut',
    'HE' = 'Helsesekretær',
    'HF' = 'Helsefagarbeider',
    'HP' = 'Hjelpepleier',
    'JO' = 'Jordmor',
    'KE' = 'Klinisk ernæringsfysiolog',
    'KI' = 'Kiropraktor',
    'LE' = 'Lege',
    'OA' = 'Omsorgsarbeider',
    'OI' = 'Ortopediingeniør',
    'OP' = 'Optiker',
    'OR' = 'Ortoptist',
    'PE' = 'Perfusjonist',
    'PS' = 'Psykolog',
    'RA' = 'Radiograf',
    'SP' = 'Sykepleier',
    'TH' = 'Tannhelsesekretær',
    'TL' = 'Tannlege',
    'TP' = 'Tannpleier',
    'TT' = 'Tanntekniker',
    'VE' = 'Veterinær',
    'VP' = 'Vernepleier',
    'XX' = 'Ukjent/uspesifisert',
    'MT' = 'Manuellterapeut',
}

const HelsepersonellkategoriKode = iots.intersection([
    iots.type({
        aktiv: iots.boolean,
        oid: iots.number,
    }),
    iots.partial({
        verdi: iots.union([iots.keyof(Helsepersonellkategori), iots.null]),
    }),
]);

const AutorisasjonKode = iots.intersection([
    iots.type({
        aktiv: iots.boolean,
        oid: iots.number,
    }),
    iots.partial({
        verdi: iots.union([iots.string, iots.null]),
    }),
]);

const Godkjenning = iots.partial({
    helsepersonellkategori: iots.union([HelsepersonellkategoriKode, iots.null]),
    autorisasjon: iots.union([AutorisasjonKode, iots.null]),
});

export const Sykmelder = iots.intersection([
    iots.type({
        hprNummer: iots.string,
        fnr: iots.string,
        aktorId: iots.string,
        godkjenninger: iots.array(Godkjenning),
    }),
    iots.partial({
        fornavn: iots.union([iots.string, iots.null]),
        mellomnavn: iots.union([iots.string, iots.null]),
        etternavn: iots.union([iots.string, iots.null]),
    }),
]);
export type Sykmelder = iots.TypeOf<typeof Sykmelder>;
