import { AktivitetIkkeMuligPeriodeMFA } from './components/formSections/MulighetForArbeidSection/AktivitetIkkeMuligPeriode';
import { AvventendePeriodeMFA } from './components/formSections/MulighetForArbeidSection/AvventendePeriode';
import { BehandlingsdagerPeriodeMFA } from './components/formSections/MulighetForArbeidSection/BehandlingsdagerPeriode';
import { FormType } from './Form';
import { GradertPeriodeMFA } from './components/formSections/MulighetForArbeidSection/GradertPeriode';
import { ReisetilskuddPeriodeMFA } from './components/formSections/MulighetForArbeidSection/ReisetilskuddPeriode';
import { ValidationFunctions } from './formUtils/useForm';

export const validationFunctions: ValidationFunctions<FormType> = {
    // Other
    syketilfelleStartDato: () => undefined,

    // Pasientopplysninger
    pasientFnr: (schema) => {
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
    harArbeidsgiver: (schema) => {
        if (!schema.harArbeidsgiver) {
            return 'Arbeidssituasjon må være definert';
        }
        return undefined;
    },
    arbeidsgiverNavn: (schema) => {
        return undefined;
    },
    yrkesbetegnelse: (schema) => {
        return undefined;
    },
    stillingsprosent: (schema) => {
        if (schema.stillingsprosent && (schema.stillingsprosent > 100 || schema.stillingsprosent < 0)) {
            return 'Stillingsprosenten må være mellom 0 og 100';
        }
        return undefined;
    },

    // Diagnose
    hovedDiagnose: (schema) => {
        if (schema.hovedDiagnose && schema.hovedDiagnose.system) {
            if (!schema.hovedDiagnose.kode) return 'Kode tilhørende hoveddiagnose må være definert når system er valgt';
        }
        return undefined;
    },
    biDiagnoser: (schema) => {
        if (schema.biDiagnoser?.length) {
            let feilmelding: string | undefined = undefined;
            schema.biDiagnoser.forEach((biDiagnose) => {
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
    yrkesskadeDato: (schema) => {
        if (schema.yrkesskade && !schema.yrkesskadeDato) {
            return 'Yrkesskadedato må være definer når yrkesskade er krysset av';
        }
        return undefined;
    },
    svangerskap: (schema) => {
        if (schema.svangerskap === undefined) {
            return 'Svangerskap må være definert';
        }
        return undefined;
    },
    annenFraversArsak: () => undefined,
    annenFraversArsakGrunn: (schema) => {
        if (schema.annenFraversArsak && !schema.annenFraversArsakGrunn?.length) {
            return 'Lovfestet fraværsgrunn må være valgt når annen lovfestet fraværsgrunn er avkrysset';
        }
    },
    annenFraversArsakBeskrivelse: () => undefined,
    skjermesForPasient: (schema) => {
        if (schema.skjermesForPasient === undefined) {
            return 'SkjermesForPasient er et påkrevd felt';
        }
        return undefined;
    },

    // MulighetForArbeid
    mulighetForArbeid: (schema) => {
        if (!schema.mulighetForArbeid) {
            return 'Minimum én sykmeldingsperiode må være definert';
        }

        const definedMFA = schema.mulighetForArbeid.filter((mfa) => mfa);

        if (definedMFA.filter((mfa) => mfa).length === 0) {
            return 'Minimum én sykmeldingsperiode må være definert';
        }

        const avventendeMFA = definedMFA.filter((mfa) => mfa?.type === 'avventende') as AvventendePeriodeMFA[];
        const gradertMFA = definedMFA.filter((mfa) => mfa?.type === 'gradert') as GradertPeriodeMFA[];
        const aktivitetIkkeMuligMFA = definedMFA.filter(
            (mfa) => mfa?.type === 'fullsykmelding',
        ) as AktivitetIkkeMuligPeriodeMFA[];
        const behandlingsdagerMFA = definedMFA.filter(
            (mfa) => mfa?.type === 'behandlingsdager',
        ) as BehandlingsdagerPeriodeMFA[];
        const reisetilskuddMFA = definedMFA.filter((mfa) => mfa?.type === 'reisetilskudd') as ReisetilskuddPeriodeMFA[];

        // Perioder for avventende sykmelding
        if (
            avventendeMFA.some(
                (avventendeSykmelding) =>
                    !avventendeSykmelding.avventendePeriode || avventendeSykmelding.avventendePeriode.length === 1,
            )
        ) {
            // TODO: This check will never occur as RangePicker will set end date to start date if no end date is selected by the user. Currently not an issue as this allows the user to set a period of 1 day
            return 'Periode må være definert når avventende sykmelding er valgt';
        }

        if (avventendeMFA.some((avventendeSykmelding) => !avventendeSykmelding.avventendeInnspillTilArbeidsgiver)) {
            return 'Innspill til arbeidsgiver om tilrettelegging må være utfylt når avventende sykmelding er krysset av';
        }

        // Perioder for gradert sykmelding
        if (
            gradertMFA.some(
                (gradertSykmelding) =>
                    !gradertSykmelding.gradertPeriode || gradertSykmelding.gradertPeriode.length === 1,
            )
        ) {
            return 'Periode må være definert når gradert sykmelding er valgt';
        }

        if (gradertMFA.some((gradertSykmelding) => !gradertSykmelding.gradertGrad)) {
            return 'Grad for gradert periode må være definert';
        }

        if (
            gradertMFA.some(
                (gradertSykmelding) =>
                    gradertSykmelding.gradertGrad &&
                    (gradertSykmelding.gradertGrad < 0 || gradertSykmelding.gradertGrad > 100),
            )
        ) {
            return 'Grad for gradert periode må være et tall mellom 0 og 100';
        }

        // Perioder for full sykmelding
        if (
            aktivitetIkkeMuligMFA.some(
                (aktivitetIkkeMulig) =>
                    !aktivitetIkkeMulig.aktivitetIkkeMuligPeriode ||
                    aktivitetIkkeMulig.aktivitetIkkeMuligPeriode.length === 1,
            )
        ) {
            return 'Periode må være definert når aktivitet ikke er mulig';
        }

        /*
        if (
            aktivitetIkkeMuligMFA.some(
                (aktivitetIkkeMulig) =>
                    aktivitetIkkeMulig.aktivitetIkkeMuligMedisinskArsak &&
                    (!aktivitetIkkeMulig.aktivitetIkkeMuligMedisinskArsakType ||
                        aktivitetIkkeMulig.aktivitetIkkeMuligMedisinskArsakType?.length === 0),
            )
        ) {
            return 'Minst én medisinsk årsak må være valgt når det er medisinske årsaker som hindrer aktivitet';
        }
        

        if (
            aktivitetIkkeMuligMFA.some(
                (aktivitetIkkeMulig) =>
                    aktivitetIkkeMulig.aktivitetIkkeMuligArbeidsrelatertArsak &&
                    (!aktivitetIkkeMulig.aktivitetIkkeMuligArbeidsrelatertArsakType ||
                        aktivitetIkkeMulig.aktivitetIkkeMuligArbeidsrelatertArsakType?.length === 0),
            )
        ) {
            return 'Minst én arbeidsrelatert årsak må være valgt når det er arbeidsrelaterte årsaker som hindrer aktivitet';
        }
        */

        // Perioder for sykmelding for behandlingsdager
        if (
            behandlingsdagerMFA.some(
                (behandlingsdager) =>
                    !behandlingsdager.behandlingsdagerPeriode || behandlingsdager.behandlingsdagerPeriode.length === 1,
            )
        ) {
            return 'Periode må være definert når pasienten krever sykmelding for behandlingsdager';
        }

        if (behandlingsdagerMFA.some((behandlingsdager) => !behandlingsdager.behandlingsdagerAntall)) {
            return 'Antall dager må være definert når pasienten krever sykmelding for behandlingsdager';
        }

        // Perioder for sykmelding med reisetilskudd
        if (
            reisetilskuddMFA.some(
                (reisetilskudd) =>
                    !reisetilskudd.reisetilskuddPeriode || reisetilskudd.reisetilskuddPeriode.length === 1,
            )
        ) {
            return 'Periode må være definert når pasienten krever sykmelding med reistilskudd';
        }

        return undefined;
    },

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
    behandletDato: (schema) => {
        if (!schema.behandletDato) {
            return 'Behandletdato må være definert';
        }
        return undefined;
    },
    sykmelderFnr: () => undefined,
    aktoerId: () => undefined,
    sykmeldersFornavn: () => undefined,
    sykmeldersEtternavn: () => undefined,
    hpr: (schema) => {
        if (!schema.hpr) {
            return 'Behandlers HPR-nummer må være definert';
        }
        // Number must be in synch with schema.hpr.length in BekreftelseSection.ts
        if (schema.hpr.length < 7 || schema.hpr.length > 9) {
            return 'Behandlers HPR-nummer må være mellom 7 og 9 siffer';
        }
        if (!schema.hpr.match('^\\+?[- _0-9]+$')) {
            return 'Behandlers HPR-nummer er ikke på et gyldig format';
        }
        return undefined;
    },
    sykmelderTelefon: () => undefined,
    sykmelderGate: () => undefined,
    sykmelderKommune: () => undefined,
    sykmelderPostnummer: () => undefined,
    sykmelderPostboks: () => undefined,
    sykmelderLand: () => undefined,
};
