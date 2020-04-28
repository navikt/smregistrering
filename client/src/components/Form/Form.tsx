import './Form.less';
import './components/formComponents/Flatpickr.less';

import React, { useState } from 'react';
import { EtikettLiten } from 'nav-frontend-typografi';
import { FnrInput } from 'nav-frontend-skjema';

import DatePicker from './components/formComponents/DatePicker';
import FormHeader from './components/FormHeader';
import Panel from '../Panel/Panel';
import ArbeidsevneSection, {
    Arbeidsevne,
    InnspillNav,
    TilretteleggingArbeidsplass,
    TiltakNav,
} from './components/formSections/ArbeidsevneSection';
import ArbeidsgiverSection, { Arbeidsgiver } from './components/formSections/ArbeidsgiverSection';
import BekreftelseSection, { Bekreftelse } from './components/formSections/BekreftelseSection';
import DiagnoseSection, { MedisinskVurdering } from './components/formSections/DiagnoseSection';
import FriskmeldingSection, { Friskmelding } from './components/formSections/FriskmeldingSection';
import MeldingTilArbeidsgiverSection, {
    MeldingTilArbeidsgiver,
} from './components/formSections/MeldingTilArbeidsgiverSection';
import MeldingTilNavSection, { MeldingTilNav } from './components/formSections/MeldingTilNavSection';
import MulighetForArbeidSection, {
    AvventendeSykmelding,
    Behandling,
    FullSykmelding,
    GradertSykmelding,
    Reisetilskudd,
} from './components/formSections/MulighetForArbeidSection';
import PasientopplysningerSection, { Metadata } from './components/formSections/PasientopplysningerSection';
import TilbakedateringSection, { Tilbakedatering } from './components/formSections/TilbakedateringSection';
import { Diagnosekoder } from '../../types/Diagnosekode';
import { Oppgave } from '../../types/Oppgave';
import { SectionTitle, Sections } from '../../types/Section';
import { validation } from './validation';

export enum OtherField {
    PERSONNUMMER = 'personnummer',
    SYKETILFELLESTARTDATO = 'syketilfelleStartDato',
}

export type Other = {
    [OtherField.PERSONNUMMER]?: string;
    [OtherField.SYKETILFELLESTARTDATO]?: Date;
};

export type SchemaType = Partial<
    Metadata &
        Arbeidsgiver &
        Arbeidsevne &
        MedisinskVurdering &
        AvventendeSykmelding &
        GradertSykmelding &
        FullSykmelding &
        Behandling &
        Reisetilskudd &
        Friskmelding &
        TilretteleggingArbeidsplass &
        TiltakNav &
        InnspillNav &
        MeldingTilNav &
        MeldingTilArbeidsgiver &
        Tilbakedatering &
        Bekreftelse &
        Other
>;

const getInitialSchema = (oppgave: Oppgave): SchemaType => {
    return {
        syketilfelleStartDato: undefined,
        personnummer: oppgave.fnr,
        telefon: undefined,
        etternavn: undefined,
        fornavn: undefined,
        legenavn: undefined,
        harArbeidsgiver: undefined,
        arbeidsgiverNavn: undefined,
        yrkesbetegnelse: undefined,
        stillingsprosent: undefined,
        hoveddiagnose: {
            system: undefined,
            kode: undefined,
            tekst: undefined,
        },
        bidiagnoser: [],
        annenFravaersArsak: false,
        lovfestetFravaersgrunn: undefined,
        beskrivFravaeret: undefined,
        svangerskap: false,
        yrkesskade: false,
        yrkesskadeDato: undefined,
        skjermetFraPasient: false,
        avventende: false,
        avventendePeriode: [],
        innspillTilArbeidsgiver: undefined,
        gradert: false,
        gradertPeriode: [],
        grad: undefined,
        reisetilskudd: false,
        sykmeldt: false,
        sykmeldtPeriode: [],
        medisinskeAarsaker: false,
        arbeidsforhold: false,
        kanArbeide: false,
        behandlingsPeriode: [],
        antallDager: undefined,
        fulltArbeid: false,
        arbeidsPeriode: [],
        arbeidsfoerEtterPeriode: false,
        hensynPaArbeidsplassen: undefined,
        tilretteleggingArbeidsplassen: false,
        tilretteleggArbeidsplassBeskriv: undefined,
        tiltakNav: false,
        tiltakNavBeskriv: undefined,
        innspillTilNAv: false,
        innspillTilNavBeskriv: undefined,
        meldingTilNavBistand: false,
        meldingTilNavBegrunn: undefined,
        meldingTilArbeidsgiverInnspill: false,
        meldingTIlArbeidsgiverBeskriv: undefined,
        erTilbakedatert: false,
        datoTilbakedatering: undefined,
        kanIkkeIvaretaInteresser: false,
        tilbakedateringBegrunn: undefined,
        legitimert: false,
        sykmeldersNavn: undefined,
        hpr: undefined,
        sykmelderTelefon: undefined,
        adresse: undefined,
    };
};

export type ErrorSchemaType = { [key in keyof SchemaType]: string | undefined };
export type Validate = (name: keyof SchemaType, value: SchemaType[keyof SchemaType]) => void;

type FormProps = {
    sections: Sections;
    oppgave: Oppgave;
    diagnosekoder: Diagnosekoder;
    formErrors: ErrorSchemaType;
    setFormErrors: React.Dispatch<React.SetStateAction<ErrorSchemaType>>;
};

export type ExpandableSections =
    | SectionTitle.MULIGHET_FOR_ARBEID
    | SectionTitle.ARBEIDSEVNE
    | SectionTitle.TIL_NAV
    | SectionTitle.TIL_ARBEIDSGIVER;

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
                    defaultValue={schema.personnummer}
                    onChange={({ target: { value } }) => {
                        setSchema(state => ({
                            ...state,
                            [OtherField.PERSONNUMMER]: value,
                        }));
                        validate(OtherField.PERSONNUMMER, value);
                    }}
                    onValidate={valid => console.log(valid)}
                    label={<EtikettLiten>Fødselsnummer (11 siffer)</EtikettLiten>}
                    feil={formErrors[OtherField.PERSONNUMMER]}
                />
                <DatePicker
                    label="Startdato for legemeldt fravær"
                    value={schema[OtherField.SYKETILFELLESTARTDATO]}
                    onChange={newDates =>
                        setSchema(state => ({ ...state, [OtherField.SYKETILFELLESTARTDATO]: newDates }))
                    }
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
                errors={formErrors}
                schema={schema}
                validate={validate}
            />
            <FriskmeldingSection
                section={sections[SectionTitle.FRISKMELDING_PROGNOSE]}
                setSchema={setSchema}
                schema={schema}
            />
            <ArbeidsevneSection section={sections[SectionTitle.ARBEIDSEVNE]} setSchema={setSchema} schema={schema} />
            <MeldingTilNavSection section={sections[SectionTitle.TIL_NAV]} setSchema={setSchema} schema={schema} />
            <MeldingTilArbeidsgiverSection
                section={sections[SectionTitle.TIL_ARBEIDSGIVER]}
                setSchema={setSchema}
                schema={schema}
            />
            <TilbakedateringSection
                section={sections[SectionTitle.TILBAKEDATERING]}
                setSchema={setSchema}
                schema={schema}
            />
            <BekreftelseSection section={sections[SectionTitle.BEKREFTELSE]} setSchema={setSchema} schema={schema} />
        </Panel>
    );
};

export default Form;
