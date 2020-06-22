import {
    AktivitetIkkeMulig,
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
import { Oppgave } from '../types/Oppgave';
import { SchemaType } from '../components/Form/Form';

const buildAvventendeSykmelding = (
    avventendeSykmelding: boolean,
    avventendePeriode?: Date[],
    avventendeInnspillTilArbeidsgiver?: string,
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

const buildGradertSykmelding = (
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
    aktivitetIkkeMuligMedisinskArsakBeskrivelse?: string,
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
    aktivitetIkkeMuligArbeidsrelatertArsakBeskrivelse?: string,
): ArbeidsrelatertArsak | undefined => {
    if (aktivitetIkkeMuligArbeidsrelatertArsak && aktivitetIkkeMuligArbeidsrelatertArsakType?.length) {
        return {
            arsak: aktivitetIkkeMuligArbeidsrelatertArsakType,
            beskrivelse: aktivitetIkkeMuligArbeidsrelatertArsakBeskrivelse,
        };
    }
};

const buildAktivitetIkkeMuligSykmelding = (
    aktivitetIkkeMuligSykmelding: boolean,
    aktivitetIkkeMuligPeriode?: Date[],
    aktivitetIkkeMuligMedisinskArsak?: boolean,
    aktivitetIkkeMuligMedisinskArsakType?: (keyof typeof MedisinskArsakType)[],
    aktivitetIkkeMuligMedisinskArsakBeskrivelse?: string,
    aktivitetIkkeMuligArbeidsrelatertArsak?: boolean,
    aktivitetIkkeMuligArbeidsrelatertArsakType?: (keyof typeof ArbeidsrelatertArsakType)[],
    aktivitetIkkeMuligArbeidsrelatertArsakBeskrivelse?: string,
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

const buildBehandlingsdagerSykmelding = (
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

const buildReisetilskuddSykmelding = (
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

    const avventendeSykmelding = buildAvventendeSykmelding(schema.avventendeSykmelding, schema.avventendePeriode);
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

const buildDiagnose = (diagnose?: Partial<Diagnose>): Diagnose | undefined => {
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

const buildDiagnoser = (diagnoser?: Partial<Diagnose>[]): Diagnose[] => {
    if (diagnoser) {
        return diagnoser
            .map(partialDiagnose => buildDiagnose(partialDiagnose))
            .filter((diagnoseOrUndefined): diagnoseOrUndefined is Diagnose => diagnoseOrUndefined !== undefined);
    }
    return [];
};

const buildAnnenFraversArsak = (schema: SchemaType): AnnenFraversArsak | undefined => {
    if (schema.annenFraversArsak && schema.annenFraversArsakGrunn?.length) {
        return {
            grunn: schema.annenFraversArsakGrunn,
            beskrivelse: schema.annenFraversArsakBeskrivelse,
        };
    }
};

const buildPrognose = (schema: SchemaType): Prognose | undefined => {
    if (schema.arbeidsfoerEtterPeriode === undefined) {
        return undefined;
    }
    if (schema.erIArbeid && schema.erIkkeIArbeid) {
        return {
            arbeidsforEtterPeriode: schema.arbeidsfoerEtterPeriode,
            hensynArbeidsplassen: schema.hensynPaArbeidsplassen,
            erIArbeid: {
                egetArbeidPaSikt: schema.egetArbeidPaSikt,
                annetArbeidPaSikt: schema.annetArbeidPaSikt,
                arbeidFOM: schema.arbeidFOM,
                vurderingsdato: schema.vurderingsDatoIArbeid,
            },
            erIkkeIArbeid: {
                arbeidsforPaSikt: schema.arbeidsforPaSikt,
                arbeidsforFOM: schema.arbeidsforFOM,
            },
        };
    } else if (schema.erIArbeid) {
        return {
            arbeidsforEtterPeriode: schema.arbeidsfoerEtterPeriode,
            hensynArbeidsplassen: schema.hensynPaArbeidsplassen,
            erIArbeid: {
                egetArbeidPaSikt: schema.egetArbeidPaSikt,
                annetArbeidPaSikt: schema.annetArbeidPaSikt,
                arbeidFOM: schema.arbeidFOM,
                vurderingsdato: schema.vurderingsDatoIArbeid,
            },
        };
    } else if (schema.erIkkeIArbeid) {
        return {
            arbeidsforEtterPeriode: schema.arbeidsfoerEtterPeriode,
            hensynArbeidsplassen: schema.hensynPaArbeidsplassen,
            erIkkeIArbeid: {
                arbeidsforPaSikt: schema.arbeidsforPaSikt,
                arbeidsforFOM: schema.arbeidsforFOM,
            },
        };
    }
};

const buildUtdypendeOpplysninger = (schema: SchemaType): UtdypendeOpplysningerReturn => {
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

export const buildRegistrertSykmelding = (oppgave: Oppgave, schema: SchemaType): RegistrertSykmelding | undefined => {
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
            annenFraversArsak: buildAnnenFraversArsak(schema),
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
        prognose: buildPrognose(schema),
        utdypendeOpplysninger: buildUtdypendeOpplysninger(schema),
        kontaktMedPasient: {
            kontaktDato: schema.kontaktDato,
            begrunnelseIkkeKontakt: schema.begrunnelseIkkeKontakt,
        },
    };
    return registrertSykmelding;
};
