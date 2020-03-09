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
    InnspillNavField,
    TilretteleggingArbeidsplassField,
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
    AvventendeSykmeldingField,
    BehandlingField,
    FullSykmeldingField,
    GradertSykmeldingField,
    MulighetForArbeid,
    MulighetForArbeidField,
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
    METADATA = 'metadata',
    SYKETILFELLESTARTDATO = 'syketilfelleStartDato',
    LEGE_NAVN = 'legenavn',
    ARBEIDSGIVER = 'arbeidsgiver',
    MEDISINSKVURDERING = 'medisinskVurdering',
    MULIGHET_FOR_ARBEID = 'mulighetForArbeid',
    FRISKMELDING = 'friskmelding',
    ARBEIDSEVNE = 'arbeidsevne',
    MELDING_TIL_NAV = 'meldingTilNav',
    MELDING_TIL_ARBEIDSGIVER = 'meldingTilArbeidsgiver',
    TILBAKEDATERING = 'tilbakedatering',
    BEKREFTELSE = 'bekreftelse',
}

// Her er det tatt et bevisst valg for å gå bort fra den faktiske sykmeldingmodellen for å forenkle utvikling av forms
// Tanken er å type form på enklest mulig måte, og så skrive en mapping-funksjon som bygger opp den faktiske sykmeldingsmodellen i ettertid
export type FieldValues = {
    [SchemaField.METADATA]: Metadata;
    [SchemaField.SYKETILFELLESTARTDATO]?: Date;
    [SchemaField.LEGE_NAVN]?: string;
    [SchemaField.ARBEIDSGIVER]: Arbeidsgiver;
    [SchemaField.MEDISINSKVURDERING]: MedisinskVurdering;
    [SchemaField.MULIGHET_FOR_ARBEID]: MulighetForArbeid;
    [SchemaField.FRISKMELDING]: Friskmelding;
    [SchemaField.ARBEIDSEVNE]: Arbeidsevne;
    [SchemaField.MELDING_TIL_NAV]: MeldingTilNav;
    [SchemaField.MELDING_TIL_ARBEIDSGIVER]: MeldingTilArbeidsgiver;
    [SchemaField.TILBAKEDATERING]: Tilbakedatering;
    [SchemaField.BEKREFTELSE]: Bekreftelse;
};

const initialSchema: FieldValues = {
    [SchemaField.METADATA]: {
        [MetadataField.PERSONNUMMER]: undefined,
        [MetadataField.TELEFON]: undefined,
        [MetadataField.ETTERNAVN]: undefined,
        [MetadataField.FORNAVN]: undefined,
    },
    [SchemaField.SYKETILFELLESTARTDATO]: undefined,
    [SchemaField.LEGE_NAVN]: undefined,
    [SchemaField.ARBEIDSGIVER]: {
        [ArbeidsgiverField.HAR_ARBEIDSGIVER]: undefined,
        [ArbeidsgiverField.NAVN]: undefined,
        [ArbeidsgiverField.YRKESBETEGNELSE]: undefined,
        [ArbeidsgiverField.STILLINGSPROSENT]: undefined,
    },
    [SchemaField.MEDISINSKVURDERING]: {
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
    },
    [SchemaField.MULIGHET_FOR_ARBEID]: {
        [MulighetForArbeidField.AVVENTENDE_SYKMELDING]: {
            [AvventendeSykmeldingField.AVVENTENDE]: false,
            [AvventendeSykmeldingField.AVVENTENDE_PERIODE]: [],
            [AvventendeSykmeldingField.INNSPILL_TIL_ARBEIDSGIVER]: undefined,
        },
        [MulighetForArbeidField.GRADERT_SYKMELDING]: {
            [GradertSykmeldingField.GRADERT]: false,
            [GradertSykmeldingField.GRADERT_PERIODE]: [],
            [GradertSykmeldingField.GRAD]: undefined,
            [GradertSykmeldingField.REISETILSKUDD]: false,
        },
        [MulighetForArbeidField.FULL_SYKMELDING]: {
            [FullSykmeldingField.SYKMELDT]: false,
            [FullSykmeldingField.SYKMELDT_PERIODE]: [],
            [FullSykmeldingField.MEDISINSKE_AARSAKER]: false,
            [FullSykmeldingField.ARBEIDSFORHOLD]: false,
        },
        [MulighetForArbeidField.BEHANDLING]: {
            [BehandlingField.KAN_ARBEIDE]: false,
            [BehandlingField.BEHANDLINGSPERIODE]: [],
            [BehandlingField.ANTALL_DAGER]: undefined,
        },
        [MulighetForArbeidField.REISETILSKUDD]: {
            [ReisetilskuddField.FULLT_ARBEID]: false,
            [ReisetilskuddField.ARBEIDSPERIODE]: [],
        },
    },
    [SchemaField.FRISKMELDING]: {
        [FriskmeldingField.ARBEIDSFOER_ETTER_PERIODE]: false,
        [FriskmeldingField.HENSYN_PA_ARBEIDSPLASSEN]: undefined,
    },
    [SchemaField.ARBEIDSEVNE]: {
        [ArbeidsevneField.TILRETTELEGGING_ARBEIDSPLASS]: {
            [TilretteleggingArbeidsplassField.TILRETTELEGGING]: false,
            [TilretteleggingArbeidsplassField.BESKRIV]: undefined,
        },
        [ArbeidsevneField.TILTAK_NAV]: {
            [TiltakNavField.TILTAK_NAV]: false,
            [TiltakNavField.BESKRIV]: undefined,
        },
        [ArbeidsevneField.INNSPILL_NAV]: {
            [InnspillNavField.INNSPILL]: false,
            [InnspillNavField.BESKRIV]: undefined,
        },
    },
    [SchemaField.MELDING_TIL_NAV]: {
        [MeldingTilNavField.BISTAND]: false,
        [MeldingTilNavField.BEGRUNN]: undefined,
    },
    [SchemaField.MELDING_TIL_ARBEIDSGIVER]: {
        [MeldingTilArbeidsgiverField.INNSPILL]: false,
        [MeldingTilArbeidsgiverField.BESKRIV]: undefined,
    },
    [SchemaField.TILBAKEDATERING]: {
        [TilbakedateringField.ER_TILBAKEDATERT]: false,
        [TilbakedateringField.DATO_TILBAKEDATERING]: undefined,
        [TilbakedateringField.KAN_IKKE_IVARETA_INTERESSER]: false,
        [TilbakedateringField.BEGRUNN]: undefined,
    },
    [SchemaField.BEKREFTELSE]: {
        [BekreftelseField.LEGITIMERT]: false,
        [BekreftelseField.SYKMELDERS_NAVN]: undefined,
        [BekreftelseField.HPR]: undefined,
        [BekreftelseField.TELEFON]: undefined,
        [BekreftelseField.ADRESSE]: undefined,
    },
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
    const [metadata, setMetadata] = useState(initialSchema[SchemaField.METADATA]);
    const [syketilfelleStartDato, setSyketilfelleStartDato] = useState(
        initialSchema[SchemaField.SYKETILFELLESTARTDATO],
    );
    const [legenavn, setLegenavn] = useState(initialSchema[SchemaField.LEGE_NAVN]);
    const [arbeidsgiver, setArbeidsgiver] = useState(initialSchema[SchemaField.ARBEIDSGIVER]);
    const [medisinskvurdering, setMedisinskvurdering] = useState(initialSchema[SchemaField.MEDISINSKVURDERING]);
    const [mulighetForArbeid, setMulighetForArbeid] = useState(initialSchema[SchemaField.MULIGHET_FOR_ARBEID]);
    const [friskmelding, setFriskmelding] = useState(initialSchema[SchemaField.FRISKMELDING]);
    const [arbeidsevne, setArbeidsevne] = useState(initialSchema[SchemaField.ARBEIDSEVNE]);
    const [meldingTilNav, setMeldingTilNav] = useState(initialSchema[SchemaField.MELDING_TIL_NAV]);
    const [meldingTilArbeidsgiver, setMeldingTilArbeidsgiver] = useState(
        initialSchema[SchemaField.MELDING_TIL_ARBEIDSGIVER],
    );
    const [tilbakedatering, setTilbakedatering] = useState(initialSchema[SchemaField.TILBAKEDATERING]);
    const [bekreftelse, setBekreftelse] = useState(initialSchema[SchemaField.BEKREFTELSE]);

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
    console.log('metadata', metadata);
    console.log('syketilfelleStartDato', syketilfelleStartDato);
    console.log('legenavn', legenavn);
    console.log('arbeidsgiver', arbeidsgiver);
    console.log('medisinskvurdering', medisinskvurdering);
    console.log('mulighetForArbeid', mulighetForArbeid);
    console.log('friskmelding', friskmelding);
    console.log('arbeidsevne', arbeidsevne);
    console.log('meldingTilNav', meldingTilNav);
    console.log('meldingTilArbeidsgiver', meldingTilArbeidsgiver);
    console.log('tilbakedatering', tilbakedatering);
    console.log('bekreftelse', bekreftelse);
    console.groupEnd();

    return (
        <Panel>
            <FormHeader />

            <div className="form-margin-bottom section-content">
                <FnrInput
                    className="form-margin-bottom half"
                    onChange={({ target: { value } }) =>
                        setMetadata(state => ({
                            ...state,
                            [MetadataField.PERSONNUMMER]: value,
                        }))
                    }
                    onValidate={valid => console.log(valid)}
                    label={<EtikettLiten>Fødselsnummer (11 siffer)</EtikettLiten>}
                />

                <DatePicker
                    label="Startdato for legemeldt fravær"
                    value={syketilfelleStartDato}
                    onChange={newDates => setSyketilfelleStartDato(newDates)}
                />
            </div>
            <PasientopplysningerSection
                section={sections[SectionTitle.PASIENTOPPLYSNINGER]}
                setMetadata={setMetadata}
                setLegenavn={setLegenavn}
            />
            <ArbeidsgiverSection section={sections[SectionTitle.ARBEIDSGIVER]} setArbeidsgiver={setArbeidsgiver} />
            <DiagnoseSection
                section={sections[SectionTitle.DIAGNOSE]}
                setMedisinskvurdering={setMedisinskvurdering}
                medisinskvurdering={medisinskvurdering}
            />
            <MulighetForArbeidSection
                section={sections[SectionTitle.MULIGHET_FOR_ARBEID]}
                expanded={expanded[SectionTitle.MULIGHET_FOR_ARBEID]}
                expandSection={() => expandSection(SectionTitle.MULIGHET_FOR_ARBEID)}
                setMulighetForArbeid={setMulighetForArbeid}
                mulighetForArbeid={mulighetForArbeid}
            />
            <FriskmeldingSection
                section={sections[SectionTitle.FRISKMELDING_PROGNOSE]}
                setFriskmelding={setFriskmelding}
                friskmelding={friskmelding}
            />
            <ArbeidsevneSection
                section={sections[SectionTitle.ARBEIDSEVNE]}
                expanded={expanded[SectionTitle.ARBEIDSEVNE]}
                expandSection={() => expandSection(SectionTitle.ARBEIDSEVNE)}
                setArbeidsevne={setArbeidsevne}
                arbeidsevne={arbeidsevne}
            />
            <MeldingTilNavSection
                section={sections[SectionTitle.TIL_NAV]}
                expanded={expanded[SectionTitle.TIL_NAV]}
                expandSection={() => expandSection(SectionTitle.TIL_NAV)}
                setMeldingTilNav={setMeldingTilNav}
                meldingTilNav={meldingTilNav}
            />
            <MeldingTilArbeidsgiverSection
                section={sections[SectionTitle.TIL_ARBEIDSGIVER]}
                expanded={expanded[SectionTitle.TIL_ARBEIDSGIVER]}
                expandSection={() => expandSection(SectionTitle.TIL_ARBEIDSGIVER)}
                setMeldingTilArbeidsgiver={setMeldingTilArbeidsgiver}
                meldingTilArbeidsgiver={meldingTilArbeidsgiver}
            />

            <TilbakedateringSection
                section={sections[SectionTitle.TILBAKEDATERING]}
                setTilbakedatering={setTilbakedatering}
                tilbakedatering={tilbakedatering}
            />

            <BekreftelseSection
                section={sections[SectionTitle.BEKREFTELSE]}
                setBekreftelse={setBekreftelse}
                bekreftelse={bekreftelse}
            />
        </Panel>
    );
};

export default Form;
