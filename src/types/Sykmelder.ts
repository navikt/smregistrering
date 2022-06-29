/* eslint-disable @typescript-eslint/no-redeclare */
import { z } from 'zod';

export const Helsepersonellkategori = z.enum([
    'AA',
    'AT',
    'AU',
    'BI',
    'ET',
    'FA1',
    'FA2',
    'FB',
    'FO',
    'FT',
    'HE',
    'HF',
    'HP',
    'JO',
    'KE',
    'KI',
    'LE',
    'NP',
    'OA',
    'OI',
    'OP',
    'OR',
    'OS',
    'PE',
    'PM',
    'PS',
    'RA',
    'SP',
    'TH',
    'TL',
    'TP',
    'TT',
    'VE',
    'VP',
    'XX',
    'MT',
]);

type Helsepersonellkategori = z.infer<typeof Helsepersonellkategori>;

export const HelsepersonellkategoriValues: Record<Helsepersonellkategori, string> = {
    AA: 'Ambulansearbeider',
    AT: 'ApotekteknikerA',
    AU: 'udiograf',
    BI: 'Bioingeniør',
    ET: 'Ergoterapeut',
    FA1: 'Provisorfarmasøyt',
    FA2: 'Reseptarfarmasøyt',
    FB: 'Fiskehelsebiolog',
    FO: 'Fotterapeut',
    FT: 'Fysioterapeut',
    HE: 'Helsesekretær',
    HF: 'Helsefagarbeider',
    HP: 'Hjelpepleier',
    JO: 'Jordmor',
    KE: 'Klinisk ernæringsfysiolog',
    KI: 'Kiropraktor',
    LE: 'Lege',
    NP: 'Naprapat',
    OA: 'Omsorgsarbeider',
    OI: 'Ortopediingeniør',
    OP: 'Optiker',
    OR: 'Ortoptist',
    OS: 'Osteopat',
    PE: 'Perfusjonist',
    PM: 'Paramedisiner',
    PS: 'Psykolog',
    RA: 'Radiograf',
    SP: 'Sykepleier',
    TH: 'Tannhelsesekretær',
    TL: 'Tannlege',
    TP: 'Tannpleier',
    TT: 'Tanntekniker',
    VE: 'Veterinær',
    VP: 'Vernepleier',
    XX: 'Ukjent/uspesifisert',
    MT: 'Manuellterapeut',
};

const HelsepersonellkategoriKode = z.object({
    aktiv: z.boolean(),
    oid: z.number(),
    verdi: Helsepersonellkategori.nullable(),
});

export const Autorisasjon = z.enum([
    '1',
    '17',
    '4',
    '3',
    '2',
    '14',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
    '16',
    '99',
    '18',
]);
type Autorisasjon = z.infer<typeof Autorisasjon>;

export const AutorisasjonValues: Record<Autorisasjon, string> = {
    '1': 'Autorisasjon',
    '17': 'Autorisasjon med vilkår',
    '4': 'Lisens',
    '3': 'Studentlisens',
    '2': 'Turnuslisens',
    '14': 'Midlertidig tjenesteyting',
    '6': 'Begrenset lisens med vilkår (inaktivt, utgått)',
    '7': 'Autorisasjon og allmennlege under veiled (inaktivt, utgått)',
    '8': 'Autorisasjon og godkjent allmennlege (inaktivt, utgått)',
    '9': 'Autorisasjon med godkj. innen implantp. (inaktivt, utgått)',
    '10': 'Autorisasjon,videreutd i manuell terapi (inaktivt, utgått)',
    '11': 'Turnuslisens,videreutd i manuell terapi (inaktivt, utgått)',
    '12': 'Lisens med godkj. innen implantp. (inaktivt, utgått)',
    '13': 'Godkjenning fra Mattilsynet (inaktivt, utgått)',
    '16': 'Godkjenning for privat praksis (inaktivt, utgått)',
    '99': 'Ingen autorisasjon (inaktivt, utgått)',
    '18': 'LIS1-Lisens',
};

const AutorisasjonKode = z.object({
    aktiv: z.boolean(),
    oid: z.number(),
    verdi: Autorisasjon.nullable(),
});

const Godkjenning = z.object({
    helsepersonellkategori: HelsepersonellkategoriKode.nullable(),
    autorisasjon: AutorisasjonKode.nullable(),
});

export const Sykmelder = z.object({
    hprNummer: z.string(),
    fnr: z.string(),
    godkjenninger: z.array(Godkjenning),
    fornavn: z.string().nullable(),
    mellomnavn: z.string().nullable(),
    etternavn: z.string().nullable(),
});
export type Sykmelder = z.infer<typeof Sykmelder>;
