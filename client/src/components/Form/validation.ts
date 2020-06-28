import { SchemaType } from './Form';

export type Validate = (name: keyof SchemaType, value: SchemaType[keyof SchemaType]) => boolean;

type Mandatory<T> = keyof T;
export type ValidationType = {
    [key in Mandatory<SchemaType>]: (value: SchemaType[key], schema: SchemaType) => string | undefined;
};

export const validationFunctions: ValidationType = {
    // Other
    syketilfelleStartDato: (syketilfelleStartDato, schema) => {
        if (!syketilfelleStartDato) {
            return 'Startdato må være definert';
        }
        return undefined;
    },

    // Pasientopplysninger
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
        if (!hovedDiagnose) {
            return 'Hoveddiagnose må være definert';
        }
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
    annenFraversArsakGrunn: (annenFraversArsakGrunn, schema) => {
        if (schema.annenFraversArsak && !annenFraversArsakGrunn?.length) {
            return 'Lovfestet fraværsgrunn må være valgt når annen lovfestet fraværsgrunn er avkrysset';
        }
    },
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
    aktivitetIkkeMuligMedisinskArsakType: (aktivitetIkkeMuligMedisinskArsakType, schema) => {
        if (schema.aktivitetIkkeMuligMedisinskArsak && !aktivitetIkkeMuligMedisinskArsakType?.length) {
            return 'Minst én medisinsk årsak må være valgt når det er medisinske årsaker som hindrer arbeidsrelatert aktivitet';
        }
    },
    aktivitetIkkeMuligMedisinskArsakBeskrivelse: () => undefined,
    aktivitetIkkeMuligArbeidsrelatertArsak: () => undefined,
    aktivitetIkkeMuligArbeidsrelatertArsakType: (aktivitetIkkeMuligArbeidsrelatertArsakType, schema) => {
        if (schema.aktivitetIkkeMuligArbeidsrelatertArsak && !aktivitetIkkeMuligArbeidsrelatertArsakType?.length) {
            return 'Minst én arbeidsrelatert årsak må være valgt når forhold på arbeidsplassen vanskeliggjør arbeidsrelatert aktivitet';
        }
    },
    aktivitetIkkeMuligArbeidsrelatertArsakBeskrivelse: () => undefined,
    // Perioder for sykmelding for behandlignsdager
    behandlingsdagerSykmelding: () => undefined,
    behandlingsdagerPeriode: (behandlingsdagerPeriode, schema) => {
        if (schema.behandlingsdagerSykmelding && !behandlingsdagerPeriode) {
            return 'Periode må være definert når pasienten krever sykmelding for behandlingsdager';
        }
    },
    behandlingsdagerAntall: (behandlingsdagerAntall, schema) => {
        if (schema.behandlingsdagerSykmelding && !behandlingsdagerAntall) {
            return 'Antall dager må være definert når pasienten krever sykmelding for behandlingsdager';
        }
    },
    // Perioder for sykmelding med reisetilskudd
    reisetilskuddSykmelding: () => undefined,
    reisetilskuddPeriode: (reisetilskuddPeriode, schema) => {
        if (schema.reisetilskuddSykmelding && !reisetilskuddPeriode) {
            return 'Periode må være definert når pasienten krever sykmelding med reistilskudd';
        }
    },

    // Friskmelding
    arbeidsfoerEtterPeriode: () => undefined,
    hensynArbeidsplassen: () => undefined,
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
    arbeidsforFOM: () => undefined,
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
    utdypende631: () => undefined,
    utdypende632: () => undefined,
    utdypende641: () => undefined,
    utdypende642: () => undefined,
    utdypende643: () => undefined,
    utdypende651: () => undefined,
    utdypende652: () => undefined,
    utdypende653: () => undefined,
    utdypende654: () => undefined,
    utdypende661: () => undefined,
    utdypende662: () => undefined,
    utdypende663: () => undefined,

    // Arbeidsevne
    tiltakArbeidsplassen: () => undefined,
    tiltakNav: () => undefined,
    andreTiltak: () => undefined,

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
    behandletDato: (behandletDato, schema) => {
        if (!behandletDato) {
            return 'Behandletdato må være definert';
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
    aktoerId: (aktoerId, schema) => {
        if (!aktoerId) {
            return 'AktørID er et påkrevd felt';
        }
    },
    sykmeldersFornavn: (sykmeldersFornavn, schema) => {
        if (!sykmeldersFornavn) {
            return 'Sykmelders fornavn må være definert';
        }
    },
    sykmeldersEtternavn: (sykmeldersEtternavn, schema) => {
        if (!sykmeldersEtternavn) {
            return 'Sykmelders etternavn må være definert';
        }
    },
    hpr: () => undefined,
    sykmelderTelefon: () => undefined,
    sykmelderGate: () => undefined,
    sykmelderKommune: () => undefined,
    sykmelderPostnummer: () => undefined,
    sykmelderPostboks: () => undefined,
    sykmelderLand: () => undefined,
};
