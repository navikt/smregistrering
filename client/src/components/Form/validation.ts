import { SchemaType } from './Form';

type Mandatory<T> = keyof T;
export type ValidationType = {
    [key in Mandatory<SchemaType>]: (value: SchemaType[key], schema: SchemaType) => string | undefined;
};

export const validation: ValidationType = {
    personnummer: (value, schema) => {
        if (!value) {
            return 'Personnummer må være definert';
        }
        if (!value.match('[0-9]')) {
            return 'Telefonnummeret er ikke på et gyldig format';
        }
        return undefined;
    },
    syketilfelleStartDato: (value, schema) => {
        if (!value) {
            return 'Startdato må være definert';
        }
        return undefined;
    },
    telefon: (value, schema) => {
        if (!value) {
            return 'Telefonnummer må være definert';
        }
        // https://begrep.difi.no/Felles/mobiltelefonnummer
        if (!value.match('^\\+?[- _0-9]+$')) {
            return 'Telefonnummeret er ikke på et gyldig format';
        }
        return undefined;
    },
    etternavn: (value, schema) => {
        if (!value) {
            return 'Etternavn må være definert';
        }
        return undefined;
    },
    fornavn: (value, schema) => {
        if (!value) {
            return 'Fornavn må være definert';
        }
        return undefined;
    },
    legenavn: (value, schema) => {
        if (!value) {
            return 'Navn på fastlege må være definert';
        }
        return undefined;
    },
    harArbeidsgiver: (value, schema) => {
        if (!value) {
            return 'Du må velge abridssituasjon';
        }
        return undefined;
    },
    arbeidsgiverNavn: (value, schema) => {
        if (!value) {
            return 'Navnet på arbeidsgiver må være definert';
        }
        return undefined;
    },
    yrkesbetegnelse: (value, schema) => {
        if (!value) {
            return 'Yrkesbetegnelse må være definert';
        }
        return undefined;
    },
    stillingsprosent: (value, schema) => {
        if (!value) {
            return 'Stillingsprosent må være definert';
        }
        if (value > 100 || value < 0) {
            return 'Stillingsprosenten må være mellom 0 og 100';
        }
        return undefined;
    },
    hoveddiagnose: (value, schema) => {
        if (!value) {
            return 'Hoveddiagnose må være definert';
        }
        if (!value.system) {
            return 'System må være valgt';
        }
        if (!value.kode) {
            return 'Kode må være valgt';
        }
        return undefined;
    },
    bidiagnoser: () => undefined,
    annenFravaersArsak: () => undefined,
    lovfestetFravaersgrunn: () => undefined,
    beskrivFravaeret: () => undefined,
    svangerskap: () => undefined,
    yrkesskade: () => undefined,
    yrkesskadeDato: () => undefined,
    skjermetFraPasient: () => undefined,
    avventende: () => undefined,
    avventendePeriode: (periode, schema) => {
        // conditional hvis avventende er krysset
        if (schema.avventende) {
            if (!periode) {
                return 'Periode mangler';
            }
            if (periode.length !== 2) {
                return 'Periode inneholder feil antall datoer';
            }
        }
        return undefined;
    },
    innspillTilArbeidsgiver: () => undefined,
    gradert: () => undefined,
    gradertPeriode: (periode, schema) => {
        // conditional hvis avventende er krysset
        if (schema.gradert) {
            if (!periode) {
                return 'Periode mangler';
            }
            if (periode.length !== 2) {
                return 'Periode inneholder feil antall datoer';
            }
        }
        return undefined;
    },
    grad: () => undefined,
    reisetilskudd: () => undefined,
    sykmeldt: () => undefined,
    sykmeldtPeriode: () => undefined,
    medisinskeAarsaker: () => undefined,
    arbeidsforhold: () => undefined,
    kanArbeide: () => undefined,
    behandlingsPeriode: () => undefined,
    antallDager: () => undefined,
    fulltArbeid: () => undefined,
    arbeidsPeriode: () => undefined,
    arbeidsfoerEtterPeriode: () => undefined,
    hensynPaArbeidsplassen: () => undefined,
    tilretteleggArbeidsplassBeskriv: () => undefined,
    tiltakNav: () => undefined,
    tiltakNavBeskriv: () => undefined,
    innspillTilNAv: () => undefined,
    innspillTilNavBeskriv: () => undefined,
    meldingTilNavBistand: () => undefined,
    meldingTilNavBegrunn: () => undefined,
    meldingTilArbeidsgiverInnspill: () => undefined,
    meldingTIlArbeidsgiverBeskriv: () => undefined,
    erTilbakedatert: () => undefined,
    datoTilbakedatering: () => undefined,
    kanIkkeIvaretaInteresser: () => undefined,
    legitimert: () => undefined,
    sykmeldersNavn: () => undefined,
    hpr: () => undefined,
    adresse: () => undefined,
    tilretteleggingArbeidsplass: () => undefined,
    innspillNav: () => undefined,
    sykmelderTelefon: () => undefined,
    tilretteleggingArbeidsplassen: () => undefined,
    tilbakedateringBegrunn: () => undefined,
};
