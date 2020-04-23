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
    InnspillNavField,
    TilretteleggingArbeidsplass,
    TilretteleggingArbeidsplassField,
    TiltakNav,
    TiltakNavField,
} from './components/formSections/ArbeidsevneSection';
import ArbeidsgiverSection, { Arbeidsgiver, ArbeidsgiverField } from './components/formSections/ArbeidsgiverSection';
import BekreftelseSection, { Bekreftelse, BekreftelseField } from './components/formSections/BekreftelseSection';
import DiagnoseSection, {
    DiagnoseField,
    MedisinskVurdering,
    MedisinskVurderingField,
} from './components/formSections/DiagnoseSection';
import FriskmeldingSection, { Friskmelding, FriskmeldingField } from './components/formSections/FriskmeldingSection';
import MeldingTilArbeidsgiverSection, {
    MeldingTilArbeidsgiverField,
} from './components/formSections/MeldingTilArbeidsgiverSection';
import MeldingTilNavSection, {
    MeldingTilNav,
    MeldingTilNavField,
} from './components/formSections/MeldingTilNavSection';
import MulighetForArbeidSection, {
    AvventendeSykmelding,
    AvventendeSykmeldingField,
    Behandling,
    BehandlingField,
    FullSykmelding,
    FullSykmeldingField,
    GradertSykmelding,
    GradertSykmeldingField,
    Reisetilskudd,
    ReisetilskuddField,
} from './components/formSections/MulighetForArbeidSection';
import PasientopplysningerSection, {
    Metadata,
    MetadataField,
} from './components/formSections/PasientopplysningerSection';
import TilbakedateringSection, {
    Tilbakedatering,
    TilbakedateringField,
} from './components/formSections/TilbakedateringSection';
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
        Tilbakedatering &
        Bekreftelse &
        Other
>;

const getInitialSchema = (oppgave: Oppgave): SchemaType => {
    return {
        [OtherField.SYKETILFELLESTARTDATO]: undefined,
        [OtherField.PERSONNUMMER]: oppgave.fnr,
        [MetadataField.TELEFON]: undefined,
        [MetadataField.ETTERNAVN]: undefined,
        [MetadataField.FORNAVN]: undefined,
        [MetadataField.LEGE_NAVN]: undefined,
        [ArbeidsgiverField.HAR_ARBEIDSGIVER]: undefined,
        [ArbeidsgiverField.NAVN]: undefined,
        [ArbeidsgiverField.YRKESBETEGNELSE]: undefined,
        [ArbeidsgiverField.STILLINGSPROSENT]: undefined,
        [MedisinskVurderingField.HOVEDDIAGNOSE]: {
            [DiagnoseField.SYSTEM]: undefined,
            [DiagnoseField.KODE]: undefined,
            [DiagnoseField.TEKST]: undefined,
        },
        [MedisinskVurderingField.BIDIAGNOSER]: [],
        [MedisinskVurderingField.ANNEN_FRAVAERSARSAK]: false,
        [MedisinskVurderingField.LOVFESTET_FRAVAERSGRUNN]: undefined,
        [MedisinskVurderingField.BESKRIV_FRAVAER]: undefined,
        [MedisinskVurderingField.SVANGERSKAP]: false,
        [MedisinskVurderingField.YRKESSKADE]: false,
        [MedisinskVurderingField.YRKESSKADE_DATO]: undefined,
        [MedisinskVurderingField.SKJERMET_FRA_PASIENT]: false,
        [AvventendeSykmeldingField.AVVENTENDE]: false,
        [AvventendeSykmeldingField.AVVENTENDE_PERIODE]: [],
        [AvventendeSykmeldingField.INNSPILL_TIL_ARBEIDSGIVER]: undefined,
        [GradertSykmeldingField.GRADERT]: false,
        [GradertSykmeldingField.GRADERT_PERIODE]: [],
        [GradertSykmeldingField.GRAD]: undefined,
        [GradertSykmeldingField.REISETILSKUDD]: false,
        [FullSykmeldingField.SYKMELDT]: false,
        [FullSykmeldingField.SYKMELDT_PERIODE]: [],
        [FullSykmeldingField.MEDISINSKE_AARSAKER]: false,
        [FullSykmeldingField.ARBEIDSFORHOLD]: false,
        [BehandlingField.KAN_ARBEIDE]: false,
        [BehandlingField.BEHANDLINGSPERIODE]: [],
        [BehandlingField.ANTALL_DAGER]: undefined,
        [ReisetilskuddField.FULLT_ARBEID]: false,
        [ReisetilskuddField.ARBEIDSPERIODE]: [],
        [FriskmeldingField.ARBEIDSFOER_ETTER_PERIODE]: false,
        [FriskmeldingField.HENSYN_PA_ARBEIDSPLASSEN]: undefined,
        [TilretteleggingArbeidsplassField.TILRETTELEGGING]: false,
        [TilretteleggingArbeidsplassField.BESKRIV]: undefined,
        [TiltakNavField.TILTAK_NAV]: false,
        [TiltakNavField.BESKRIV]: undefined,
        [InnspillNavField.INNSPILL]: false,
        [InnspillNavField.BESKRIV]: undefined,
        [MeldingTilNavField.BISTAND]: false,
        [MeldingTilNavField.BEGRUNN]: undefined,
        [MeldingTilArbeidsgiverField.INNSPILL]: false,
        [MeldingTilArbeidsgiverField.BESKRIV]: undefined,
        [TilbakedateringField.ER_TILBAKEDATERT]: false,
        [TilbakedateringField.DATO_TILBAKEDATERING]: undefined,
        [TilbakedateringField.KAN_IKKE_IVARETA_INTERESSER]: false,
        [TilbakedateringField.BEGRUNN]: undefined,
        [BekreftelseField.LEGITIMERT]: false,
        [BekreftelseField.SYKMELDERS_NAVN]: undefined,
        [BekreftelseField.HPR]: undefined,
        [BekreftelseField.TELEFON]: undefined,
        [BekreftelseField.ADRESSE]: undefined,
    };
};

export type ErrorSchemaType = { [key in keyof SchemaType]: string | undefined };

type FormProps = {
    sections: Sections;
    oppgave: Oppgave;
    diagnosekoder: Diagnosekoder;
};

export type ExpandableSections =
    | SectionTitle.MULIGHET_FOR_ARBEID
    | SectionTitle.ARBEIDSEVNE
    | SectionTitle.TIL_NAV
    | SectionTitle.TIL_ARBEIDSGIVER;

const Form = ({ sections, oppgave, diagnosekoder }: FormProps) => {
    const [schema, setSchema] = useState<SchemaType>(getInitialSchema(oppgave));
    const [errors, setErrors] = useState<ErrorSchemaType>({});
    const [expanded, setExpanded] = useState<{ [key in ExpandableSections]: boolean }>({
        [SectionTitle.MULIGHET_FOR_ARBEID]: true,
        [SectionTitle.ARBEIDSEVNE]: true,
        [SectionTitle.TIL_NAV]: true,
        [SectionTitle.TIL_ARBEIDSGIVER]: true,
    });

    const expandSection = (name: ExpandableSections) => {
        setExpanded(state => ({
            ...state,
            [name]: !state[name],
        }));
    };

    const validate = (name: keyof SchemaType, value: SchemaType[keyof SchemaType]) => {
        const validationFunction = validation[name];

        let error: string | undefined = undefined;

        if (validationFunction) {
            error = validationFunction(value);
        }

        setErrors(state => ({ ...state, [name]: error }));
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
                    onChange={({ target: { value } }) =>
                        setSchema(state => ({
                            ...state,
                            [OtherField.PERSONNUMMER]: value,
                        }))
                    }
                    onValidate={valid => console.log(valid)}
                    label={<EtikettLiten>Fødselsnummer (11 siffer)</EtikettLiten>}
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
                errors={errors}
                schema={schema}
                validate={validate}
            />
            <ArbeidsgiverSection section={sections[SectionTitle.ARBEIDSGIVER]} setSchema={setSchema} />
            <DiagnoseSection
                section={sections[SectionTitle.DIAGNOSE]}
                setSchema={setSchema}
                schema={schema}
                diagnosekoder={diagnosekoder}
            />
            <MulighetForArbeidSection
                section={sections[SectionTitle.MULIGHET_FOR_ARBEID]}
                expanded={expanded[SectionTitle.MULIGHET_FOR_ARBEID]}
                expandSection={() => expandSection(SectionTitle.MULIGHET_FOR_ARBEID)}
                setSchema={setSchema}
                schema={schema}
            />
            <FriskmeldingSection
                section={sections[SectionTitle.FRISKMELDING_PROGNOSE]}
                setSchema={setSchema}
                schema={schema}
            />
            <ArbeidsevneSection
                section={sections[SectionTitle.ARBEIDSEVNE]}
                expanded={expanded[SectionTitle.ARBEIDSEVNE]}
                expandSection={() => expandSection(SectionTitle.ARBEIDSEVNE)}
                setSchema={setSchema}
                schema={schema}
            />
            <MeldingTilNavSection
                section={sections[SectionTitle.TIL_NAV]}
                expanded={expanded[SectionTitle.TIL_NAV]}
                expandSection={() => expandSection(SectionTitle.TIL_NAV)}
                setSchema={setSchema}
                schema={schema}
            />
            <MeldingTilArbeidsgiverSection
                section={sections[SectionTitle.TIL_ARBEIDSGIVER]}
                expanded={expanded[SectionTitle.TIL_ARBEIDSGIVER]}
                expandSection={() => expandSection(SectionTitle.TIL_ARBEIDSGIVER)}
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
