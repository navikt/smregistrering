import './Form.less';
import './components/formComponents/Flatpickr.less';

import React, { useRef } from 'react';

import FormErrorSummary from './components/FormErrorSummary';
import FormHeader from './components/FormHeader';
import FormReject from './components/FormReject';
import FormSubmit from './components/FormSubmit';
import Panel from '../Panel/Panel';
import useForm from './formUtils/useForm';
import ArbeidsgiverSection, { Arbeidsgiver } from './components/formSections/ArbeidsgiverSection';
import BehandlerSection, { Behandler } from './components/formSections/BehandlerSection';
import DiagnoseSection, { MedisinskVurdering } from './components/formSections/DiagnoseSection/DiagnoseSection';
import MeldingTilArbeidsgiverSection, {
    MeldingTilArbeidsgiver,
} from './components/formSections/MeldingTilArbeidsgiverSection';
import MeldingTilNavSection, { MeldingTilNav } from './components/formSections/MeldingTilNavSection';
import MulighetForArbeidSection, {
    MulighetForArbeid,
} from './components/formSections/MulighetForArbeidSection/MulighetForArbeidSection';
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

export interface FormType
    extends Pasientopplysninger,
        Arbeidsgiver,
        MedisinskVurdering,
        MulighetForArbeid,
        UtdypendeOpplysninger,
        MeldingTilNav,
        MeldingTilArbeidsgiver,
        Tilbakedatering,
        Behandler {
    syketilfelleStartDato?: Date | null;
}

type FormProps = {
    oppgave: Oppgave;
    diagnosekoder: Diagnosekoder;
    enhet: string | null | undefined;
};

const Form = ({ oppgave, diagnosekoder, enhet }: FormProps) => {
    const errorSummaryRef = useRef<HTMLDivElement>(null);

    const { formState, setFormState, errors, handleSubmit } = useForm<FormType>({
        defaultValues: getInitialFormState(oppgave, diagnosekoder),
        validationFunctions,
        errorSummaryRef,
    });

    return (
        <section className="form">
            <form autoComplete="off">
                <Panel ariaLabel="skjemapanel">
                    <FormHeader />
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
                    <UtdypendeOpplysningerSection
                        section={sections.UTDYPENDE_OPPLYSNINGER}
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
                <FormSubmit oppgaveid={oppgave.oppgaveid} enhet={enhet} handleSubmit={handleSubmit} />
            </form>
            <FormReject enhet={enhet} oppgaveid={oppgave.oppgaveid} />
        </section>
    );
};

export default Form;
