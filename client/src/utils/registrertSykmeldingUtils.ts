import {
    ArbeidsrelatertArsak,
    ArbeidsrelatertArsakType,
    Diagnose,
    MedisinskArsak,
    MedisinskArsakType,
    Periode,
    RegistrertSykmelding,
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
    aktivitetIkkeMuligMedisinskArsakType?: MedisinskArsakType[],
    aktivitetIkkeMuligMedisinskArsakBeskrivelse?: string,
): MedisinskArsak | undefined => {
    if (aktivitetIkkeMuligMedisinskArsakType && aktivitetIkkeMuligMedisinskArsakBeskrivelse) {
        return {
            arsak: aktivitetIkkeMuligMedisinskArsakType,
            beskrivelse: aktivitetIkkeMuligMedisinskArsakBeskrivelse,
        };
    }
};

const buildArbeidsrelatertArsak = (
    aktivitetIkkeMuligArbeidsrelatertArsakType?: ArbeidsrelatertArsakType[],
    aktivitetIkkeMuligArbeidsrelatertArsakBeskrivelse?: string,
): ArbeidsrelatertArsak | undefined => {
    if (aktivitetIkkeMuligArbeidsrelatertArsakType && aktivitetIkkeMuligArbeidsrelatertArsakBeskrivelse) {
        return {
            arsak: aktivitetIkkeMuligArbeidsrelatertArsakType,
            beskrivelse: aktivitetIkkeMuligArbeidsrelatertArsakBeskrivelse,
        };
    }
};

const buildAktivitetIkkeMuligSykmelding = (
    aktivitetIkkeMuligSykmelding: boolean,
    aktivitetIkkeMuligPeriode?: Date[],
    aktivitetIkkeMuligMedisinskArsakType?: MedisinskArsakType[],
    aktivitetIkkeMuligMedisinskArsakBeskrivelse?: string,
    aktivitetIkkeMuligArbeidsrelatertArsakType?: ArbeidsrelatertArsakType[],
    aktivitetIkkeMuligArbeidsrelatertArsakBeskrivelse?: string,
): Periode | undefined => {
    if (aktivitetIkkeMuligSykmelding && aktivitetIkkeMuligPeriode) {
        const medisinskArsak = buildMedisinskArsak(
            aktivitetIkkeMuligMedisinskArsakType,
            aktivitetIkkeMuligMedisinskArsakBeskrivelse,
        );
        const arbeidsrelatertArsak = buildArbeidsrelatertArsak(
            aktivitetIkkeMuligArbeidsrelatertArsakType,
            aktivitetIkkeMuligArbeidsrelatertArsakBeskrivelse,
        );

        const periode: Periode = {
            fom: aktivitetIkkeMuligPeriode[0],
            tom: aktivitetIkkeMuligPeriode[1],
            reisetilskudd: false,
            aktivitetIkkeMulig: {
                medisinskArsak,
                arbeidsrelatertArsak,
            },
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
        schema.aktivitetIkkeMuligMedisinskArsakType,
        schema.aktivitetIkkeMuligMedisinskArsakBeskrivelse,
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
    }
};

const buildDiagnoser = (diagnoser?: Partial<Diagnose>[]): Diagnose[] | undefined[] => {
    if (diagnoser) {
        return diagnoser
            .map(partialDiagnose => buildDiagnose(partialDiagnose))
            .filter((diagnoseOrUndefined): diagnoseOrUndefined is Diagnose => diagnoseOrUndefined !== undefined);
    }
    return [];
};

export const buildRegistrertSykmelding = (oppgave: Oppgave, schema: SchemaType): RegistrertSykmelding | undefined => {
    // ensure that all mandatory RegistrertSykmeling properties exist on schema and oppgave
    if (
        schema.pasientFnr === undefined ||
        schema.sykmelderFnr === undefined ||
        schema.harArbeidsgiver === undefined ||
        schema.skjermesForPasient === undefined ||
        schema.syketilfelleStartDato === undefined ||
        schema.behandletDato === undefined ||
        schema.sykmeldersEtternavn === undefined ||
        schema.sykmeldersFornavn === undefined
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
            hovedDiagnose: buildDiagnose(schema.hovedDiagnose),
            biDiagnoser: buildDiagnoser(schema.biDiagnoser),
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
            adresse: schema.sykmelderAdresse,
            tlf: schema.sykmelderTelefon,
        },
        meldingTilArbeidsgiver: schema.meldingTilArbeidsgiverBeskriv,
        meldingTilNAV: {
            bistandUmiddelbart: schema.meldingTilNavBistand,
            beskrivBistand: schema.meldingTilNavBegrunn,
        },
        tiltakNav: schema.tiltakNavBeskriv,
        tiltakArbeidsplassen: schema.tilretteleggingArbeidsplassBeskriv,
        andreTiltak: schema.innspillTilNavBeskriv,
        /* prognose: {
            arbeidsforEtterPeriode: schema.arbeidsfoerEtterPeriode
        } */
    };
    return registrertSykmelding;
};
