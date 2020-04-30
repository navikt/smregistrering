import { ArbeidsrelatertArsak, MedisinskArsak, Periode, RegistrertSykmelding } from '../types/RegistrertSykmelding';
import { Oppgave } from '../types/Oppgave';
import { SchemaType } from '../components/Form/Form';

export const buildPerioder = (schema: SchemaType): Periode[] => {
    const perioder: Periode[] = [];
    if (schema.avventendeSykmelding && schema.avventendePeriode) {
        const periode: Periode = {
            fom: schema.avventendePeriode[0],
            tom: schema.avventendePeriode[1],
            reisetilskudd: false,
            avventendeInnspillTilArbeidsgiver: schema.avventendeInnspillTilArbeidsgiver,
        };
        perioder.push(periode);
    }
    if (schema.gradertSykmelding && schema.gradertPeriode) {
        const periode: Periode = {
            fom: schema.gradertPeriode[0],
            tom: schema.gradertPeriode[1],
            reisetilskudd: false,
            gradert: {
                reisetilskudd: schema.gradertReisetilskudd,
                grad: schema.gradertGrad,
            },
        };
        perioder.push(periode);
    }
    if (schema.aktivitetIkkeMuligSykmelding && schema.aktivitetIkkeMuligPeriode) {
        const medisinskArsak: MedisinskArsak | undefined =
            schema.aktivitetIkkeMuligMedisinskArsakType && schema.aktivitetIkkeMuligMedisinskArsakBeskrivelse
                ? {
                      arsak: schema.aktivitetIkkeMuligMedisinskArsakType,
                      beskrivelse: schema.aktivitetIkkeMuligMedisinskArsakBeskrivelse,
                  }
                : undefined;
        const arbeidsrelatertArsak: ArbeidsrelatertArsak | undefined =
            schema.aktivitetIkkeMuligArbeidsrelatertArsakType &&
            schema.aktivitetIkkeMuligArbeidsrelatertArsakBeskrivelse
                ? {
                      arsak: schema.aktivitetIkkeMuligArbeidsrelatertArsakType,
                      beskrivelse: schema.aktivitetIkkeMuligArbeidsrelatertArsakBeskrivelse,
                  }
                : undefined;

        const periode: Periode = {
            fom: schema.aktivitetIkkeMuligPeriode[0],
            tom: schema.aktivitetIkkeMuligPeriode[1],
            reisetilskudd: false,
            aktivitetIkkeMulig: {
                medisinskArsak,
                arbeidsrelatertArsak,
            },
        };
        perioder.push(periode);
    }
    if (schema.behandlingsdagerSykmelding && schema.behandlingsdagerPeriode && schema.behandlingsdagerAntall) {
        const periode: Periode = {
            fom: schema.behandlingsdagerPeriode[0],
            tom: schema.behandlingsdagerPeriode[1],
            reisetilskudd: false,
            behandlingsdager: schema.behandlingsdagerAntall,
        };
        perioder.push(periode);
    }
    if (schema.reisetilskuddSykmelding && schema.reisetilskuddPeriode) {
        const periode: Periode = {
            fom: schema.reisetilskuddPeriode[0],
            tom: schema.reisetilskuddPeriode[1],
            reisetilskudd: true,
        };
        perioder.push(periode);
    }
    return perioder;
};

export const buildRegistrertSykmelding = (oppgave: Oppgave, schema: SchemaType): RegistrertSykmelding | undefined => {
    // ensure that all the properties exist on schema and oppgave
    console.log(schema);
    if (
        schema.pasientFnr === undefined ||
        schema.sykmelderFnr === undefined ||
        schema.harArbeidsgiver === undefined ||
        schema.skjermesForPasient === undefined ||
        schema.syketilfelleStartDato === undefined ||
        schema.behandletDato === undefined
    )
        return undefined;

    // build registrert sykmelding
    const registrertSykmelding: RegistrertSykmelding = {
        pasientFnr: schema.pasientFnr,
        sykmelderFnr: schema.sykmelderFnr,
        perioder: buildPerioder(schema),
        medisinskVurdering: {
            svangerskap: schema.svangerskap,
            yrkesskade: schema.yrkesskade,
            biDiagnoser: [],
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
    };
    return registrertSykmelding;
};
