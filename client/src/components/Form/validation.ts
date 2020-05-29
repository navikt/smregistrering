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
    navnFastlege: (value, schema) => {
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
        }
        return undefined;
    },
    biDiagnoser: (biDiagnoser, schema) => {
        if (biDiagnoser?.length) {
            let feilmelding: string | undefined = undefined;
            biDiagnoser.forEach(biDiagnose => {
                if (biDiagnose.system && biDiagnose.system !== '') {
                    if (!biDiagnose.kode || biDiagnose.kode === '') {
                        feilmelding = 'Kode tilhørende én eller flere bidiagnoser må være definert når system er valg';
                    }
                }
            });
            return feilmelding;
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
    mulighetForArbeid: (value, schema) => {
        if (value) {
            return undefined;
        } else if (
            !schema.avventendeSykmelding &&
            !schema.gradertSykmelding &&
            !schema.aktivitetIkkeMuligSykmelding &&
            !schema.behandlingsdagerSykmelding &&
            !schema.reisetilskuddSykmelding
        ) {
            return 'Minimum én sykmeldingsperiode må være definert';
        }
        return undefined;
    },
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
    erIArbeid: () => undefined,
    erIkkeIArbeid: () => undefined,
    egetArbeidPaSikt: () => undefined,
    annetArbeidPaSikt: () => undefined,
    arbeidFOM: (arbeidFOM, schema) => {
        if (schema.erIArbeid && schema.egetArbeidPaSikt) {
            if (arbeidFOM === undefined) {
                return 'Du må svare på når pasienten på sikt kan komme tilbake til samme arbeidsgiver';
            }
        }
    },
    vurderingsDatoIArbeid: () => undefined,
    arbeidsforPaSikt: () => undefined,
    arbeidsforFOM: (arbeidsforFOM, schema) => {
        if (schema.erIkkeIArbeid && schema.arbeidsforPaSikt) {
            if (arbeidsforFOM === undefined) {
                return 'Du må svare på når pasienten kan komme tilbake i arbeid på sikt';
            }
        }
    },
    vurderingsDatoUtenArbeid: () => undefined,

    // Utdypende opplysninger
    utdypende611: () => undefined,
    utdypende612: () => undefined,
    utdypende613: () => undefined,
    utdypende614: () => undefined,
    utdypende615: () => undefined,
    utdypende621: () => undefined,
    utdypende622: () => undefined,
    utdypende623: () => undefined,
    utdypende624: () => undefined,
    

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
    sykmeldersFornavn: () => undefined,
    sykmeldersEtternavn: () => undefined,
    hpr: () => undefined,
    sykmelderAdresse: () => undefined,
    sykmelderTelefon: () => undefined,
};
