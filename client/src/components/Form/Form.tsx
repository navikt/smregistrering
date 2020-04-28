import './Form.less';
import './components/formComponents/Flatpickr.less';

import React, { useState } from 'react';
import { EtikettLiten } from 'nav-frontend-typografi';
import { FnrInput } from 'nav-frontend-skjema';

import DatePicker from './components/formComponents/DatePicker';
import FormHeader from './components/FormHeader';
import Panel from '../Panel/Panel';
import ArbeidsevneSection, { Arbeidsevne } from './components/formSections/ArbeidsevneSection';
import ArbeidsgiverSection, { Arbeidsgiver } from './components/formSections/ArbeidsgiverSection';
import BekreftelseSection, { Bekreftelse } from './components/formSections/BekreftelseSection';
import DiagnoseSection, { MedisinskVurdering } from './components/formSections/DiagnoseSection';
import FriskmeldingSection, { Friskmelding } from './components/formSections/FriskmeldingSection';
import MeldingTilArbeidsgiverSection, {
    MeldingTilArbeidsgiver,
} from './components/formSections/MeldingTilArbeidsgiverSection';
import MeldingTilNavSection, { MeldingTilNav } from './components/formSections/MeldingTilNavSection';
import MulighetForArbeidSection, { MulighetForArbeid } from './components/formSections/MulighetForArbeidSection';
import PasientopplysningerSection, { Pasientopplysninger } from './components/formSections/PasientopplysningerSection';
import TilbakedateringSection, { Tilbakedatering } from './components/formSections/TilbakedateringSection';
import { Diagnosekoder } from '../../types/Diagnosekode';
import { Oppgave } from '../../types/Oppgave';
import { SectionTitle, Sections } from '../../types/Section';
import { Validate, validation } from './validation';

export type Other = {
    fnr?: string;
    syketilfelleStartDato?: Date;
};

export type SchemaType = Partial<
    Pasientopplysninger &
        Arbeidsgiver &
        Arbeidsevne &
        MedisinskVurdering &
        MulighetForArbeid &
        Friskmelding &
        MeldingTilNav &
        MeldingTilArbeidsgiver &
        Tilbakedatering &
        Bekreftelse &
        Other
>;

const getInitialSchema = (oppgave: Oppgave): SchemaType => {
    return {
        fnr: oppgave.fnr,
        biDiagnoser: [],
        annenFraversArsak: false,
        svangerskap: false,
        yrkesskade: false,
        skjermesForPasient: false,
        arbeidsfoerEtterPeriode: false,
        tilretteleggingArbeidsplassen: false,
        tiltakNav: false,
        innspillTilNAv: false,
        meldingTilNavBistand: false,
        meldingTilArbeidsgiverInnspill: false,
        erTilbakedatert: false,
        kunneIkkeIvaretaEgneInteresser: false,
        legitimert: false,
    };
};

export type ErrorSchemaType = { [key in keyof SchemaType]: string | undefined };

type FormProps = {
    sections: Sections;
    oppgave: Oppgave;
    diagnosekoder: Diagnosekoder;
    formErrors: ErrorSchemaType;
    setFormErrors: React.Dispatch<React.SetStateAction<ErrorSchemaType>>;
};

const Form = ({ sections, oppgave, diagnosekoder, formErrors, setFormErrors }: FormProps) => {
    const [schema, setSchema] = useState<SchemaType>(getInitialSchema(oppgave));

    const validate: Validate = (name, value) => {
        const validationFunction = validation[name];
        let error: string | undefined = undefined;
        error = validationFunction(value as any, schema);
        setFormErrors(state => ({ ...state, [name]: error }));
    };

    const validateAll = () => {
        const keys = Object.keys(validation);
        keys.forEach(key => {
            // TODO: Can this casting be avoided?
            // https://github.com/microsoft/TypeScript/pull/12253#issuecomment-263132208
            const value = schema[key as keyof SchemaType];
            validate(key as keyof SchemaType, value);
        });
    };

    console.log(formErrors);

    console.groupCollapsed('STATE');
    console.log('schema', schema);
    console.groupEnd();

    return (
        <Panel>
            <FormHeader />
            <button onClick={validateAll}>validate all</button>
            <div className="form-margin-bottom section-content">
                <FnrInput
                    className="form-margin-bottom half"
                    defaultValue={schema.fnr}
                    onChange={({ target: { value } }) => {
                        setSchema(state => ({
                            ...state,
                            fnr: value,
                        }));
                        validate('fnr', value);
                    }}
                    onValidate={valid => console.log(valid)}
                    label={<EtikettLiten>Fødselsnummer (11 siffer)</EtikettLiten>}
                    feil={formErrors.fnr}
                />
                <DatePicker
                    label="Startdato for legemeldt fravær"
                    value={schema.syketilfelleStartDato}
                    onChange={newDates => setSchema(state => ({ ...state, syketilfelleStartDato: newDates }))}
                />
            </div>
            <PasientopplysningerSection
                section={sections[SectionTitle.PASIENTOPPLYSNINGER]}
                setSchema={setSchema}
                errors={formErrors}
                schema={schema}
                validate={validate}
            />
            <ArbeidsgiverSection
                section={sections[SectionTitle.ARBEIDSGIVER]}
                setSchema={setSchema}
                errors={formErrors}
                schema={schema}
                validate={validate}
            />
            <DiagnoseSection
                section={sections[SectionTitle.DIAGNOSE]}
                setSchema={setSchema}
                errors={formErrors}
                schema={schema}
                validate={validate}
                diagnosekoder={diagnosekoder}
            />
            <MulighetForArbeidSection
                section={sections[SectionTitle.MULIGHET_FOR_ARBEID]}
                setSchema={setSchema}
                schema={schema}
                errors={formErrors}
                validate={validate}
            />
            <FriskmeldingSection
                section={sections[SectionTitle.FRISKMELDING_PROGNOSE]}
                setSchema={setSchema}
                schema={schema}
                errors={formErrors}
                validate={validate}
            />
            <ArbeidsevneSection
                section={sections[SectionTitle.ARBEIDSEVNE]}
                setSchema={setSchema}
                schema={schema}
                errors={formErrors}
                validate={validate}
            />
            <MeldingTilNavSection
                section={sections[SectionTitle.TIL_NAV]}
                setSchema={setSchema}
                schema={schema}
                errors={formErrors}
                validate={validate}
            />
            <MeldingTilArbeidsgiverSection
                section={sections[SectionTitle.TIL_ARBEIDSGIVER]}
                setSchema={setSchema}
                schema={schema}
                errors={formErrors}
                validate={validate}
            />
            <TilbakedateringSection
                section={sections[SectionTitle.TILBAKEDATERING]}
                setSchema={setSchema}
                schema={schema}
                errors={formErrors}
                validate={validate}
            />
            <BekreftelseSection
                section={sections[SectionTitle.BEKREFTELSE]}
                setSchema={setSchema}
                schema={schema}
                errors={formErrors}
                validate={validate}
            />
        </Panel>
    );
};

export default Form;
