import * as iots from 'io-ts';

import { DateFromString, createEnumType } from './CustomTypes';

export enum MedisinskArsakType {
    TILSTAND_HINDRER_AKTIVITET = 'Helsetilstanden hindrer pasienten i å være i aktivitet',
    AKTIVITET_FORVERRER_TILSTAND = 'Aktivitet vil forverre helsetilstanden',
    AKTIVITET_FORHINDRER_BEDRING = 'Aktivitet vil hindre/forsinke bedring av helsetilstanden',
    ANNET = 'Annet',
}

export enum ArbeidsrelatertArsakType {
    MANGLENDE_TILRETTELEGGING = 'Manglende tilrettelegging på arbeidsplassen',
    ANNET = 'Annet',
}

export enum AnnenFraverGrunn {
    GODKJENT_HELSEINSTITUSJON = 'Når vedkommende er innlagt i en godkjent helseinstitusjon',
    BEHANDLING_FORHINDRER_ARBEID = 'Når vedkommende er under behandling og legen erklærer at behandlingen gjør det nødvendig at vedkommende ikke arbeider',
    ARBEIDSRETTET_TILTAK = 'Når vedkommende deltar på et arbeidsrettet tiltak',
    MOTTAR_TILSKUDD_GRUNNET_HELSETILSTAND = 'Når vedkommende på grunn av sykdom, skade eller lyte får tilskott når vedkommende på grunn av sykdom, skade eller lyte får tilskott',
    NODVENDIG_KONTROLLUNDENRSOKELSE = 'Når vedkommende er til nødvendig kontrollundersøkelse som krever minst 24 timers fravær, reisetid medregnet',
    SMITTEFARE = 'Når vedkommende myndighet har nedlagt forbud mot at han eller hun arbeider på grunn av smittefare',
    ABORT = 'Når vedkommende er arbeidsufør som følge av svangerskapsavbrudd',
    UFOR_GRUNNET_BARNLOSHET = 'Når vedkommende er arbeidsufør som følge av behandling for barnløshet',
    DONOR = 'Når vedkommende er donor eller er under vurdering som donor',
    BEHANDLING_STERILISERING = 'Når vedkommende er arbeidsufør som følge av behandling i forbindelse med sterilisering',
}

export enum HarArbeidsgiver {
    EN_ARBEIDSGIVER = 'Én arbeidsgiver',
    FLERE_ARBEIDSGIVERE = 'Flere arbeidsgivere',
    INGEN_ARBEIDSGIVER = 'Ingen arbeidsgiver',
}

const MedisinskArsak = iots.intersection([
    iots.type({
        arsak: iots.array(createEnumType<MedisinskArsakType>(MedisinskArsakType, 'MedisinskArsakType')),
    }),
    iots.partial({
        beskrivelse: iots.union([iots.string, iots.null]),
    }),
]);
export type MedisinskArsak = iots.TypeOf<typeof MedisinskArsak>;

const ArbeidsrelatertArsak = iots.intersection([
    iots.type({
        arsak: iots.array(
            createEnumType<ArbeidsrelatertArsakType>(ArbeidsrelatertArsakType, 'ArbeidsrelatertArsakType'),
        ),
    }),
    iots.partial({
        beskrivelse: iots.union([iots.string, iots.null]),
    }),
]);
export type ArbeidsrelatertArsak = iots.TypeOf<typeof ArbeidsrelatertArsak>;

export const AktivitetIkkeMulig = iots.partial({
    medisinskArsak: iots.union([MedisinskArsak, iots.null]),
    arbeidsrelatertArsak: iots.union([ArbeidsrelatertArsak, iots.null]),
});
export type AktivitetIkkeMulig = iots.TypeOf<typeof AktivitetIkkeMulig>;

const Gradert = iots.intersection([
    iots.type({
        reisetilskudd: iots.boolean,
    }),
    iots.partial({
        grad: iots.union([iots.number, iots.null]),
    }),
]);
export type Gradert = iots.TypeOf<typeof Gradert>;

export const Periode = iots.intersection([
    iots.type({
        fom: DateFromString,
        tom: DateFromString,
        reisetilskudd: iots.boolean,
    }),
    iots.partial({
        aktivitetIkkeMulig: iots.union([AktivitetIkkeMulig, iots.null]),
        avventendeInnspillTilArbeidsgiver: iots.union([iots.string, iots.null]),
        behandlingsdager: iots.union([iots.number, iots.null]),
        gradert: iots.union([Gradert, iots.null]),
    }),
]);
export type Periode = iots.TypeOf<typeof Periode>;

const Diagnose = iots.type({
    system: iots.string,
    kode: iots.string,
    tekst: iots.string,
});
export type Diagnose = iots.TypeOf<typeof Diagnose>;

const AnnenFraversArsak = iots.intersection([
    iots.type({
        grunn: iots.union([
            iots.array(createEnumType<AnnenFraverGrunn>(AnnenFraverGrunn, 'AnnenFraverGrunn')),
            iots.array(iots.undefined),
        ]),
    }),
    iots.partial({
        beskrivelse: iots.union([iots.string, iots.null]),
    }),
]);
export type AnnenFraversArsak = iots.TypeOf<typeof AnnenFraversArsak>;

export const MedisinskVurdering = iots.intersection([
    iots.type({
        svangerskap: iots.boolean,
        yrkesskade: iots.boolean,
        biDiagnoser: iots.union([iots.array(Diagnose), iots.array(iots.undefined)]),
    }),
    iots.partial({
        yrkesskadeDato: iots.union([DateFromString, iots.null]),
        hovedDiagnose: iots.union([Diagnose, iots.null]),
        annenFraversArsak: iots.union([AnnenFraversArsak, iots.null]),
    }),
]);
export type MedisinskVurdering = iots.TypeOf<typeof MedisinskVurdering>;

export const Arbeidsgiver = iots.intersection([
    iots.type({
        harArbeidsgiver: createEnumType<HarArbeidsgiver>(HarArbeidsgiver, 'HarArbeidsgiver'),
    }),
    iots.partial({
        navn: iots.union([iots.string, iots.null]),
        yrkesbetegnelse: iots.union([iots.string, iots.null]),
        stillingsprosent: iots.union([iots.number, iots.null]),
    }),
]);
export type Arbeidsgiver = iots.TypeOf<typeof Arbeidsgiver>;

const ErIArbeid = iots.intersection([
    iots.type({
        egetArbeidPaSikt: iots.boolean,
        annetArbeidPaSikt: iots.boolean,
    }),
    iots.partial({
        arbeidFOM: iots.union([DateFromString, iots.null]),
        vurderingsdato: iots.union([DateFromString, iots.null]),
    }),
]);

const ErIkkeIArbeid = iots.intersection([
    iots.type({
        arbeidsforPaSikt: iots.boolean,
    }),
    iots.partial({
        arbeidsforFOM: iots.union([DateFromString, iots.null]),
        vurderingsdato: iots.union([DateFromString, iots.null]),
    }),
]);

export const Prognose = iots.intersection([
    iots.type({
        arbeidsforEtterPeriode: iots.boolean,
    }),
    iots.partial({
        hensynArbeidsplassen: iots.union([iots.string, iots.null]),
        erIArbeid: iots.union([ErIArbeid, iots.null]),
        erIkkeIArbeid: iots.union([ErIkkeIArbeid, iots.null]),
    }),
]);
export type Prognose = iots.TypeOf<typeof Prognose>;

export const MeldingTilNAV = iots.intersection([
    iots.type({
        bistandUmiddelbart: iots.boolean,
    }),
    iots.partial({
        beskrivBistand: iots.union([iots.string, iots.null]),
    }),
]);
export type MeldingTilNAV = iots.TypeOf<typeof MeldingTilNAV>;

const Adresse = iots.partial({
    gate: iots.union([iots.string, iots.null]),
    postnummer: iots.union([iots.number, iots.null]),
    kommune: iots.union([iots.string, iots.null]),
    postboks: iots.union([iots.string, iots.null]),
    land: iots.union([iots.string, iots.null]),
});
export type Adresse = iots.TypeOf<typeof Adresse>;

export const Behandler = iots.intersection([
    iots.type({
        fornavn: iots.string,
        etternavn: iots.string,
        fnr: iots.string,
        aktoerId: iots.string,
    }),
    iots.partial({
        hpr: iots.union([iots.string, iots.null]),
        her: iots.union([iots.string, iots.null]),
        adresse: iots.union([Adresse, iots.null]),
        tlf: iots.union([iots.string, iots.null]),
    }),
]);
export type Behandler = iots.TypeOf<typeof Behandler>;

const UtdypendeOpplysninger = iots.partial({
    '6.1': iots.partial({
        '6.1.1': iots.string,
        '6.1.2': iots.string,
        '6.1.3': iots.string,
        '6.1.4': iots.string,
        '6.1.5': iots.string,
    }),
    '6.2': iots.partial({
        '6.2.1': iots.string,
        '6.2.2': iots.string,
        '6.2.3': iots.string,
        '6.2.4': iots.string,
    }),
    '6.3': iots.partial({
        '6.3.1': iots.string,
        '6.3.2': iots.string,
    }),
    '6.4': iots.partial({
        '6.4.1': iots.string,
        '6.4.2': iots.string,
        '6.4.3': iots.string,
    }),
    '6.5': iots.partial({
        '6.5.1': iots.string,
        '6.5.2': iots.string,
        '6.5.3': iots.string,
        '6.5.4': iots.string,
    }),
    '6.6': iots.partial({
        '6.6.1': iots.string,
        '6.6.2': iots.string,
        '6.6.3': iots.string,
    }),
});
export type UtdypendeOpplysninger = iots.TypeOf<typeof UtdypendeOpplysninger>;

export const KontaktMedPasient = iots.partial({
    kontaktDato: iots.union([DateFromString, iots.null]),
    begrunnelseIkkeKontakt: iots.union([iots.string, iots.null]),
});
export type KontaktMedPasient = iots.TypeOf<typeof KontaktMedPasient>;

export const RegistrertSykmelding = iots.intersection([
    iots.type({
        pasientFnr: iots.string,
        sykmelderFnr: iots.string,
        perioder: iots.array(Periode),
        medisinskVurdering: MedisinskVurdering,
        syketilfelleStartDato: DateFromString,
        arbeidsgiver: Arbeidsgiver,
        behandletDato: DateFromString,
        skjermesForPasient: iots.boolean,
        behandler: Behandler,
        kontaktMedPasient: KontaktMedPasient,
    }),
    iots.partial({
        prognose: Prognose,
        meldingTilNAV: MeldingTilNAV,
        meldingTilArbeidsgiver: iots.union([iots.string, iots.null]),
        tiltakNAV: iots.union([iots.string, iots.null]),
        tiltakArbeidsplassen: iots.union([iots.string, iots.null]),
        andreTiltak: iots.union([iots.string, iots.null]),
        utdypendeOpplysninger: UtdypendeOpplysninger,
        navnFastlege: iots.union([iots.string, iots.null]),
    }),
]);
export type RegistrertSykmelding = iots.TypeOf<typeof RegistrertSykmelding>;
