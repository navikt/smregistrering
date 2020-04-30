import { ArbeidsrelatertArsak, MedisinskArsak, Periode } from '../types/RegistrertSykmelding';
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
