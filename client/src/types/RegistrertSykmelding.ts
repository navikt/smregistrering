import * as iots from 'io-ts';

import { DateFromString, createEnumType } from './CustomTypes';

export enum MedisinskArsakType {
    TILSTAND_HINDRER_AKTIVITET = 'TILSTAND_HINDRER_AKTIVITET',
    AKTIVITET_FORVERRER_TILSTAND = 'AKTIVITET_FORVERRER_TILSTAND',
    AKTIVITET_FORHINDRER_BEDRING = 'AKTIVITET_FORHINDRER_BEDRING',
    ANNET = 'ANNET',
}

export enum ArbeidsrelatertArsakType {
    MANGLENDE_TILRETTELEGGING = 'MANGLENDE_TILRETTELEGGING',
    ANNET = 'ANNET',
}

export enum AnnenFraverGrunn {
    GODKJENT_HELSEINSTITUSJON = 'GODKJENT_HELSEINSTITUSJON',
    BEHANDLING_FORHINDRER_ARBEID = 'BEHANDLING_FORHINDRER_ARBEID',
    ARBEIDSRETTET_TILTAK = 'ARBEIDSRETTET_TILTAK',
    MOTTAR_TILSKUDD_GRUNNET_HELSETILSTAND = 'MOTTAR_TILSKUDD_GRUNNET_HELSETILSTAND',
    NODVENDIG_KONTROLLUNDENRSOKELSE = 'NODVENDIG_KONTROLLUNDENRSOKELSE',
    SMITTEFARE = 'SMITTEFARE',
    ABORT = 'ABORT',
    UFOR_GRUNNET_BARNLOSHET = 'UFOR_GRUNNET_BARNLOSHET',
    DONOR = 'DONOR',
    BEHANDLING_STERILISERING = 'BEHANDLING_STERILISERING',
}

export enum HarArbeidsgiver {
    EN_ARBEIDSGIVER = 'EN_ARBEIDSGIVER',
    FLERE_ARBEIDSGIVERE = 'FLERE_ARBEIDSGIVERE',
    INGEN_ARBEIDSGIVER = 'INGEN_ARBEIDSGIVER',
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

const AktivitetIkkeMulig = iots.partial({
    medisinskArsak: MedisinskArsak,
    arbeidsrelatertArsak: ArbeidsrelatertArsak,
});

const Gradert = iots.intersection([
    iots.type({
        reisetilskudd: iots.boolean,
    }),
    iots.partial({
        grad: iots.number,
    }),
]);

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

const Diagnose = iots.type({
    system: iots.string,
    kode: iots.string,
    tekst: iots.string,
});

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
