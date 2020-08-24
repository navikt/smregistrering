import { Periode } from '../types/RegistrertSykmelding';

export const getAvventendePeriode = (perioder?: Periode[] | null): Periode | undefined =>
    perioder?.find((periode) => !!periode.avventendeInnspillTilArbeidsgiver);

export const getAktivitetIkkeMuligSykmelding = (perioder?: Periode[] | null): Periode | undefined =>
    perioder?.find((periode) => !!periode.aktivitetIkkeMulig);

export const getBehandlingsdagerSykmelding = (perioder?: Periode[] | null): Periode | undefined =>
    perioder?.find((periode) => !!periode.behandlingsdager);

export const getGradertSykmelding = (perioder?: Periode[] | null): Periode | undefined =>
    perioder?.find((periode) => !!periode.gradert);

export const getReisetilskuddSykmelding = (perioder?: Periode[] | null): Periode | undefined =>
    perioder?.find((periode) => periode.reisetilskudd);
