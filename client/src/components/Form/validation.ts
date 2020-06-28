import { SchemaType } from './Form';

export type Validate = (name: keyof SchemaType, schema: SchemaType) => boolean;

export type ValidationType = {
    [key in Required<keyof SchemaType>]: (schema: SchemaType) => string | undefined;
};

export const validationFunctions: ValidationType = {
    // Other
    syketilfelleStartDato: schema => {
        if (!schema.syketilfelleStartDato) {
            return 'Startdato må være definert';
        }
        return undefined;
    },

    // Pasientopplysninger
    pasientFnr: schema => {
        if (!schema.pasientFnr) {
            return 'Pasientens fødselsnummer må være definert';
        }
        if (schema.pasientFnr.length !== 11) {
            return 'Pasientens fødselsnummer må være 11 siffer';
        }
        if (!schema.pasientFnr.match('^\\+?[- _0-9]+$')) {
            return 'Pasientens fødselsnummer er ikke på et gyldig format';
        }
        return undefined;
    },

    // Arbeidsgiver
    harArbeidsgiver: schema => {
        if (!schema.harArbeidsgiver) {
            return 'Arbeidssituasjon må være definert';
        }
        return undefined;
    },
    arbeidsgiverNavn: schema => {
        return undefined;
    },
    yrkesbetegnelse: schema => {
        return undefined;
    },
    stillingsprosent: schema => {
        if (schema.stillingsprosent && (schema.stillingsprosent > 100 || schema.stillingsprosent < 0)) {
            return 'Stillingsprosenten må være mellom 0 og 100';
        }
        return undefined;
    },

    // Diagnose
    hovedDiagnose: schema => {
        if (!schema.hovedDiagnose) {
            return 'Hoveddiagnose må være definert';
        }
        if (schema.hovedDiagnose && schema.hovedDiagnose.system) {
            if (!schema.hovedDiagnose.kode) return 'Kode tilhørende hoveddiagnose må være definert når system er valgt';
        }
        return undefined;
    },
    biDiagnoser: schema => {
        if (schema.biDiagnoser?.length) {
            let feilmelding: string | undefined = undefined;
            schema.biDiagnoser.forEach(biDiagnose => {
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
    yrkesskadeDato: schema => {
        if (schema.yrkesskade && !schema.yrkesskadeDato) {
            return 'Yrkesskadedato må være definer når yrkesskade er krysset av';
        }
        return undefined;
    },
    svangerskap: schema => {
        if (schema.svangerskap === undefined) {
            return 'Svangerskap må være definert';
        }
        return undefined;
    },
    annenFraversArsak: () => undefined,
    annenFraversArsakGrunn: schema => {
        if (schema.annenFraversArsak && !schema.annenFraversArsakGrunn?.length) {
            return 'Lovfestet fraværsgrunn må være valgt når annen lovfestet fraværsgrunn er avkrysset';
        }
    },
    annenFraversArsakBeskrivelse: () => undefined,
    skjermesForPasient: schema => {
        if (schema.skjermesForPasient === undefined) {
            return 'SkjermesForPasient er et påkrevd felt';
        }
        return undefined;
    },

    // MulighetForArbeid
    mulighetForArbeid: schema => {
        if (
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
    avventendePeriode: schema => {
        if (schema.avventendeSykmelding && !schema.avventendePeriode) {
            return 'Periode må være definert når avventende sykmelding er krysset av';
        }
    },
    avventendeInnspillTilArbeidsgiver: () => undefined,
    // Perioder for gradert sykmelding
    gradertSykmelding: () => undefined,
    gradertPeriode: schema => {
        if (schema.gradertSykmelding && !schema.gradertPeriode) {
            return 'Periode må være definert når gradert sykmelding er krysset av';
        }
    },
    gradertGrad: () => undefined,
    gradertReisetilskudd: () => undefined,
    // Perioder for full sykmelding
    aktivitetIkkeMuligSykmelding: () => undefined,
    aktivitetIkkeMuligPeriode: schema => {
        if (schema.aktivitetIkkeMuligSykmelding && !schema.aktivitetIkkeMuligPeriode) {
            return 'Periode må være definert når aktivitet ikke er mulig';
        }
    },
    aktivitetIkkeMuligMedisinskArsak: () => undefined,
    aktivitetIkkeMuligMedisinskArsakType: schema => {
        if (schema.aktivitetIkkeMuligMedisinskArsak && !schema.aktivitetIkkeMuligMedisinskArsakType?.length) {
            return 'Minst én medisinsk årsak må være valgt når det er medisinske årsaker som hindrer arbeidsrelatert aktivitet';
        }
    },
    aktivitetIkkeMuligMedisinskArsakBeskrivelse: () => undefined,
    aktivitetIkkeMuligArbeidsrelatertArsak: () => undefined,
    aktivitetIkkeMuligArbeidsrelatertArsakType: schema => {
        if (
            schema.aktivitetIkkeMuligArbeidsrelatertArsak &&
            !schema.aktivitetIkkeMuligArbeidsrelatertArsakType?.length
        ) {
            return 'Minst én arbeidsrelatert årsak må være valgt når forhold på arbeidsplassen vanskeliggjør arbeidsrelatert aktivitet';
        }
    },
    aktivitetIkkeMuligArbeidsrelatertArsakBeskrivelse: () => undefined,
    // Perioder for sykmelding for behandlignsdager
    behandlingsdagerSykmelding: () => undefined,
    behandlingsdagerPeriode: schema => {
        if (schema.behandlingsdagerSykmelding && !schema.behandlingsdagerPeriode) {
            return 'Periode må være definert når pasienten krever sykmelding for behandlingsdager';
        }
    },
    behandlingsdagerAntall: schema => {
        if (schema.behandlingsdagerSykmelding && !schema.behandlingsdagerAntall) {
            return 'Antall dager må være definert når pasienten krever sykmelding for behandlingsdager';
        }
    },
    // Perioder for sykmelding med reisetilskudd
    reisetilskuddSykmelding: () => undefined,
    reisetilskuddPeriode: schema => {
        if (schema.reisetilskuddSykmelding && !schema.reisetilskuddPeriode) {
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
    arbeidFOM: schema => {
        if (schema.erIArbeid && schema.egetArbeidPaSikt) {
            if (schema.arbeidFOM === undefined) {
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
    behandletDato: schema => {
        if (!schema.behandletDato) {
            return 'Behandletdato må være definert';
        }
        return undefined;
    },
    sykmelderFnr: schema => {
        if (!schema.sykmelderFnr) {
            return 'Sykmelders fødselsnummer må være definert';
        }
        if (schema.sykmelderFnr.length !== 11) {
            return 'Sykmelders fødselsnummer må være 11 siffer';
        }
        if (!schema.sykmelderFnr.match('^\\+?[- _0-9]+$')) {
            return 'Sykmelders fødselsnummer er ikke på et gyldig format';
        }
        return undefined;
    },
    aktoerId: schema => {
        if (!schema.aktoerId) {
            return 'AktørID er et påkrevd felt';
        }
    },
    sykmeldersFornavn: schema => {
        if (!schema.sykmeldersFornavn) {
            return 'Sykmelders fornavn må være definert';
        }
    },
    sykmeldersEtternavn: schema => {
        if (!schema.sykmeldersEtternavn) {
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
