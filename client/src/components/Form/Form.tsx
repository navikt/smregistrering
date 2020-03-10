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
    ArbeidsevneField,
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
    MedisinskVurdering,
    MedisinskVurderingField,
} from './components/formSections/DiagnoseSection';
import FriskmeldingSection, { Friskmelding, FriskmeldingField } from './components/formSections/FriskmeldingSection';
import MeldingTilArbeidsgiverSection, {
    MeldingTilArbeidsgiver,
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
    MulighetForArbeid,
    MulighetForArbeidField,
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
import { SectionTitle, Sections } from '../../App';

export enum SchemaField {
    SYKETILFELLESTARTDATO = 'syketilfelleStartDato',
    LEGE_NAVN = 'legenavn',
}

export type FieldValues = {
    [SchemaField.SYKETILFELLESTARTDATO]?: Date;
    [SchemaField.LEGE_NAVN]?: string;
};

const initialSchema: Partial<Metadata &
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
    FieldValues> = {
    [MetadataField.PERSONNUMMER]: undefined,
    [MetadataField.TELEFON]: undefined,
    [MetadataField.ETTERNAVN]: undefined,
    [MetadataField.FORNAVN]: undefined,
    [SchemaField.SYKETILFELLESTARTDATO]: undefined,
    [SchemaField.LEGE_NAVN]: undefined,
    [ArbeidsgiverField.HAR_ARBEIDSGIVER]: undefined,
    [ArbeidsgiverField.NAVN]: undefined,
    [ArbeidsgiverField.YRKESBETEGNELSE]: undefined,
    [ArbeidsgiverField.STILLINGSPROSENT]: undefined,
    [MedisinskVurderingField.HOVEDDIAGNOSE]: {
        system: undefined,
        kode: undefined,
        tekst: undefined,
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

type FormProps = {
    sections: Sections;
};

export type ExpandableSections =
    | SectionTitle.MULIGHET_FOR_ARBEID
    | SectionTitle.ARBEIDSEVNE
    | SectionTitle.TIL_NAV
    | SectionTitle.TIL_ARBEIDSGIVER;

const Form = ({ sections }: FormProps) => {
    const [schema, setSchema] = useState(initialSchema);

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

    console.groupCollapsed('STATE');
    console.log('schema', schema);
    console.groupEnd();

    return (
        <Panel>
            <FormHeader />

            <div className="form-margin-bottom section-content">
                <FnrInput
                    className="form-margin-bottom half"
                    onChange={({ target: { value } }) =>
                        setSchema(state => ({
                            ...state,
                            [MetadataField.PERSONNUMMER]: value,
                        }))
                    }
                    onValidate={valid => console.log(valid)}
                    label={<EtikettLiten>Fødselsnummer (11 siffer)</EtikettLiten>}
                />

                <DatePicker
                    label="Startdato for legemeldt fravær"
                    value={schema[SchemaField.SYKETILFELLESTARTDATO]}
                    onChange={newDates =>
                        setSchema(state => ({ ...state, [SchemaField.SYKETILFELLESTARTDATO]: newDates }))
                    }
                />
            </div>
            <PasientopplysningerSection section={sections[SectionTitle.PASIENTOPPLYSNINGER]} setSchema={setSchema} />
            <ArbeidsgiverSection section={sections[SectionTitle.ARBEIDSGIVER]} setSchema={setSchema} />
            <DiagnoseSection section={sections[SectionTitle.DIAGNOSE]} setSchema={setSchema} schema={schema} />
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
