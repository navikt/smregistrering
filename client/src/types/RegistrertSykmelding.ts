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
        arsak: iots.union([
            iots.array(createEnumType<MedisinskArsakType>(MedisinskArsakType, 'MedisinskArsakType')),
            iots.array(iots.undefined),
        ]),
    }),
    iots.partial({
        beskrivelse: iots.string,
    }),
]);
export type MedisinskArsak = iots.TypeOf<typeof MedisinskArsak>;

const ArbeidsrelatertArsak = iots.intersection([
    iots.type({
        arsak: iots.union([
            iots.array(createEnumType<ArbeidsrelatertArsakType>(ArbeidsrelatertArsakType, 'ArbeidsrelatertArsakType')),
            iots.array(iots.undefined),
        ]),
    }),
    iots.partial({
        beskrivelse: iots.string,
    }),
]);
export type ArbeidsrelatertArsak = iots.TypeOf<typeof ArbeidsrelatertArsak>;

const AktivitetIkkeMulig = iots.partial({
    medisinskArsak: MedisinskArsak,
    arbeidsrelatertArsak: ArbeidsrelatertArsak,
});
export type AktivitetIkkeMulig = iots.TypeOf<typeof AktivitetIkkeMulig>;

const Gradert = iots.intersection([
    iots.type({
        reisetilskudd: iots.boolean,
    }),
    iots.partial({
        grad: iots.number,
    }),
]);
export type Gradert = iots.TypeOf<typeof Gradert>;

const Periode = iots.intersection([
    iots.type({
        fom: DateFromString,
        tom: DateFromString,
        reisetilskudd: iots.boolean,
    }),
    iots.partial({
        aktivitetIkkeMulig: AktivitetIkkeMulig,
        avventendeInnspillTilArbeidsgiver: iots.string,
        behandlingsdager: iots.string,
        gradert: Gradert,
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
        beskrivelse: iots.string,
    }),
]);
export type AnnenFraversArsak = iots.TypeOf<typeof AnnenFraversArsak>;

const MedisinskVurdering = iots.intersection([
    iots.type({
        svangerskap: iots.boolean,
        yrkesskade: iots.boolean,
        biDiagnoser: iots.union([iots.array(Diagnose), iots.array(iots.undefined)]),
    }),
    iots.partial({
        yrkesskadeDato: DateFromString,
        hovedDiagnose: Diagnose,
        annenFraversArsak: AnnenFraversArsak,
    }),
]);
export type MedisinskVurdering = iots.TypeOf<typeof MedisinskVurdering>;

const Arbeidsgiver = iots.intersection([
    iots.type({
        harArbeidsgiver: createEnumType<HarArbeidsgiver>(HarArbeidsgiver, 'HarArbeidsgiver'),
    }),
    iots.partial({
        navn: iots.string,
        yrkesbetegnelse: iots.string,
        stillingsprosent: iots.number,
    }),
]);
export type Arbeidsgiver = iots.TypeOf<typeof Arbeidsgiver>;

export const RegistrertSykmelding = iots.type({
    pasientFnr: iots.string,
    sykmelderFnr: iots.string,
    perioder: iots.array(Periode),
    medisinskVurdering: MedisinskVurdering,
    syketilfelleStartDato: DateFromString,
    arbeidsgiver: Arbeidsgiver,
    behandletDato: DateFromString,
    skjermesForPasient: iots.boolean,
});
export type RegistrertSykmelding = iots.TypeOf<typeof RegistrertSykmelding>;
