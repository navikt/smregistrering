import { SchemaType } from './Form';

export type Validate = (name: keyof SchemaType, value: SchemaType[keyof SchemaType]) => void;

type Mandatory<T> = keyof T;
export type ValidationType = {
    [key in Mandatory<SchemaType>]: (value: SchemaType[key], schema: SchemaType) => string | undefined;
};

export const validation: ValidationType = {
    // Other
    fnr: (value, schema) => {
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

    // Pasientopplysninger
    pasientTelefon: (value, schema) => {
        if (!value) {
            return 'Telefonnummer må være definert';
        }
        // https://begrep.difi.no/Felles/mobiltelefonnummer
        if (!value.match('^\\+?[- _0-9]+$')) {
            return 'Telefonnummeret er ikke på et gyldig format';
        }
        return undefined;
    },
    pasientEtternavn: (value, schema) => {
        if (!value) {
            return 'Etternavn må være definert';
        }
        return undefined;
    },
    pasientFornavn: (value, schema) => {
        if (!value) {
            return 'Fornavn må være definert';
        }
        return undefined;
    },
    behandlerNavn: (value, schema) => {
        if (!value) {
            return 'Navn på fastlege må være definert';
        }
        return undefined;
    },

    // Arbeidsgiver
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

    // Diagnose
    hovedDiagnose: (value, schema) => {
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
    biDiagnoser: () => undefined,
    yrkesskade: () => undefined,
    yrkesskadeDato: () => undefined,
    svangerskap: () => undefined,
    annenFraversArsak: () => undefined,
    annenFraversArsakGrunn: () => undefined,
    annenFraversArsakBeskrivelse: () => undefined,
    skjermesForPasient: () => undefined,

    // MulighetForArbeid
    // Perioder for avventende sykmelding
    avventendeSykmelding: () => undefined,
    avventendePeriode: () => undefined,
    avventendeInnspillTilArbeidsgiver: () => undefined,
    // Perioder for gradert sykmelding
    gradertSykmelding: () => undefined,
    gradertPeriode: () => undefined,
    gradertGrad: () => undefined,
    gradertReisetilskudd: () => undefined,
    // Perioder for full sykmelding
    aktivitetIkkeMuligSykmelding: () => undefined,
    aktivitetIkkeMuligPeriode: () => undefined,
    aktivitetIkkeMuligMedisinskArsak: () => undefined,
    aktivitetIkkeMuligMedisinskArsakType: () => undefined,
    aktivitetIkkeMuligMedisinskArsakBeskrivelse: () => undefined,
    aktivitetIkkeMuligArbeidsrelatertArsak: () => undefined,
    aktivitetIkkeMuligArbeidsrelatertArsakType: () => undefined,
    aktivitetIkkeMuligArbeidsrelatertArsakBeskrivelse: () => undefined,
    // Perioder for sykmelding for behandlignsdager
    behandlingsdagerSykmelding: () => undefined,
    behandlingsdagerPeriode: () => undefined,
    behandlingsdagerAntall: () => undefined,
    // Perioder for sykmelding med reisetilskudd
    reisetilskuddSykmelding: () => undefined,
    reisetilskuddPeriode: () => undefined,

    // Friskmelding
    arbeidsfoerEtterPeriode: () => undefined,
    hensynPaArbeidsplassen: () => undefined,

    // Arbeidsevne
    tilretteleggingArbeidsplassen: () => undefined,
    tilretteleggingArbeidsplassBeskriv: () => undefined,
    tiltakNav: () => undefined,
    tiltakNavBeskriv: () => undefined,
    innspillTilNAv: () => undefined,
    innspillTilNavBeskriv: () => undefined,

    // MeldingTilNav
    meldingTilNavBistand: () => undefined,
    meldingTilNavBegrunn: () => undefined,

    // MeldingTilArbeidsgiver
    meldingTilArbeidsgiverInnspill: () => undefined,
    meldingTilArbeidsgiverBeskriv: () => undefined,

    // Tilbakedatering
    erTilbakedatert: () => undefined,
    kontaktDato: () => undefined,
    kunneIkkeIvaretaEgneInteresser: () => undefined,
    begrunnelseIkkeKontakt: () => undefined,

    // Bekreftelse
    legitimert: () => undefined,
    sykmeldersNavn: () => undefined,
    hpr: () => undefined,
    sykmelderAdresse: () => undefined,
    sykmelderTelefon: () => undefined,
};
