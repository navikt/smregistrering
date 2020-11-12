import './Form.less';
import './components/formComponents/Flatpickr.less';

import React, { useRef } from 'react';

import FormErrorSummary from './components/FormErrorSummary';
import FormHeader from './components/FormHeader';
import FormSubmit from './components/FormSubmit';
import Panel from '../Panel/Panel';
import useForm from './formUtils/useForm';
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
import { getInitialFormState } from './formUtils/formUtils';
import { sections } from '../../types/Section';
import { validationFunctions } from './validation';

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
        Other {}

type FormProps = {
    oppgave: Oppgave;
    diagnosekoder: Diagnosekoder;
    enhet: string | null | undefined;
};

const Form = ({ oppgave, diagnosekoder, enhet }: FormProps) => {
    const { formState, setFormState, errors, handleSubmit } = useForm<SchemaType>({
        defaultValues: getInitialFormState(oppgave, diagnosekoder),
        validationFunctions: validationFunctions,
    });
    const errorSummaryRef = useRef<HTMLDivElement>(null);

    return (
        <section className="form">
            <form autoComplete="off">
                <Panel ariaLabel="skjemapanel">
                    <FormHeader />
                    <OtherSection setFormState={setFormState} errors={errors} formState={formState} />
                    <PasientopplysningerSection
                        section={sections.PASIENTOPPLYSNINGER}
                        setFormState={setFormState}
                        errors={errors}
                        formState={formState}
                    />
                    <ArbeidsgiverSection
                        section={sections.ARBEIDSGIVER}
                        errors={errors}
                        formState={formState}
                        setFormState={setFormState}
                    />
                    <DiagnoseSection
                        section={sections.DIAGNOSE}
                        setFormState={setFormState}
                        errors={errors}
                        formState={formState}
                        diagnosekoder={diagnosekoder}
                    />
                    <MulighetForArbeidSection
                        section={sections.MULIGHET_FOR_ARBEID}
                        setFormState={setFormState}
                        formState={formState}
                        errors={errors}
                    />
                    <FriskmeldingSection
                        section={sections.FRISKMELDING_PROGNOSE}
                        setFormState={setFormState}
                        formState={formState}
                        errors={errors}
                    />
                    <UtdypendeOpplysningerSection
                        section={sections.UTDYPENDE_OPPLYSNINGER}
                        setFormState={setFormState}
                        formState={formState}
                        errors={errors}
                    />
                    <ArbeidsevneSection
                        section={sections.ARBEIDSEVNE}
                        setFormState={setFormState}
                        formState={formState}
                        errors={errors}
                    />
                    <MeldingTilNavSection
                        section={sections.MELDING_TIL_NAV}
                        setFormState={setFormState}
                        formState={formState}
                        errors={errors}
                    />
                    <MeldingTilArbeidsgiverSection
                        section={sections.MELDING_TIL_ARBEIDSGIVER}
                        setFormState={setFormState}
                        formState={formState}
                        errors={errors}
                    />
                    <TilbakedateringSection
                        section={sections.TILBAKEDATERING}
                        setFormState={setFormState}
                        formState={formState}
                        errors={errors}
                    />
                    <BehandlerSection
                        section={sections.BEHANDLER}
                        setFormState={setFormState}
                        formState={formState}
                        errors={errors}
                    />
                </Panel>
                <FormErrorSummary formErrors={errors} errorSummaryRef={errorSummaryRef} />
                <FormSubmit
                    oppgaveid={oppgave.oppgaveid}
                    errorSummaryRef={errorSummaryRef}
                    enhet={enhet}
                    handleSubmit={handleSubmit}
                />
            </form>
        </section>
    );
};

export default Form;
