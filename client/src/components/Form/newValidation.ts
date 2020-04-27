import { Periode } from '../../types/RegistrertSykmelding';
import { RecursivePartial, Schema } from './NewForm';

type Mandatory<T> = keyof T;
type ValidationType = {
    [key in Mandatory<Schema>]: (value: Schema[key], schema: Schema) => string | undefined;
};

const hasAvventendePeriode = (periode?: RecursivePartial<Periode>): boolean =>
    !!periode?.avventendeInnspillTilArbeidsgiver;

const hasReisetilskudd = (periode?: RecursivePartial<Periode>): boolean => !!periode?.reisetilskudd;

export const validation: ValidationType = {
    pasientFnr: (pasientFnr, schema) => undefined,
    sykmelderFnr: () => undefined,
    perioder: (perioder, schema) => {
        if (!perioder || perioder.length === 0) {
            return 'Minst én periode må være definert';
        }
        if (schema.avventende && !perioder.some(hasAvventendePeriode)) {
            return 'Avventende er krysset av, men det er ikke fylt ut noe periode';
        }
        if (schema.reisetilskudd && !perioder.some(hasReisetilskudd)) {
            return 'Reisetilskudd er krysset av, men det er ikke fylt ut noe periode';
        }
        return undefined;
    },
    medisinskVurdering: () => undefined,
    syketilfelleStartDato: () => undefined,
    arbeidsgiver: () => undefined,
    behandletDato: () => undefined,
    skjermesForPasient: () => undefined,
    // For checkboxes
    avventende: () => undefined,
    reisetilskudd: () => undefined,
};
