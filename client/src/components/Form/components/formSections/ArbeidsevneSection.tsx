import React from 'react';
import { Checkbox, Textarea } from 'nav-frontend-skjema';
import { Element } from 'nav-frontend-typografi';

import SectionContainer from '../SectionContainer';
import Subsection from '../formComponents/Subsection';
import { SchemaType } from '../../Form';
import { Section } from '../../../../types/Section';


export type Arbeidsevne = {
    tilretteleggingArbeidsplassen?: boolean;
    tilretteleggArbeidsplassBeskriv?: string;
    tiltakNav?: boolean;
    tiltakNavBeskriv?: string;
    innspillTilNAv?: boolean;
    innspillTilNavBeskriv?: string;
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
                    checked={schema.tilretteleggingArbeidsplassen}
                    label="Tilrettelegging/hensyn som bør tas på arbeidsplassen"
                    onChange={() =>
                        setSchema(state => ({
                            ...state,
                            tilretteleggingArbeidsplassen: !state.tilretteleggingArbeidsplassen,
                        }))
                    }
                />
                <br />
                {schema.tilretteleggingArbeidsplassen && (
                    <Textarea
                        maxLength={0}
                        value={schema.tilretteleggArbeidsplassBeskriv || ''}
                        onChange={({ target: { value } }) =>
                            setSchema(state => ({
                                ...state,
                                tilretteleggArbeidsplassBeskriv: value,
                            }))
                        }
                        label={<Element>Beskriv</Element>}
                    />
                )}
            </Subsection>

            <Subsection sectionIdentifier="7.2">
                <Checkbox
                    checked={schema.tiltakNav}
                    label="Tiltak i regi av NAV"
                    onChange={() =>
                        setSchema(state => ({
                            ...state,
                            tiltakNav: !state.tiltakNav,
                        }))
                    }
                />
                <br />
                {schema.tiltakNav && (
                    <Textarea
                        maxLength={0}
                        value={schema.tiltakNavBeskriv || ''}
                        onChange={({ target: { value } }) =>
                            setSchema(state => ({
                                ...state,
                                tiltakNavBeskriv: value,
                            }))
                        }
                        label={<Element>Beskriv. (Hvis det er behov for bistand fra NAV nå, bruk felt 8.)</Element>}
                    />
                )}
            </Subsection>

            <Subsection sectionIdentifier="7.3" underline={false}>
                <Checkbox
                    checked={schema.innspillTilNAv}
                    label="Eventuelle andre innspill til NAV"
                    onChange={() =>
                        setSchema(state => ({
                            ...state,
                            innspillTilNAv: !state.innspillTilNAv,
                        }))
                    }
                />
                <br />
                {schema.innspillTilNAv && (
                    <Textarea
                        maxLength={0}
                        value={schema.innspillTilNavBeskriv || ''}
                        onChange={({ target: { value } }) =>
                            setSchema(state => ({
                                ...state,
                                innspillTilNavBeskriv: value,
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
