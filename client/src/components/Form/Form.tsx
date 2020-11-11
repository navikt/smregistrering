import './Form.less';
import './components/formComponents/Flatpickr.less';

import React, { RefObject, useRef } from 'react';

import FormErrorSummary from './components/FormErrorSummary';
import FormHeader from './components/FormHeader';
import FormSubmit from './components/FormSubmit';
import Panel from '../Panel/Panel';
import ArbeidsevneSection, { Arbeidsevne } from './components/formSections/ArbeidsevneSection';
import ArbeidsgiverSection, { Arbeidsgiver } from './components/formSections/ArbeidsgiverSection';
import BehandlerSection, { Behandler } from './components/formSections/BehandlerSection';
import DiagnoseSection, { MedisinskVurdering } from './components/formSections/DiagnoseSection/DiagnoseSection';
import FriskmeldingSection, { Friskmelding } from './components/formSections/FriskmeldingSection';
import MeldingTilArbeidsgiverSection, {
    MeldingTilArbeidsgiver,
} from './components/formSections/MeldingTilArbeidsgiverSection';
import MeldingTilNavSection, { MeldingTilNav } from './components/formSections/MeldingTilNavSection';
import MulighetForArbeidSection, {
    MulighetForArbeid,
} from './components/formSections/MulighetForArbeidSection/MulighetForArbeidSection';
import OtherSection, { Other } from './components/formSections/OtherSection';
import PasientopplysningerSection, { Pasientopplysninger } from './components/formSections/PasientopplysningerSection';
import TilbakedateringSection, { Tilbakedatering } from './components/formSections/TilbakedateringSection';
import UtdypendeOpplysningerSection, {
    UtdypendeOpplysninger,
} from './components/formSections/UtdypendeOpplysningerSection';
import { Diagnosekoder } from '../../types/Diagnosekode';
import { Oppgave } from '../../types/Oppgave';
import { validationFunctions } from './validation';
import {
    getAktivitetIkkeMuligSykmelding,
    getAvventendePeriode,
    getBehandlingsdagerSykmelding,
    getGradertSykmelding,
    getReisetilskuddSykmelding,
} from '../../utils/periodeUtils';
import { getPrefilledBidiagnoser, getPrefilledDiagnose } from '../../utils/diagnoseUtils';
import { sections } from '../../types/Section';
import useForm from './formUtils/useForm';

export interface SchemaType
    extends Pasientopplysninger,
    Arbeidsgiver,
    Arbeidsevne,
    MedisinskVurdering,
    MulighetForArbeid,
    Friskmelding,
    UtdypendeOpplysninger,
    MeldingTilNav,
    MeldingTilArbeidsgiver,
    Tilbakedatering,
    Behandler,
    Other { }

export type ErrorSchemaType = { [key in keyof SchemaType]?: string | undefined };

const getInitialSchema = (oppgave: Oppgave, diagnosekoder: Diagnosekoder): SchemaType => {
    const avventendePeriode = getAvventendePeriode(oppgave.papirSmRegistering?.perioder);
    const aktivitetIkkeMuligPeriode = getAktivitetIkkeMuligSykmelding(oppgave.papirSmRegistering?.perioder);
    const behandlingsdagerPeriode = getBehandlingsdagerSykmelding(oppgave.papirSmRegistering?.perioder);
    const gradertPeriode = getGradertSykmelding(oppgave.papirSmRegistering?.perioder);
    const reisetilskuddperiode = getReisetilskuddSykmelding(oppgave.papirSmRegistering?.perioder);

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
        avventendeSykmelding: !!avventendePeriode,
        avventendePeriode: !!avventendePeriode ? [avventendePeriode.fom, avventendePeriode.tom] : undefined,
        avventendeInnspillTilArbeidsgiver: !!avventendePeriode?.avventendeInnspillTilArbeidsgiver
            ? avventendePeriode.avventendeInnspillTilArbeidsgiver
            : undefined,
        gradertSykmelding: !!gradertPeriode,
        gradertPeriode: !!gradertPeriode ? [gradertPeriode.fom, gradertPeriode.tom] : undefined,
        gradertReisetilskudd: !!gradertPeriode?.gradert?.reisetilskudd,
        gradertGrad: gradertPeriode?.gradert?.grad ? gradertPeriode?.gradert?.grad : undefined,
        aktivitetIkkeMuligSykmelding: !!aktivitetIkkeMuligPeriode,
        aktivitetIkkeMuligPeriode: !!aktivitetIkkeMuligPeriode
            ? [aktivitetIkkeMuligPeriode.fom, aktivitetIkkeMuligPeriode.tom]
            : undefined,
        aktivitetIkkeMuligMedisinskArsak: !!aktivitetIkkeMuligPeriode?.aktivitetIkkeMulig?.medisinskArsak,
        aktivitetIkkeMuligMedisinskArsakType: aktivitetIkkeMuligPeriode?.aktivitetIkkeMulig?.medisinskArsak?.arsak,
        aktivitetIkkeMuligMedisinskArsakBeskrivelse:
            aktivitetIkkeMuligPeriode?.aktivitetIkkeMulig?.medisinskArsak?.beskrivelse,
        aktivitetIkkeMuligArbeidsrelatertArsak: !!aktivitetIkkeMuligPeriode?.aktivitetIkkeMulig?.arbeidsrelatertArsak,
        aktivitetIkkeMuligArbeidsrelatertArsakType:
            aktivitetIkkeMuligPeriode?.aktivitetIkkeMulig?.arbeidsrelatertArsak?.arsak,
        aktivitetIkkeMuligArbeidsrelatertArsakBeskrivelse:
            aktivitetIkkeMuligPeriode?.aktivitetIkkeMulig?.arbeidsrelatertArsak?.beskrivelse,
        behandlingsdagerSykmelding: !!behandlingsdagerPeriode,
        behandlingsdagerPeriode: !!behandlingsdagerPeriode
            ? [behandlingsdagerPeriode.fom, behandlingsdagerPeriode.tom]
            : undefined,
        behandlingsdagerAntall: behandlingsdagerPeriode?.behandlingsdager
            ? behandlingsdagerPeriode?.behandlingsdager
            : undefined,
        reisetilskuddSykmelding: !!reisetilskuddperiode,
        reisetilskuddPeriode: !!reisetilskuddperiode ? [reisetilskuddperiode.fom, reisetilskuddperiode.tom] : undefined,

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

type FormProps = {
    schemaRef: RefObject<HTMLDivElement>;
    oppgave: Oppgave;
    diagnosekoder: Diagnosekoder;
    enhet: string | null | undefined;
};

const Form = ({ schemaRef, oppgave, diagnosekoder, enhet }: FormProps) => {
    const { formState, setFormState, errors, handleSubmit } = useForm<SchemaType>({ defaultValues: getInitialSchema(oppgave, diagnosekoder), validationFunctions: validationFunctions })
    const errorSummaryRef = useRef<HTMLDivElement>(null);

    return (
        <section className="form">
            <form autoComplete="off">
                <Panel ariaLabel="skjemapanel">
                    <FormHeader />
                    <OtherSection setFormState={setFormState} errors={errors} schema={formState} />
                    <PasientopplysningerSection
                        section={sections.PASIENTOPPLYSNINGER}
                        setFormState={setFormState}
                        errors={errors}
                        schema={formState}
                    />

                    <ArbeidsgiverSection
                        section={sections.ARBEIDSGIVER}
                        errors={errors}
                        schema={formState}
                        setFormState={setFormState}
                    />

                    <DiagnoseSection
                        section={sections.DIAGNOSE}
                        setFormState={setFormState}
                        errors={errors}
                        schema={formState}
                        diagnosekoder={diagnosekoder}
                    />
                    <MulighetForArbeidSection
                        section={sections.MULIGHET_FOR_ARBEID}
                        setFormState={setFormState}
                        schema={formState}
                        errors={errors}
                    />
                    <FriskmeldingSection
                        section={sections.FRISKMELDING_PROGNOSE}
                        setFormState={setFormState}
                        schema={formState}
                        errors={errors}
                    />
                    <UtdypendeOpplysningerSection
                        section={sections.UTDYPENDE_OPPLYSNINGER}
                        setFormState={setFormState}
                        schema={formState}
                        errors={errors}
                    />
                    <ArbeidsevneSection
                        section={sections.ARBEIDSEVNE}
                        setFormState={setFormState}
                        schema={formState}
                        errors={errors}
                    />
                    <MeldingTilNavSection
                        section={sections.MELDING_TIL_NAV}
                        setFormState={setFormState}
                        schema={formState}
                        errors={errors}
                    />
                    <MeldingTilArbeidsgiverSection
                        section={sections.MELDING_TIL_ARBEIDSGIVER}
                        setFormState={setFormState}
                        schema={formState}
                        errors={errors}
                    />
                    <TilbakedateringSection
                        section={sections.TILBAKEDATERING}
                        setFormState={setFormState}
                        schema={formState}
                        errors={errors}
                    />
                    <BehandlerSection
                        section={sections.BEHANDLER}
                        setFormState={setFormState}
                        schema={formState}
                        errors={errors}
                    />
                </Panel>
                {<FormErrorSummary formErrors={errors} errorSummaryRef={errorSummaryRef} />}
                <FormSubmit
                    oppgave={oppgave}
                    schema={formState}
                    errors={errors}
                    errorSummaryRef={errorSummaryRef}
                    enhet={enhet}
                    handleSubmit={handleSubmit}
                />
            </form>
        </section>
    );
};

export default Form;
