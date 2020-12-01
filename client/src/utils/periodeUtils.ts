import { Periode } from '../types/RegistrertSykmelding';

export const getAvventendePeriode = (perioder?: Periode[] | null): Periode[] | undefined =>
    perioder?.filter((periode) => !!periode.avventendeInnspillTilArbeidsgiver);

export const getAktivitetIkkeMuligSykmelding = (perioder?: Periode[] | null): Periode[] | undefined =>
    perioder?.filter((periode) => !!periode.aktivitetIkkeMulig);

export const getBehandlingsdagerSykmelding = (perioder?: Periode[] | null): Periode[] | undefined =>
    perioder?.filter((periode) => !!periode.behandlingsdager);

export const getGradertSykmelding = (perioder?: Periode[] | null): Periode[] | undefined =>
    perioder?.filter((periode) => !!periode.gradert);

export const getReisetilskuddSykmelding = (perioder?: Periode[] | null): Periode[] | undefined =>
    perioder?.filter((periode) => periode.reisetilskudd);
