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
import { AktivitetIkkeMuligPeriodeMFA } from '../components/Form/components/formSections/MulighetForArbeidSection/AktivitetIkkeMuligPeriode';
import { AvventendePeriodeMFA } from '../components/Form/components/formSections/MulighetForArbeidSection/AvventendePeriode';
import { BehandlingsdagerPeriodeMFA } from '../components/Form/components/formSections/MulighetForArbeidSection/BehandlingsdagerPeriode';
import { FormType } from '../components/Form/Form';
import { GradertPeriodeMFA } from '../components/Form/components/formSections/MulighetForArbeidSection/GradertPeriode';
import { MulighetForArbeidTypes } from '../components/Form/components/formSections/MulighetForArbeidSection/MulighetForArbeidSection';
import { ReisetilskuddPeriodeMFA } from '../components/Form/components/formSections/MulighetForArbeidSection/ReisetilskuddPeriode';

export const buildAvventendeSykmelding = (mulighetForArbeid: MulighetForArbeidTypes[]): Periode[] | undefined => {
    const avventendeMFA = mulighetForArbeid.filter((mfa) => mfa?.type === 'avventende') as AvventendePeriodeMFA[];

    return avventendeMFA.reduce((acc, mfa) => {
        if (mfa.avventendePeriode && mfa.avventendeInnspillTilArbeidsgiver) {
            const periode: Periode = {
                fom: mfa.avventendePeriode[0],
                tom: mfa.avventendePeriode[1],
                reisetilskudd: false,
                avventendeInnspillTilArbeidsgiver: mfa.avventendeInnspillTilArbeidsgiver,
            };
            acc.push(periode);
        }
        return acc;
    }, [] as Periode[]);
};

export const buildGradertSykmelding = (mulighetForArbeid: MulighetForArbeidTypes[]): Periode[] | undefined => {
    const gradertMFA = mulighetForArbeid.filter((mfa) => mfa?.type === 'gradert') as GradertPeriodeMFA[];

    return gradertMFA.reduce((acc, mfa) => {
        if (mfa.gradertPeriode) {
            const periode: Periode = {
                fom: mfa.gradertPeriode[0],
                tom: mfa.gradertPeriode[1],
                reisetilskudd: false,
                gradert: {
                    reisetilskudd: mfa.gradertReisetilskudd,
                    grad: mfa.gradertGrad,
                },
            };
            acc.push(periode);
        }
        return acc;
    }, [] as Periode[]);
};

export const buildMedisinskArsak = (
    aktivitetIkkeMuligMedisinskArsak?: boolean,
    aktivitetIkkeMuligMedisinskArsakType?: (keyof typeof MedisinskArsakType)[],
    aktivitetIkkeMuligMedisinskArsakBeskrivelse?: string | null,
): MedisinskArsak | undefined => {
    if (aktivitetIkkeMuligMedisinskArsak) {
        return {
            arsak: aktivitetIkkeMuligMedisinskArsakType || [],
            beskrivelse: aktivitetIkkeMuligMedisinskArsakBeskrivelse,
        };
    }
};

export const buildArbeidsrelatertArsak = (
    aktivitetIkkeMuligArbeidsrelatertArsak?: boolean,
    aktivitetIkkeMuligArbeidsrelatertArsakType?: (keyof typeof ArbeidsrelatertArsakType)[],
    aktivitetIkkeMuligArbeidsrelatertArsakBeskrivelse?: string | null,
): ArbeidsrelatertArsak | undefined => {
    if (aktivitetIkkeMuligArbeidsrelatertArsak) {
        return {
            arsak: aktivitetIkkeMuligArbeidsrelatertArsakType || [],
            beskrivelse: aktivitetIkkeMuligArbeidsrelatertArsakBeskrivelse,
        };
    }
};

export const buildAktivitetIkkeMuligSykmelding = (
    mulighetForArbeid: MulighetForArbeidTypes[],
): Periode[] | undefined => {
    const aktivitetIkkeMuligMFA = mulighetForArbeid.filter(
        (mfa) => mfa?.type === 'fullsykmelding',
    ) as AktivitetIkkeMuligPeriodeMFA[];

    return aktivitetIkkeMuligMFA.reduce((acc, mfa) => {
        if (mfa.aktivitetIkkeMuligPeriode) {
            const medisinskArsak = buildMedisinskArsak(
                mfa.aktivitetIkkeMuligMedisinskArsak,
                mfa.aktivitetIkkeMuligMedisinskArsakType,
                mfa.aktivitetIkkeMuligMedisinskArsakBeskrivelse,
            );
            const arbeidsrelatertArsak = buildArbeidsrelatertArsak(
                mfa.aktivitetIkkeMuligArbeidsrelatertArsak,
                mfa.aktivitetIkkeMuligArbeidsrelatertArsakType,
                mfa.aktivitetIkkeMuligArbeidsrelatertArsakBeskrivelse,
            );
            const aktivitetIkkeMulig: AktivitetIkkeMulig = {
                medisinskArsak,
                arbeidsrelatertArsak,
            };

            const periode: Periode = {
                fom: mfa.aktivitetIkkeMuligPeriode[0],
                tom: mfa.aktivitetIkkeMuligPeriode[1],
                reisetilskudd: false,
                aktivitetIkkeMulig,
            };
            acc.push(periode);
        }
        return acc;
    }, [] as Periode[]);
};

export const buildBehandlingsdagerSykmelding = (mulighetForArbeid: MulighetForArbeidTypes[]): Periode[] | undefined => {
    const behandlingsdagerMFA = mulighetForArbeid.filter(
        (mfa) => mfa?.type === 'behandlingsdager',
    ) as BehandlingsdagerPeriodeMFA[];

    return behandlingsdagerMFA.reduce((acc, mfa) => {
        if (mfa.behandlingsdagerPeriode && mfa.behandlingsdagerAntall) {
            const periode: Periode = {
                fom: mfa.behandlingsdagerPeriode[0],
                tom: mfa.behandlingsdagerPeriode[1],
                reisetilskudd: false,
                behandlingsdager: mfa.behandlingsdagerAntall,
            };
            acc.push(periode);
        }
        return acc;
    }, [] as Periode[]);
};

export const buildReisetilskuddSykmelding = (mulighetForArbeid: MulighetForArbeidTypes[]): Periode[] | undefined => {
    const reisetilskuddMFA = mulighetForArbeid.filter(
        (mfa) => mfa?.type === 'reisetilskudd',
    ) as ReisetilskuddPeriodeMFA[];

    return reisetilskuddMFA.reduce((acc, mfa) => {
        if (mfa.reisetilskuddPeriode) {
            const periode: Periode = {
                fom: mfa.reisetilskuddPeriode[0],
                tom: mfa.reisetilskuddPeriode[1],
                reisetilskudd: true,
            };
            acc.push(periode);
        }
        return acc;
    }, [] as Periode[]);
};

export const buildPerioder = (schema: FormType): Periode[] => {
    const perioder: Periode[] = [];

    const avventendeSykmelding = buildAvventendeSykmelding(schema.mulighetForArbeid);
    if (avventendeSykmelding) perioder.push(...avventendeSykmelding);

    const gradertSykmelding = buildGradertSykmelding(schema.mulighetForArbeid);
    if (gradertSykmelding) perioder.push(...gradertSykmelding);

    const aktivitetIkkeMuligSykmelding = buildAktivitetIkkeMuligSykmelding(schema.mulighetForArbeid);
    if (aktivitetIkkeMuligSykmelding) perioder.push(...aktivitetIkkeMuligSykmelding);

    const behandlingsdagerSykmelding = buildBehandlingsdagerSykmelding(schema.mulighetForArbeid);
    if (behandlingsdagerSykmelding) perioder.push(...behandlingsdagerSykmelding);

    const reisetilskuddSykmelding = buildReisetilskuddSykmelding(schema.mulighetForArbeid);
    if (reisetilskuddSykmelding) perioder.push(...reisetilskuddSykmelding);

    return perioder;
};

export const buildDiagnose = (diagnose?: Partial<Diagnose>): Diagnose | undefined => {
    // Catches the cases where a bidiagnoseRow exists but is not filled
    if (diagnose && diagnose.system !== undefined && diagnose.system.length === 0) {
        return undefined;
    }

    if (diagnose && diagnose.kode && diagnose.system && diagnose.tekst) {
        // Can not return diagnose parameter. Typescript does not understand that all properties exist
        return {
            system: diagnose.system,
            kode: diagnose.kode,
            tekst: diagnose.tekst,
        };
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
    } else if (arbeidsfoerEtterPeriode) {
        return {
            arbeidsforEtterPeriode: arbeidsfoerEtterPeriode,
            hensynArbeidsplassen,
        };
    }
};

export const buildUtdypendeOpplysninger = (schema: FormType): UtdypendeOpplysningerReturn => {
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

export const buildRegistrertSykmelding = (schema: FormType): RegistrertSykmelding | undefined => {
    // ensure that all mandatory RegistrertSykmeling properties exist on schema and oppgave
    if (
        !schema.pasientFnr ||
        !schema.hpr ||
        !schema.harArbeidsgiver ||
        !schema.behandletDato ||
        schema.skjermesForPasient === undefined ||
        schema.skjermesForPasient === null
    ) {
        return undefined;
    }

    const registrertSykmelding: RegistrertSykmelding = {
        pasientFnr: schema.pasientFnr,
        sykmelderFnr: '',
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
            fnr: '',
            fornavn: '',
            etternavn: '',
            hpr: schema.hpr,
            aktoerId: '',
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
