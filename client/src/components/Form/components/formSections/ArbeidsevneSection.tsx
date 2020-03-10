import React from 'react';
import { Checkbox, Textarea } from 'nav-frontend-skjema';
import { Element } from 'nav-frontend-typografi';

import SectionContainer from '../SectionContainer';
import Subsection from '../formComponents/Subsection';
import { Arbeidsgiver } from './ArbeidsgiverSection';
import {
    AvventendeSykmelding,
    Behandling,
    FullSykmelding,
    GradertSykmelding,
    Reisetilskudd,
} from './MulighetForArbeidSection';
import { Bekreftelse } from './BekreftelseSection';
import { FieldValues } from '../../Form';
import { Friskmelding } from './FriskmeldingSection';
import { MedisinskVurdering } from './DiagnoseSection';
import { MeldingTilNav } from './MeldingTilNavSection';
import { Metadata } from './PasientopplysningerSection';
import { Section } from '../../../../App';
import { Tilbakedatering } from './TilbakedateringSection';

export enum TilretteleggingArbeidsplassField {
    TILRETTELEGGING = 'tilrettelegging',
    BESKRIV = 'beskriv',
}

export type TilretteleggingArbeidsplass = {
    [TilretteleggingArbeidsplassField.TILRETTELEGGING]?: boolean;
    [TilretteleggingArbeidsplassField.BESKRIV]?: string;
};

export enum TiltakNavField {
    TILTAK_NAV = 'tiltakNav',
    BESKRIV = 'beskriv',
}

export type TiltakNav = {
    [TiltakNavField.TILTAK_NAV]?: boolean;
    [TiltakNavField.BESKRIV]?: string;
};

export enum InnspillNavField {
    INNSPILL = 'innspill',
    BESKRIV = 'beskriv',
}

export type InnspillNav = {
    [InnspillNavField.INNSPILL]?: boolean;
    [InnspillNavField.BESKRIV]?: string;
};

export enum ArbeidsevneField {
    TILRETTELEGGING_ARBEIDSPLASS = 'tilretteleggingArbeidsplass',
    TILTAK_NAV = 'tiltakNav',
    INNSPILL_NAV = 'innspillNav',
}

export type Arbeidsevne = {
    [ArbeidsevneField.TILRETTELEGGING_ARBEIDSPLASS]: TilretteleggingArbeidsplass;
    [ArbeidsevneField.TILTAK_NAV]: TiltakNav;
    [ArbeidsevneField.INNSPILL_NAV]: InnspillNav;
};

export type ArbeidsevneSectionProps = {
    section: Section;
    expanded: boolean;
    setSchema: (
        value: React.SetStateAction<
            Partial<
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
                    FieldValues
            >
        >,
    ) => void;
    schema: Partial<
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
            FieldValues
    >;
    expandSection: () => void;
};

const ArbeidsevneSection = ({ section, expanded, expandSection, setSchema, schema }: ArbeidsevneSectionProps) => {
    return (
        <SectionContainer section={section} expanded={expanded} setExpanded={expandSection}>
            <Subsection sectionIdentifier="7.1">
                <Checkbox
                    checked={schema[TilretteleggingArbeidsplassField.TILRETTELEGGING]}
                    label="Tilrettelegging/hensyn som bør tas på arbeidsplassen"
                    onChange={() =>
                        setSchema(state => ({
                            ...state,
                            [TilretteleggingArbeidsplassField.TILRETTELEGGING]: !state[
                                TilretteleggingArbeidsplassField.TILRETTELEGGING
                            ],
                        }))
                    }
                />
                <br />
                {schema[TilretteleggingArbeidsplassField.TILRETTELEGGING] && (
                    <Textarea
                        maxLength={0}
                        value={schema[TilretteleggingArbeidsplassField.BESKRIV] || ''}
                        onChange={({ target: { value } }) =>
                            setSchema(state => ({
                                ...state,
                                [TilretteleggingArbeidsplassField.BESKRIV]: value,
                            }))
                        }
                        label={<Element>Beskriv</Element>}
                    />
                )}
            </Subsection>

            <Subsection sectionIdentifier="7.2">
                <Checkbox
                    checked={schema[TiltakNavField.TILTAK_NAV]}
                    label="Tiltak i regi av NAV"
                    onChange={() =>
                        setSchema(state => ({
                            ...state,
                            [TiltakNavField.TILTAK_NAV]: !state[TiltakNavField.TILTAK_NAV],
                        }))
                    }
                />
                <br />
                {schema[TiltakNavField.TILTAK_NAV] && (
                    <Textarea
                        maxLength={0}
                        value={schema[TiltakNavField.BESKRIV] || ''}
                        onChange={({ target: { value } }) =>
                            setSchema(state => ({
                                ...state,
                                [TiltakNavField.BESKRIV]: value,
                            }))
                        }
                        label={<Element>Beskriv. (Hvis det er behov for bistand fra NAV nå, bruk felt 8.)</Element>}
                    />
                )}
            </Subsection>

            <Subsection sectionIdentifier="7.3" underline={false}>
                <Checkbox
                    checked={schema[InnspillNavField.INNSPILL]}
                    label="Eventuelle andre innspill til NAV"
                    onChange={() =>
                        setSchema(state => ({
                            ...state,
                            [InnspillNavField.INNSPILL]: !state[InnspillNavField.INNSPILL],
                        }))
                    }
                />
                <br />
                {schema[InnspillNavField.INNSPILL] && (
                    <Textarea
                        maxLength={0}
                        value={schema[InnspillNavField.BESKRIV] || ''}
                        onChange={({ target: { value } }) =>
                            setSchema(state => ({
                                ...state,
                                [InnspillNavField.BESKRIV]: value,
                            }))
                        }
                        label={<Element>Beskriv</Element>}
                    />
                )}
            </Subsection>
        </SectionContainer>
    );
};

export default ArbeidsevneSection;
