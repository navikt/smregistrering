import React from 'react';
import { Checkbox, Textarea } from 'nav-frontend-skjema';
import { Element } from 'nav-frontend-typografi';

import SectionContainer from '../SectionContainer';
import Subsection from '../formComponents/Subsection';
import { SchemaType } from '../../Form';
import { Section } from '../../../../types/Section';

export enum TilretteleggingArbeidsplassField {
    TILRETTELEGGING = 'tilretteleggingArbeidsplassen',
    BESKRIV = 'tilretteleggArbeidsplassBeskriv',
}

export type TilretteleggingArbeidsplass = {
    [TilretteleggingArbeidsplassField.TILRETTELEGGING]?: boolean;
    [TilretteleggingArbeidsplassField.BESKRIV]?: string;
};

export enum TiltakNavField {
    TILTAK_NAV = 'tiltakNav',
    BESKRIV = 'tiltakNavBeskriv',
}

export type TiltakNav = {
    [TiltakNavField.TILTAK_NAV]?: boolean;
    [TiltakNavField.BESKRIV]?: string;
};

export enum InnspillNavField {
    INNSPILL = 'innspillTilNAv',
    BESKRIV = 'innspillTilNavBeskriv',
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
    setSchema: (value: React.SetStateAction<SchemaType>) => void;
    schema: SchemaType;
};

const ArbeidsevneSection = ({ section, setSchema, schema }: ArbeidsevneSectionProps) => {
    return (
        <SectionContainer section={section}>
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
