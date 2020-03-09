import React from 'react';
import { Checkbox, Textarea } from 'nav-frontend-skjema';
import { Element } from 'nav-frontend-typografi';

import SectionContainer from '../SectionContainer';
import Subsection from '../formComponents/Subsection';
import { Section } from '../../../../App';

export enum TilretteleggingArbeidsplassField {
    TILRETTELEGGING = 'tilrettelegging',
    BESKRIV = 'beskriv',
}

type TilretteleggingArbeidsplass = {
    [TilretteleggingArbeidsplassField.TILRETTELEGGING]?: boolean;
    [TilretteleggingArbeidsplassField.BESKRIV]?: string;
};

export enum TiltakNavField {
    TILTAK_NAV = 'tiltakNav',
    BESKRIV = 'beskriv',
}

type TiltakNav = {
    [TiltakNavField.TILTAK_NAV]?: boolean;
    [TiltakNavField.BESKRIV]?: string;
};

export enum InnspillNavField {
    INNSPILL = 'innspill',
    BESKRIV = 'beskriv',
}

type InnspillNav = {
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

type ArbeidsevneSectionProps = {
    section: Section;
    expanded: boolean;
    setArbeidsevne: (value: React.SetStateAction<Arbeidsevne>) => void;
    expandSection: () => void;
    arbeidsevne: Arbeidsevne;
};

const ArbeidsevneSection = ({
    section,
    expanded,
    expandSection,
    setArbeidsevne,
    arbeidsevne,
}: ArbeidsevneSectionProps) => {
    return (
        <SectionContainer section={section} expanded={expanded} setExpanded={expandSection}>
            <Subsection sectionIdentifier="7.1">
                <Checkbox
                    checked={
                        arbeidsevne[ArbeidsevneField.TILRETTELEGGING_ARBEIDSPLASS][
                            TilretteleggingArbeidsplassField.TILRETTELEGGING
                        ]
                    }
                    label="Tilrettelegging/hensyn som bør tas på arbeidsplassen"
                    onChange={() =>
                        setArbeidsevne(state => ({
                            ...state,
                            [ArbeidsevneField.TILRETTELEGGING_ARBEIDSPLASS]: {
                                ...state[ArbeidsevneField.TILRETTELEGGING_ARBEIDSPLASS],
                                [TilretteleggingArbeidsplassField.TILRETTELEGGING]: !state[
                                    ArbeidsevneField.TILRETTELEGGING_ARBEIDSPLASS
                                ][TilretteleggingArbeidsplassField.TILRETTELEGGING],
                            },
                        }))
                    }
                />
                <br />
                {arbeidsevne[ArbeidsevneField.TILRETTELEGGING_ARBEIDSPLASS][
                    TilretteleggingArbeidsplassField.TILRETTELEGGING
                ] && (
                    <Textarea
                        maxLength={0}
                        value={
                            arbeidsevne[ArbeidsevneField.TILRETTELEGGING_ARBEIDSPLASS][
                                TilretteleggingArbeidsplassField.BESKRIV
                            ] || ''
                        }
                        onChange={({ target: { value } }) =>
                            setArbeidsevne(state => ({
                                ...state,
                                [ArbeidsevneField.TILRETTELEGGING_ARBEIDSPLASS]: {
                                    ...state[ArbeidsevneField.TILRETTELEGGING_ARBEIDSPLASS],
                                    [TilretteleggingArbeidsplassField.BESKRIV]: value,
                                },
                            }))
                        }
                        label={<Element>Beskriv</Element>}
                    />
                )}
            </Subsection>

            <Subsection sectionIdentifier="7.2">
                <Checkbox
                    checked={arbeidsevne[ArbeidsevneField.TILTAK_NAV][TiltakNavField.TILTAK_NAV]}
                    label="Tiltak i regi av NAV"
                    onChange={() =>
                        setArbeidsevne(state => ({
                            ...state,
                            [ArbeidsevneField.TILTAK_NAV]: {
                                ...state[ArbeidsevneField.TILTAK_NAV],
                                [TiltakNavField.TILTAK_NAV]: !state[ArbeidsevneField.TILTAK_NAV][
                                    TiltakNavField.TILTAK_NAV
                                ],
                            },
                        }))
                    }
                />
                <br />
                {arbeidsevne[ArbeidsevneField.TILTAK_NAV][TiltakNavField.TILTAK_NAV] && (
                    <Textarea
                        maxLength={0}
                        value={arbeidsevne[ArbeidsevneField.TILTAK_NAV][TiltakNavField.BESKRIV] || ''}
                        onChange={({ target: { value } }) =>
                            setArbeidsevne(state => ({
                                ...state,
                                [ArbeidsevneField.TILTAK_NAV]: {
                                    ...state[ArbeidsevneField.TILTAK_NAV],
                                    [TiltakNavField.BESKRIV]: value,
                                },
                            }))
                        }
                        label={<Element>Beskriv. (Hvis det er behov for bistand fra NAV nå, bruk felt 8.)</Element>}
                    />
                )}
            </Subsection>

            <Subsection sectionIdentifier="7.3" underline={false}>
                <Checkbox
                    checked={arbeidsevne[ArbeidsevneField.INNSPILL_NAV][InnspillNavField.INNSPILL]}
                    label="Eventuelle andre innspill til NAV"
                    onChange={() =>
                        setArbeidsevne(state => ({
                            ...state,
                            [ArbeidsevneField.INNSPILL_NAV]: {
                                ...state[ArbeidsevneField.INNSPILL_NAV],
                                [InnspillNavField.INNSPILL]: !state[ArbeidsevneField.INNSPILL_NAV][
                                    InnspillNavField.INNSPILL
                                ],
                            },
                        }))
                    }
                />
                <br />
                {arbeidsevne[ArbeidsevneField.INNSPILL_NAV][InnspillNavField.INNSPILL] && (
                    <Textarea
                        maxLength={0}
                        value={arbeidsevne[ArbeidsevneField.INNSPILL_NAV][InnspillNavField.BESKRIV] || ''}
                        onChange={({ target: { value } }) =>
                            setArbeidsevne(state => ({
                                ...state,
                                [ArbeidsevneField.INNSPILL_NAV]: {
                                    ...state[ArbeidsevneField.INNSPILL_NAV],
                                    [InnspillNavField.BESKRIV]: value,
                                },
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
