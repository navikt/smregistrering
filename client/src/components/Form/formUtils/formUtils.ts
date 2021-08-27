import { AktivitetIkkeMuligPeriodeMFA } from '../components/formSections/MulighetForArbeidSection/AktivitetIkkeMuligPeriode';
import { AvventendePeriodeMFA } from '../components/formSections/MulighetForArbeidSection/AvventendePeriode';
import { BehandlingsdagerPeriodeMFA } from '../components/formSections/MulighetForArbeidSection/BehandlingsdagerPeriode';
import { Diagnosekoder } from '../../../types/diagnosekoder/Diagnosekoder';
import { FormType } from '../Form';
import { GradertPeriodeMFA } from '../components/formSections/MulighetForArbeidSection/GradertPeriode';
import { MulighetForArbeidTypes } from '../components/formSections/MulighetForArbeidSection/MulighetForArbeidSection';
import { Oppgave } from '../../../types/oppgave/Oppgave';
import { ReisetilskuddPeriodeMFA } from '../components/formSections/MulighetForArbeidSection/ReisetilskuddPeriode';
import {
    getAktivitetIkkeMuligSykmelding,
    getAvventendePeriode,
    getBehandlingsdagerSykmelding,
    getGradertSykmelding,
    getReisetilskuddSykmelding,
} from '../../../utils/periodeUtils';
import { getPrefilledBidiagnoser, getPrefilledDiagnose } from '../../../utils/diagnoseUtils';

export const getInitialFormState = (oppgave: Oppgave, diagnosekoder: Diagnosekoder): FormType => {
    const avventendePeriode = getAvventendePeriode(oppgave.papirSmRegistering?.perioder);
    const gradertPeriode = getGradertSykmelding(oppgave.papirSmRegistering?.perioder);
    const aktivitetIkkeMuligPeriode = getAktivitetIkkeMuligSykmelding(oppgave.papirSmRegistering?.perioder);
    const behandlingsdagerPeriode = getBehandlingsdagerSykmelding(oppgave.papirSmRegistering?.perioder);
    const reisetilskuddPeriode = getReisetilskuddSykmelding(oppgave.papirSmRegistering?.perioder);

    const createMulighetForArbeid = () => {
        const mulighetForArbeid: MulighetForArbeidTypes[] = [];

        if (avventendePeriode) {
            const avventendePeriodeMFA: AvventendePeriodeMFA[] = avventendePeriode.map((periode) => ({
                type: 'avventende',
                avventendePeriode: [periode.fom, periode.tom],
                avventendeInnspillTilArbeidsgiver: periode.avventendeInnspillTilArbeidsgiver || null,
            }));

            mulighetForArbeid.push(...avventendePeriodeMFA);
        }

        if (gradertPeriode) {
            const gradertPeriodeMFA: GradertPeriodeMFA[] = gradertPeriode.map((periode) => ({
                type: 'gradert',
                gradertPeriode: [periode.fom, periode.tom],
                gradertGrad: periode.gradert?.grad || null,
                gradertReisetilskudd: periode.reisetilskudd,
            }));

            mulighetForArbeid.push(...gradertPeriodeMFA);
        }

        if (aktivitetIkkeMuligPeriode) {
            const aktivitetIkkeMuligPeriodeMFA: AktivitetIkkeMuligPeriodeMFA[] = aktivitetIkkeMuligPeriode.map(
                (periode) => ({
                    type: 'fullsykmelding',
                    aktivitetIkkeMuligPeriode: !!periode ? [periode.fom, periode.tom] : null,
                    aktivitetIkkeMuligMedisinskArsak: !!periode?.aktivitetIkkeMulig?.medisinskArsak,
                    aktivitetIkkeMuligMedisinskArsakType: periode?.aktivitetIkkeMulig?.medisinskArsak?.arsak ?? [],
                    aktivitetIkkeMuligMedisinskArsakBeskrivelse:
                        periode?.aktivitetIkkeMulig?.medisinskArsak?.beskrivelse ?? null,
                    aktivitetIkkeMuligArbeidsrelatertArsak: !!periode?.aktivitetIkkeMulig?.arbeidsrelatertArsak,
                    aktivitetIkkeMuligArbeidsrelatertArsakType:
                        periode?.aktivitetIkkeMulig?.arbeidsrelatertArsak?.arsak ?? [],
                    aktivitetIkkeMuligArbeidsrelatertArsakBeskrivelse:
                        periode?.aktivitetIkkeMulig?.arbeidsrelatertArsak?.beskrivelse ?? null,
                }),
            );

            mulighetForArbeid.push(...aktivitetIkkeMuligPeriodeMFA);
        }

        if (behandlingsdagerPeriode) {
            const behandlingsdagerPeriodeMFA: BehandlingsdagerPeriodeMFA[] = behandlingsdagerPeriode.map((periode) => ({
                type: 'behandlingsdager',
                behandlingsdagerPeriode: [periode.fom, periode.tom],
                behandlingsdagerAntall: periode.behandlingsdager || null,
            }));

            mulighetForArbeid.push(...behandlingsdagerPeriodeMFA);
        }

        if (reisetilskuddPeriode) {
            const reisetilskuddPeriodeMFA: ReisetilskuddPeriodeMFA[] = reisetilskuddPeriode.map((periode) => ({
                type: 'reisetilskudd',
                reisetilskuddPeriode: [periode.fom, periode.tom],
            }));

            mulighetForArbeid.push(...reisetilskuddPeriodeMFA);
        }

        return mulighetForArbeid;
    };

    return {
        // Other
        syketilfelleStartDato: oppgave.papirSmRegistering?.syketilfelleStartDato ?? null,

        // Pasientopplysninger
        pasientFnr: oppgave.papirSmRegistering?.fnr ?? null,

        // Arbeidsgiver
        harArbeidsgiver: oppgave.papirSmRegistering?.arbeidsgiver?.harArbeidsgiver ?? null,
        arbeidsgiverNavn: oppgave.papirSmRegistering?.arbeidsgiver?.navn ?? null,
        yrkesbetegnelse: oppgave.papirSmRegistering?.arbeidsgiver?.yrkesbetegnelse ?? null,
        stillingsprosent: oppgave.papirSmRegistering?.arbeidsgiver?.stillingsprosent ?? null,

        // Diagnose
        yrkesskade: !!oppgave.papirSmRegistering?.medisinskVurdering?.yrkesskade,
        yrkesskadeDato: oppgave.papirSmRegistering?.medisinskVurdering?.yrkesskadeDato ?? null,
        skjermesForPasient: !!oppgave.papirSmRegistering?.skjermesForPasient,
        svangerskap: !!oppgave.papirSmRegistering?.medisinskVurdering?.svangerskap,
        annenFraversArsak: !!oppgave.papirSmRegistering?.medisinskVurdering?.annenFraversArsak,
        annenFraversArsakGrunn: oppgave.papirSmRegistering?.medisinskVurdering?.annenFraversArsak?.grunn ?? null,
        annenFraversArsakBeskrivelse:
            oppgave.papirSmRegistering?.medisinskVurdering?.annenFraversArsak?.beskrivelse ?? null,
        hovedDiagnose: getPrefilledDiagnose(
            diagnosekoder,
            oppgave.papirSmRegistering?.medisinskVurdering?.hovedDiagnose ?? null,
        ),
        biDiagnoser: getPrefilledBidiagnoser(
            diagnosekoder,
            oppgave.papirSmRegistering?.medisinskVurdering?.biDiagnoser ?? null,
        ),

        // MulighetForArbeid
        mulighetForArbeid: createMulighetForArbeid(),

        // UtdypendeOpplysninger
        harUtdypendeOpplysninger: false,

        // MeldingTilNav
        meldingTilNavBistand: !!oppgave.papirSmRegistering?.meldingTilNAV?.bistandUmiddelbart,
        meldingTilNavBegrunn: oppgave.papirSmRegistering?.meldingTilNAV?.beskrivBistand ?? null,

        // MeldingTilArbeidsgiver
        meldingTilArbeidsgiverBeskriv: oppgave.papirSmRegistering?.meldingTilArbeidsgiver ?? null,

        // Tilbakedatering
        erTilbakedatert: !!oppgave.papirSmRegistering?.kontaktMedPasient?.kontaktDato,
        kontaktDato: oppgave.papirSmRegistering?.kontaktMedPasient?.kontaktDato ?? null,
        kunneIkkeIvaretaEgneInteresser: !!oppgave.papirSmRegistering?.kontaktMedPasient?.begrunnelseIkkeKontakt,
        begrunnelseIkkeKontakt: oppgave.papirSmRegistering?.kontaktMedPasient?.begrunnelseIkkeKontakt ?? null,

        // Bekreftelse
        behandletDato: oppgave.papirSmRegistering?.behandletTidspunkt ?? null,
        sykmelderFnr: oppgave.papirSmRegistering?.behandler?.fnr ?? null,
        sykmeldersFornavn: oppgave.papirSmRegistering?.behandler?.fornavn ?? null,
        sykmeldersEtternavn: oppgave.papirSmRegistering?.behandler?.etternavn ?? null,
        aktoerId: oppgave.papirSmRegistering?.behandler?.aktoerId ?? null,
        sykmelderGate: oppgave.papirSmRegistering?.behandler?.adresse?.gate ?? null,
        sykmelderKommune: oppgave.papirSmRegistering?.behandler?.adresse?.kommune ?? null,
        sykmelderPostboks: oppgave.papirSmRegistering?.behandler?.adresse?.postboks ?? null,
        sykmelderPostnummer: oppgave.papirSmRegistering?.behandler?.adresse?.postnummer ?? null,
        sykmelderLand: oppgave.papirSmRegistering?.behandler?.adresse?.land ?? null,
        sykmelderTelefon: oppgave.papirSmRegistering?.behandler?.tlf ?? null,
        hpr: oppgave.papirSmRegistering?.behandler?.hpr ?? null,
    };
};
