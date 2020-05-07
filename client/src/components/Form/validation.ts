import { SchemaType } from './Form';

export type Validate = (name: keyof SchemaType, value: SchemaType[keyof SchemaType]) => boolean;

type Mandatory<T> = keyof T;
export type ValidationType = {
    [key in Mandatory<SchemaType>]: (value: SchemaType[key], schema: SchemaType) => string | undefined;
};

export const validationFunctions: ValidationType = {
    // Other
    pasientFnr: (pasientFnr, schema) => {
        if (!pasientFnr) {
            return 'Pasientens fødselsnummer må være definert';
        }
        if (pasientFnr.length !== 11) {
            return 'Pasientens fødselsnummer må være 11 siffer';
        }
        if (!pasientFnr.match('^\\+?[- _0-9]+$')) {
            return 'Pasientens fødselsnummer er ikke på et gyldig format';
        }
        return undefined;
    },
    syketilfelleStartDato: (syketilfelleStartDato, schema) => {
        if (!syketilfelleStartDato) {
            return 'Startdato må være definert';
        }
        return undefined;
    },
    behandletDato: (behandletDato, schema) => {
        if (!behandletDato) {
            return 'Behandletdato må være definert';
        }
        return undefined;
    },

    // Pasientopplysninger
    pasientTelefon: (pasientTelefon, schema) => {
        if (pasientTelefon && !pasientTelefon.match('^\\+?[- _0-9]+$')) {
            // https://begrep.difi.no/Felles/mobiltelefonnummer
            return 'Telefonnummeret er ikke på et gyldig format';
        }
        return undefined;
    },
    pasientEtternavn: (value, schema) => {
        return undefined;
    },
    pasientFornavn: (value, schema) => {
        return undefined;
    },
    behandlerNavn: (value, schema) => {
        return undefined;
    },

    // Arbeidsgiver
    harArbeidsgiver: (harArbeidsgiver, schema) => {
        if (!harArbeidsgiver) {
            return 'Arbeidssituasjon må være definert';
        }
        return undefined;
    },
    arbeidsgiverNavn: (value, schema) => {
        return undefined;
    },
    yrkesbetegnelse: (value, schema) => {
        return undefined;
    },
    stillingsprosent: (stillingsprosent, schema) => {
        if (stillingsprosent && (stillingsprosent > 100 || stillingsprosent < 0)) {
            return 'Stillingsprosenten må være mellom 0 og 100';
        }
        return undefined;
    },

    // Diagnose
    hovedDiagnose: (hovedDiagnose, schema) => {
        if (hovedDiagnose && hovedDiagnose.system) {
            if (!hovedDiagnose.kode) return 'Kode tilhørende hoveddiagnose må være definert når system er valgt';
            if (!hovedDiagnose.tekst) return 'Tekst må være definert';
        }
        return undefined;
    },
    biDiagnoser: (biDiagnoser, schema) => {
        if (biDiagnoser?.length) {
            let feilmelding: string | undefined = undefined;
            biDiagnoser.forEach(biDiagnose => {
                if (!biDiagnose.system) feilmelding = 'System må være definert';
                if (!biDiagnose.kode) feilmelding = 'Kode må være definert';
                if (!biDiagnose.tekst) feilmelding = 'Tekst må være definert';
            });
            if (feilmelding) {
                return feilmelding;
            }
        }
        return undefined;
    },
    yrkesskade: () => undefined,
    yrkesskadeDato: (yrkesskadeDato, schema) => {
        if (schema.yrkesskade && !yrkesskadeDato) {
            return 'Yrkesskadedato må være definer når yrkesskade er krysset av';
        }
        return undefined;
    },
    svangerskap: (svangerskap, schema) => {
        if (svangerskap === undefined) {
            return 'Svangerskap må være definert';
        }
        return undefined;
    },
    annenFraversArsak: () => undefined,
    annenFraversArsakGrunn: () => undefined,
    annenFraversArsakBeskrivelse: () => undefined,
    skjermesForPasient: (skjermesForPasient, schema) => {
        if (skjermesForPasient === undefined) {
            return 'SkjermesForPasient er et påkrevd felt';
        }
        return undefined;
    },

    // MulighetForArbeid
    // Perioder for avventende sykmelding
    avventendeSykmelding: () => undefined,
    avventendePeriode: (avventendePeriode, schema) => {
        if (schema.avventendeSykmelding && !avventendePeriode) {
            return 'Periode må være definert når avventende sykmelding er krysset av';
        }
    },
    avventendeInnspillTilArbeidsgiver: () => undefined,
    // Perioder for gradert sykmelding
    gradertSykmelding: () => undefined,
    gradertPeriode: (gradertPeriode, schema) => {
        if (schema.gradertSykmelding && !gradertPeriode) {
            return 'Periode må være definert når gradert sykmelding er krysset av';
        }
    },
    gradertGrad: () => undefined,
    gradertReisetilskudd: () => undefined,
    // Perioder for full sykmelding
    aktivitetIkkeMuligSykmelding: () => undefined,
    aktivitetIkkeMuligPeriode: (aktivitetIkkeMuligPeriode, schema) => {
        if (schema.aktivitetIkkeMuligSykmelding && !aktivitetIkkeMuligPeriode) {
            return 'Periode må være definert når aktivitet ikke er mulig';
        }
    },
    aktivitetIkkeMuligMedisinskArsak: () => undefined,
    aktivitetIkkeMuligMedisinskArsakType: () => undefined,
    aktivitetIkkeMuligMedisinskArsakBeskrivelse: () => undefined,
    aktivitetIkkeMuligArbeidsrelatertArsak: () => undefined,
    aktivitetIkkeMuligArbeidsrelatertArsakType: () => undefined,
    aktivitetIkkeMuligArbeidsrelatertArsakBeskrivelse: () => undefined,
    // Perioder for sykmelding for behandlignsdager
    behandlingsdagerSykmelding: () => undefined,
    behandlingsdagerPeriode: (behandlingsdagerPeriode, schema) => {
        if (schema.behandlingsdagerSykmelding && !behandlingsdagerPeriode) {
            return 'Periode må være definert når pasienten krever sykmelding for behandlingsdager';
        }
    },
    behandlingsdagerAntall: () => undefined,
    // Perioder for sykmelding med reisetilskudd
    reisetilskuddSykmelding: () => undefined,
    reisetilskuddPeriode: (reisetilskuddPeriode, schema) => {
        if (schema.reisetilskuddSykmelding && !reisetilskuddPeriode) {
            return 'Periode må være definert når pasienten krever sykmelding med reistilskudd';
        }
    },

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
    legitimert: (legitimert, schema) => {
        if (legitimert === undefined) {
            return 'Legitimert er et påkrevd felt';
        }
        return undefined;
    },
    sykmelderFnr: (sykmelderFnr, schema) => {
        if (!sykmelderFnr) {
            return 'Sykmelders fødselsnummer må være definert';
        }
        if (sykmelderFnr.length !== 11) {
            return 'Sykmelders fødselsnummer må være 11 siffer';
        }
        if (!sykmelderFnr.match('^\\+?[- _0-9]+$')) {
            return 'Sykmelders fødselsnummer er ikke på et gyldig format';
        }
        return undefined;
    },
    sykmeldersNavn: () => undefined,
    hpr: () => undefined,
    sykmelderAdresse: () => undefined,
    sykmelderTelefon: () => undefined,
};
