import { AktivitetIkkeMuligPeriodeMFA } from '../components/formSections/MulighetForArbeidSection/AktivitetIkkeMuligPeriode';
import { AvventendePeriodeMFA } from '../components/formSections/MulighetForArbeidSection/AvventendePeriode';
import { BehandlingsdagerPeriodeMFA } from '../components/formSections/MulighetForArbeidSection/BehandlingsdagerPeriode';
import { Diagnosekoder } from '../../../types/Diagnosekode';
import { FormType } from '../Form';
import { GradertPeriodeMFA } from '../components/formSections/MulighetForArbeidSection/GradertPeriode';
import { MulighetForArbeidTypes } from '../components/formSections/MulighetForArbeidSection/MulighetForArbeidSection';
import { Oppgave } from '../../../types/Oppgave';
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
                avventendeInnspillTilArbeidsgiver: periode.avventendeInnspillTilArbeidsgiver || undefined,
            }));

            mulighetForArbeid.push(...avventendePeriodeMFA);
        }

        if (gradertPeriode) {
            const gradertPeriodeMFA: GradertPeriodeMFA[] = gradertPeriode.map((periode) => ({
                type: 'gradert',
                gradertPeriode: [periode.fom, periode.tom],
                gradertGrad: periode.gradert?.grad || undefined,
                gradertReisetilskudd: periode.reisetilskudd,
            }));

            mulighetForArbeid.push(...gradertPeriodeMFA);
        }

        if (aktivitetIkkeMuligPeriode) {
            const aktivitetIkkeMuligPeriodeMFA: AktivitetIkkeMuligPeriodeMFA[] = aktivitetIkkeMuligPeriode.map(
                (periode) => ({
                    type: 'fullsykmelding',
                    aktivitetIkkeMuligPeriode: !!periode ? [periode.fom, periode.tom] : undefined,
                    aktivitetIkkeMuligMedisinskArsak: !!periode?.aktivitetIkkeMulig?.medisinskArsak,
                    aktivitetIkkeMuligMedisinskArsakType: periode?.aktivitetIkkeMulig?.medisinskArsak?.arsak,
                    aktivitetIkkeMuligMedisinskArsakBeskrivelse:
                        periode?.aktivitetIkkeMulig?.medisinskArsak?.beskrivelse,
                    aktivitetIkkeMuligArbeidsrelatertArsak: !!periode?.aktivitetIkkeMulig?.arbeidsrelatertArsak,
                    aktivitetIkkeMuligArbeidsrelatertArsakType:
                        periode?.aktivitetIkkeMulig?.arbeidsrelatertArsak?.arsak,
                    aktivitetIkkeMuligArbeidsrelatertArsakBeskrivelse:
                        periode?.aktivitetIkkeMulig?.arbeidsrelatertArsak?.beskrivelse,
                }),
            );

            mulighetForArbeid.push(...aktivitetIkkeMuligPeriodeMFA);
        }

        if (behandlingsdagerPeriode) {
            const behandlingsdagerPeriodeMFA: BehandlingsdagerPeriodeMFA[] = behandlingsdagerPeriode.map((periode) => ({
                type: 'behandlingsdager',
                behandlingsdagerPeriode: [periode.fom, periode.tom],
                behandlingsdagerAntall: periode.behandlingsdager || undefined,
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
        syketilfelleStartDato: oppgave.papirSmRegistering?.syketilfelleStartDato,

        // Pasientopplysninger
        pasientFnr: oppgave.papirSmRegistering?.fnr,

        // Arbeidsgiver
        harArbeidsgiver: oppgave.papirSmRegistering?.arbeidsgiver?.harArbeidsgiver,
        arbeidsgiverNavn: oppgave.papirSmRegistering?.arbeidsgiver?.navn,
        yrkesbetegnelse: oppgave.papirSmRegistering?.arbeidsgiver?.yrkesbetegnelse,
        stillingsprosent: oppgave.papirSmRegistering?.arbeidsgiver?.stillingsprosent,

        // Diagnose
        yrkesskade: !!oppgave.papirSmRegistering?.medisinskVurdering?.yrkesskade,
        yrkesskadeDato: oppgave.papirSmRegistering?.medisinskVurdering?.yrkesskadeDato,
        skjermesForPasient: !!oppgave.papirSmRegistering?.skjermesForPasient,
        svangerskap: !!oppgave.papirSmRegistering?.medisinskVurdering?.svangerskap,
        annenFraversArsak: !!oppgave.papirSmRegistering?.medisinskVurdering?.annenFraversArsak,
        annenFraversArsakGrunn: oppgave.papirSmRegistering?.medisinskVurdering?.annenFraversArsak?.grunn,
        annenFraversArsakBeskrivelse: oppgave.papirSmRegistering?.medisinskVurdering?.annenFraversArsak?.beskrivelse,
        hovedDiagnose: getPrefilledDiagnose(
            diagnosekoder,
            oppgave.papirSmRegistering?.medisinskVurdering?.hovedDiagnose,
        ),
        biDiagnoser: getPrefilledBidiagnoser(
            diagnosekoder,
            oppgave.papirSmRegistering?.medisinskVurdering?.biDiagnoser,
        ),

        // MulighetForArbeid
        mulighetForArbeid: createMulighetForArbeid(),

        // Friskmelding
        arbeidsfoerEtterPeriode: !!oppgave.papirSmRegistering?.prognose?.arbeidsforEtterPeriode,
        hensynArbeidsplassen: oppgave.papirSmRegistering?.prognose?.hensynArbeidsplassen,
        erIArbeid: !!oppgave.papirSmRegistering?.prognose?.erIArbeid,
        egetArbeidPaSikt: !!oppgave.papirSmRegistering?.prognose?.erIArbeid?.egetArbeidPaSikt,
        annetArbeidPaSikt: !!oppgave.papirSmRegistering?.prognose?.erIArbeid?.annetArbeidPaSikt,
        arbeidFOM: oppgave.papirSmRegistering?.prognose?.erIArbeid?.arbeidFOM,
        vurderingsDatoIArbeid: oppgave.papirSmRegistering?.prognose?.erIArbeid?.vurderingsdato,
        erIkkeIArbeid: !!oppgave.papirSmRegistering?.prognose?.erIkkeIArbeid,
        arbeidsforPaSikt: !!oppgave.papirSmRegistering?.prognose?.erIkkeIArbeid?.arbeidsforPaSikt,
        arbeidsforFOM: oppgave.papirSmRegistering?.prognose?.erIkkeIArbeid?.arbeidsforFOM,
        vurderingsDatoUtenArbeid: oppgave.papirSmRegistering?.prognose?.erIkkeIArbeid?.vurderingsdato,

        // Utdypende opplysninger
        utdypende611: oppgave.papirSmRegistering?.utdypendeOpplysninger?.['6.1']?.['6.1.1']?.svar,
        utdypende612: oppgave.papirSmRegistering?.utdypendeOpplysninger?.['6.1']?.['6.1.2']?.svar,
        utdypende613: oppgave.papirSmRegistering?.utdypendeOpplysninger?.['6.1']?.['6.1.3']?.svar,
        utdypende614: oppgave.papirSmRegistering?.utdypendeOpplysninger?.['6.1']?.['6.1.4']?.svar,
        utdypende615: oppgave.papirSmRegistering?.utdypendeOpplysninger?.['6.1']?.['6.1.5']?.svar,
        //
        utdypende621: oppgave.papirSmRegistering?.utdypendeOpplysninger?.['6.2']?.['6.2.1']?.svar,
        utdypende622: oppgave.papirSmRegistering?.utdypendeOpplysninger?.['6.2']?.['6.2.2']?.svar,
        utdypende623: oppgave.papirSmRegistering?.utdypendeOpplysninger?.['6.2']?.['6.2.3']?.svar,
        utdypende624: oppgave.papirSmRegistering?.utdypendeOpplysninger?.['6.2']?.['6.2.4']?.svar,
        //
        utdypende631: oppgave.papirSmRegistering?.utdypendeOpplysninger?.['6.3']?.['6.3.1']?.svar,
        utdypende632: oppgave.papirSmRegistering?.utdypendeOpplysninger?.['6.3']?.['6.3.2']?.svar,
        //
        utdypende641: oppgave.papirSmRegistering?.utdypendeOpplysninger?.['6.4']?.['6.4.1']?.svar,
        utdypende642: oppgave.papirSmRegistering?.utdypendeOpplysninger?.['6.4']?.['6.4.2']?.svar,
        utdypende643: oppgave.papirSmRegistering?.utdypendeOpplysninger?.['6.4']?.['6.4.3']?.svar,
        //
        utdypende651: oppgave.papirSmRegistering?.utdypendeOpplysninger?.['6.5']?.['6.5.1']?.svar,
        utdypende652: oppgave.papirSmRegistering?.utdypendeOpplysninger?.['6.5']?.['6.5.2']?.svar,
        utdypende653: oppgave.papirSmRegistering?.utdypendeOpplysninger?.['6.5']?.['6.5.3']?.svar,
        utdypende654: oppgave.papirSmRegistering?.utdypendeOpplysninger?.['6.5']?.['6.5.4']?.svar,
        //
        utdypende661: oppgave.papirSmRegistering?.utdypendeOpplysninger?.['6.6']?.['6.6.1']?.svar,
        utdypende662: oppgave.papirSmRegistering?.utdypendeOpplysninger?.['6.6']?.['6.6.2']?.svar,
        utdypende663: oppgave.papirSmRegistering?.utdypendeOpplysninger?.['6.6']?.['6.6.3']?.svar,

        // Arbeidsevne
        tiltakNav: oppgave.papirSmRegistering?.tiltakNAV,
        tiltakArbeidsplassen: oppgave.papirSmRegistering?.tiltakArbeidsplassen,
        andreTiltak: oppgave.papirSmRegistering?.andreTiltak,

        // MeldingTilNav
        meldingTilNavBistand: !!oppgave.papirSmRegistering?.meldingTilNAV?.bistandUmiddelbart,
        meldingTilNavBegrunn: oppgave.papirSmRegistering?.meldingTilNAV?.beskrivBistand,

        // MeldingTilArbeidsgiver
        meldingTilArbeidsgiverBeskriv: oppgave.papirSmRegistering?.meldingTilArbeidsgiver,

        // Tilbakedatering
        erTilbakedatert: !!oppgave.papirSmRegistering?.kontaktMedPasient?.kontaktDato,
        kontaktDato: oppgave.papirSmRegistering?.kontaktMedPasient?.kontaktDato,
        kunneIkkeIvaretaEgneInteresser: !!oppgave.papirSmRegistering?.kontaktMedPasient?.begrunnelseIkkeKontakt,
        begrunnelseIkkeKontakt: oppgave.papirSmRegistering?.kontaktMedPasient?.begrunnelseIkkeKontakt,

        // Bekreftelse
        behandletDato: oppgave.papirSmRegistering?.behandletTidspunkt,
        sykmelderFnr: oppgave.papirSmRegistering?.behandler?.fnr,
        sykmeldersFornavn: oppgave.papirSmRegistering?.behandler?.fornavn,
        sykmeldersEtternavn: oppgave.papirSmRegistering?.behandler?.etternavn,
        aktoerId: oppgave.papirSmRegistering?.behandler?.aktoerId,
        sykmelderGate: oppgave.papirSmRegistering?.behandler?.adresse?.gate,
        sykmelderKommune: oppgave.papirSmRegistering?.behandler?.adresse?.kommune,
        sykmelderPostboks: oppgave.papirSmRegistering?.behandler?.adresse?.postboks,
        sykmelderPostnummer: oppgave.papirSmRegistering?.behandler?.adresse?.postnummer,
        sykmelderLand: oppgave.papirSmRegistering?.behandler?.adresse?.land,
        sykmelderTelefon: oppgave.papirSmRegistering?.behandler?.tlf,
        hpr: oppgave.papirSmRegistering?.behandler?.hpr,
    };
};
