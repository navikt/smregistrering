import {
    AktivitetIkkeMulig,
    AnnenFraverGrunn,
    AnnenFraversArsak,
    ArbeidsrelatertArsak,
    ArbeidsrelatertArsakType,
    Diagnose,
    MedisinskArsak,
    MedisinskArsakType,
    Periode,
    Prognose,
    RegistrertSykmelding,
    UtdypendeOpplysningerReturn,
} from '../types/RegistrertSykmelding';
import { SchemaType } from '../components/Form/Form';

export const buildAvventendeSykmelding = (
    avventendeSykmelding: boolean,
    avventendePeriode: Date[] | undefined,
    avventendeInnspillTilArbeidsgiver: string | undefined,
): Periode | undefined => {
    if (avventendeSykmelding && avventendePeriode) {
        const periode: Periode = {
            fom: avventendePeriode[0],
            tom: avventendePeriode[1],
            reisetilskudd: false,
            avventendeInnspillTilArbeidsgiver: avventendeInnspillTilArbeidsgiver,
        };
        return periode;
    }
};

export const buildGradertSykmelding = (
    gradertSykmelding: boolean,
    gradertReisetilskudd: boolean,
    gradertPeriode?: Date[],
    gradertGrad?: number,
): Periode | undefined => {
    if (gradertSykmelding && gradertPeriode) {
        const periode: Periode = {
            fom: gradertPeriode[0],
            tom: gradertPeriode[1],
            reisetilskudd: false,
            gradert: {
                reisetilskudd: gradertReisetilskudd,
                grad: gradertGrad,
            },
        };
        return periode;
    }
};

const buildMedisinskArsak = (
    aktivitetIkkeMuligMedisinskArsak?: boolean,
    aktivitetIkkeMuligMedisinskArsakType?: (keyof typeof MedisinskArsakType)[],
    aktivitetIkkeMuligMedisinskArsakBeskrivelse?: string | null,
): MedisinskArsak | undefined => {
    if (aktivitetIkkeMuligMedisinskArsak && aktivitetIkkeMuligMedisinskArsakType?.length) {
        return {
            arsak: aktivitetIkkeMuligMedisinskArsakType,
            beskrivelse: aktivitetIkkeMuligMedisinskArsakBeskrivelse,
        };
    }
};

const buildArbeidsrelatertArsak = (
    aktivitetIkkeMuligArbeidsrelatertArsak?: boolean,
    aktivitetIkkeMuligArbeidsrelatertArsakType?: (keyof typeof ArbeidsrelatertArsakType)[],
    aktivitetIkkeMuligArbeidsrelatertArsakBeskrivelse?: string | null,
): ArbeidsrelatertArsak | undefined => {
    if (aktivitetIkkeMuligArbeidsrelatertArsak && aktivitetIkkeMuligArbeidsrelatertArsakType?.length) {
        return {
            arsak: aktivitetIkkeMuligArbeidsrelatertArsakType,
            beskrivelse: aktivitetIkkeMuligArbeidsrelatertArsakBeskrivelse,
        };
    }
};

export const buildAktivitetIkkeMuligSykmelding = (
    aktivitetIkkeMuligSykmelding: boolean,
    aktivitetIkkeMuligPeriode?: Date[],
    aktivitetIkkeMuligMedisinskArsak?: boolean,
    aktivitetIkkeMuligMedisinskArsakType?: (keyof typeof MedisinskArsakType)[],
    aktivitetIkkeMuligMedisinskArsakBeskrivelse?: string | null,
    aktivitetIkkeMuligArbeidsrelatertArsak?: boolean,
    aktivitetIkkeMuligArbeidsrelatertArsakType?: (keyof typeof ArbeidsrelatertArsakType)[],
    aktivitetIkkeMuligArbeidsrelatertArsakBeskrivelse?: string | null,
): Periode | undefined => {
    if (aktivitetIkkeMuligSykmelding && aktivitetIkkeMuligPeriode) {
        const medisinskArsak = buildMedisinskArsak(
            aktivitetIkkeMuligMedisinskArsak,
            aktivitetIkkeMuligMedisinskArsakType,
            aktivitetIkkeMuligMedisinskArsakBeskrivelse,
        );
        const arbeidsrelatertArsak = buildArbeidsrelatertArsak(
            aktivitetIkkeMuligArbeidsrelatertArsak,
            aktivitetIkkeMuligArbeidsrelatertArsakType,
            aktivitetIkkeMuligArbeidsrelatertArsakBeskrivelse,
        );
        const aktivitetIkkeMulig: AktivitetIkkeMulig = {
            medisinskArsak,
            arbeidsrelatertArsak,
        };

        const periode: Periode = {
            fom: aktivitetIkkeMuligPeriode[0],
            tom: aktivitetIkkeMuligPeriode[1],
            reisetilskudd: false,
            aktivitetIkkeMulig,
        };
        return periode;
    }
};

export const buildBehandlingsdagerSykmelding = (
    behandlingsdagerSykmelding: boolean,
    behandlingsdagerPeriode?: Date[],
    behandlingsdagerAntall?: number,
): Periode | undefined => {
    if (behandlingsdagerSykmelding && behandlingsdagerPeriode && behandlingsdagerAntall) {
        const periode: Periode = {
            fom: behandlingsdagerPeriode[0],
            tom: behandlingsdagerPeriode[1],
            reisetilskudd: false,
            behandlingsdager: behandlingsdagerAntall,
        };
        return periode;
    }
};

export const buildReisetilskuddSykmelding = (
    reisetilskuddSykmelding: boolean,
    reisetilskuddPeriode?: Date[],
): Periode | undefined => {
    if (reisetilskuddSykmelding && reisetilskuddPeriode) {
        const periode: Periode = {
            fom: reisetilskuddPeriode[0],
            tom: reisetilskuddPeriode[1],
            reisetilskudd: true,
        };
        return periode;
    }
};

export const buildPerioder = (schema: SchemaType): Periode[] => {
    const perioder: Periode[] = [];

    const avventendeSykmelding = buildAvventendeSykmelding(
        schema.avventendeSykmelding,
        schema.avventendePeriode,
        schema.avventendeInnspillTilArbeidsgiver,
    );
    if (avventendeSykmelding) perioder.push(avventendeSykmelding);

    const gradertSykmelding = buildGradertSykmelding(
        schema.gradertSykmelding,
        schema.gradertReisetilskudd,
        schema.gradertPeriode,
        schema.gradertGrad,
    );
    if (gradertSykmelding) perioder.push(gradertSykmelding);

    const aktivitetIkkeMuligSykmelding = buildAktivitetIkkeMuligSykmelding(
        schema.aktivitetIkkeMuligSykmelding,
        schema.aktivitetIkkeMuligPeriode,
        schema.aktivitetIkkeMuligMedisinskArsak,
        schema.aktivitetIkkeMuligMedisinskArsakType,
        schema.aktivitetIkkeMuligMedisinskArsakBeskrivelse,
        schema.aktivitetIkkeMuligArbeidsrelatertArsak,
        schema.aktivitetIkkeMuligArbeidsrelatertArsakType,
        schema.aktivitetIkkeMuligArbeidsrelatertArsakBeskrivelse,
    );
    if (aktivitetIkkeMuligSykmelding) perioder.push(aktivitetIkkeMuligSykmelding);

    const behandlingsdagerSykmelding = buildBehandlingsdagerSykmelding(
        schema.behandlingsdagerSykmelding,
        schema.behandlingsdagerPeriode,
        schema.behandlingsdagerAntall,
    );
    if (behandlingsdagerSykmelding) perioder.push(behandlingsdagerSykmelding);

    const reisetilskuddSykmelding = buildReisetilskuddSykmelding(
        schema.reisetilskuddSykmelding,
        schema.reisetilskuddPeriode,
    );
    if (reisetilskuddSykmelding) perioder.push(reisetilskuddSykmelding);

    return perioder;
};

export const buildDiagnose = (diagnose?: Partial<Diagnose>): Diagnose | undefined => {
    if (diagnose && diagnose.kode && diagnose.system && diagnose.tekst) {
        // Can not return diagnose parameter. Typescript does not understand that all properties exist
        return {
            system: diagnose.system,
            kode: diagnose.kode,
            tekst: diagnose.tekst,
        };
    } else {
        throw new Error('Manglende informasjon til diagnose');
    }
};

export const buildDiagnoser = (diagnoser?: Partial<Diagnose>[]): Diagnose[] => {
    if (diagnoser) {
        return diagnoser
            .map((partialDiagnose) => buildDiagnose(partialDiagnose))
            .filter((diagnoseOrUndefined): diagnoseOrUndefined is Diagnose => diagnoseOrUndefined !== undefined);
    }
    return [];
};

export const buildAnnenFraversArsak = (
    annenFraversArsak: boolean,
    annenFraversArsakGrunn?: (keyof typeof AnnenFraverGrunn)[],
    annenFraversArsakBeskrivelse?: string | null,
): AnnenFraversArsak | undefined => {
    if (annenFraversArsak && annenFraversArsakGrunn?.length) {
        return {
            grunn: annenFraversArsakGrunn,
            beskrivelse: annenFraversArsakBeskrivelse,
        };
    }
};

export const buildPrognose = (
    arbeidsfoerEtterPeriode: boolean,
    egetArbeidPaSikt: boolean,
    annetArbeidPaSikt: boolean,
    arbeidsforPaSikt: boolean,
    hensynArbeidsplassen?: string | null,
    erIArbeid?: boolean,
    erIkkeIArbeid?: boolean,
    arbeidFOM?: Date | null,
    vurderingsDatoIArbeid?: Date | null,
    arbeidsforFOM?: Date | null,
    vurderingsDatoUtenArbeid?: Date | null,
): Prognose | undefined => {
    if (erIArbeid && erIkkeIArbeid) {
        return {
            arbeidsforEtterPeriode: arbeidsfoerEtterPeriode,
            hensynArbeidsplassen: hensynArbeidsplassen,
            erIArbeid: {
                egetArbeidPaSikt: egetArbeidPaSikt,
                annetArbeidPaSikt: annetArbeidPaSikt,
                arbeidFOM: arbeidFOM,
                vurderingsdato: vurderingsDatoIArbeid,
            },
            erIkkeIArbeid: {
                arbeidsforPaSikt: arbeidsforPaSikt,
                arbeidsforFOM: arbeidsforFOM,
                vurderingsdato: vurderingsDatoUtenArbeid,
            },
        };
    } else if (erIArbeid) {
        return {
            arbeidsforEtterPeriode: arbeidsfoerEtterPeriode,
            hensynArbeidsplassen: hensynArbeidsplassen,
            erIArbeid: {
                egetArbeidPaSikt: egetArbeidPaSikt,
                annetArbeidPaSikt: annetArbeidPaSikt,
                arbeidFOM: arbeidFOM,
                vurderingsdato: vurderingsDatoIArbeid,
            },
        };
    } else if (erIkkeIArbeid) {
        return {
            arbeidsforEtterPeriode: arbeidsfoerEtterPeriode,
            hensynArbeidsplassen: hensynArbeidsplassen,
            erIkkeIArbeid: {
                arbeidsforPaSikt: arbeidsforPaSikt,
                arbeidsforFOM: arbeidsforFOM,
                vurderingsdato: vurderingsDatoUtenArbeid,
            },
        };
    }
};

export const buildUtdypendeOpplysninger = (schema: SchemaType): UtdypendeOpplysningerReturn => {
    return {
        6.1: {
            '6.1.1': schema.utdypende611,
            '6.1.2': schema.utdypende612,
            '6.1.3': schema.utdypende613,
            '6.1.4': schema.utdypende614,
            '6.1.5': schema.utdypende615,
        },
        6.2: {
            '6.2.1': schema.utdypende621,
            '6.2.2': schema.utdypende622,
            '6.2.3': schema.utdypende623,
            '6.2.4': schema.utdypende624,
        },
        6.3: {
            '6.3.1': schema.utdypende631,
            '6.3.2': schema.utdypende632,
        },
        6.4: {
            '6.4.1': schema.utdypende641,
            '6.4.2': schema.utdypende642,
            '6.4.3': schema.utdypende643,
        },
        6.5: {
            '6.5.1': schema.utdypende651,
            '6.5.2': schema.utdypende652,
            '6.5.3': schema.utdypende653,
            '6.5.4': schema.utdypende654,
        },
        6.6: {
            '6.6.1': schema.utdypende661,
            '6.6.2': schema.utdypende662,
            '6.6.3': schema.utdypende663,
        },
    };
};

export const buildRegistrertSykmelding = (schema: SchemaType): RegistrertSykmelding | undefined => {
    // ensure that all mandatory RegistrertSykmeling properties exist on schema and oppgave
    if (
        !schema.pasientFnr ||
        !schema.sykmelderFnr ||
        !schema.aktoerId ||
        !schema.sykmeldersEtternavn ||
        !schema.sykmeldersFornavn ||
        !schema.harArbeidsgiver ||
        !schema.syketilfelleStartDato ||
        !schema.behandletDato ||
        !schema.sykmeldersEtternavn ||
        !schema.sykmeldersFornavn ||
        schema.skjermesForPasient === undefined ||
        schema.skjermesForPasient === null
    ) {
        return undefined;
    }

    const registrertSykmelding: RegistrertSykmelding = {
        pasientFnr: schema.pasientFnr,
        sykmelderFnr: schema.sykmelderFnr,
        perioder: buildPerioder(schema),
        medisinskVurdering: {
            svangerskap: schema.svangerskap,
            yrkesskade: schema.yrkesskade,
            yrkesskadeDato: schema.yrkesskadeDato,
            hovedDiagnose: buildDiagnose(schema.hovedDiagnose),
            biDiagnoser: buildDiagnoser(schema.biDiagnoser),
            annenFraversArsak: buildAnnenFraversArsak(
                schema.annenFraversArsak,
                schema.annenFraversArsakGrunn,
                schema.annenFraversArsakBeskrivelse,
            ),
        },
        syketilfelleStartDato: schema.syketilfelleStartDato,
        arbeidsgiver: {
            harArbeidsgiver: schema.harArbeidsgiver,
            navn: schema.arbeidsgiverNavn,
            yrkesbetegnelse: schema.yrkesbetegnelse,
            stillingsprosent: schema.stillingsprosent,
        },
        behandletDato: schema.behandletDato,
        skjermesForPasient: schema.skjermesForPasient,
        behandler: {
            fnr: schema.sykmelderFnr,
            fornavn: schema.sykmeldersFornavn,
            etternavn: schema.sykmeldersEtternavn,
            hpr: schema.hpr,
            aktoerId: schema.aktoerId,
            adresse: {
                gate: schema.sykmelderGate,
                kommune: schema.sykmelderKommune,
                postnummer: schema.sykmelderPostnummer,
                postboks: schema.sykmelderPostboks,
                land: schema.sykmelderLand,
            },
            tlf: schema.sykmelderTelefon,
        },
        meldingTilArbeidsgiver: schema.meldingTilArbeidsgiverBeskriv,
        meldingTilNAV: {
            bistandUmiddelbart: schema.meldingTilNavBistand,
            beskrivBistand: schema.meldingTilNavBegrunn,
        },
        tiltakNAV: schema.tiltakNav,
        tiltakArbeidsplassen: schema.tiltakArbeidsplassen,
        andreTiltak: schema.andreTiltak,
        prognose: buildPrognose(
            schema.arbeidsfoerEtterPeriode,
            schema.egetArbeidPaSikt,
            schema.annetArbeidPaSikt,
            schema.arbeidsforPaSikt,
            schema.hensynArbeidsplassen,
            schema.erIArbeid,
            schema.erIkkeIArbeid,
            schema.arbeidFOM,
            schema.vurderingsDatoIArbeid,
            schema.arbeidsforFOM,
            schema.vurderingsDatoUtenArbeid,
        ),
        utdypendeOpplysninger: buildUtdypendeOpplysninger(schema),
        kontaktMedPasient: {
            kontaktDato: schema.kontaktDato,
            begrunnelseIkkeKontakt: schema.begrunnelseIkkeKontakt,
        },
    };
    return registrertSykmelding;
};
