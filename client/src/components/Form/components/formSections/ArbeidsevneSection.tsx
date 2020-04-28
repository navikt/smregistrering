import React from 'react';
import { Checkbox, Textarea } from 'nav-frontend-skjema';
import { Element } from 'nav-frontend-typografi';

import SectionContainer from '../SectionContainer';
import Subsection from '../formComponents/Subsection';
import { ErrorSchemaType, SchemaType } from '../../Form';
import { Section } from '../../../../types/Section';
import { Validate } from '../../validation';

export type Arbeidsevne = {
    tilretteleggingArbeidsplassen?: boolean;
    tilretteleggingArbeidsplassBeskriv?: string;
    tiltakNav?: boolean;
    tiltakNavBeskriv?: string;
    innspillTilNAv?: boolean;
    innspillTilNavBeskriv?: string;
};

export type ArbeidsevneSectionProps = {
    section: Section;
    setSchema: (value: React.SetStateAction<SchemaType>) => void;
    schema: SchemaType;
    errors: ErrorSchemaType;
    validate: Validate;
};

const ArbeidsevneSection = ({ section, setSchema, schema, errors, validate }: ArbeidsevneSectionProps) => {
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
                    feil={errors.tilretteleggingArbeidsplassen}
                />
                <br />
                {schema.tilretteleggingArbeidsplassen && (
                    <Textarea
                        maxLength={0}
                        value={schema.tilretteleggingArbeidsplassBeskriv || ''}
                        onChange={({ target: { value } }) => {
                            setSchema(state => ({
                                ...state,
                                tilretteleggArbeidsplassBeskriv: value,
                            }));
                            validate('tilretteleggingArbeidsplassBeskriv', value);
                        }}
                        label={<Element>Beskriv</Element>}
                        feil={errors.tilretteleggingArbeidsplassBeskriv}
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
                    feil={errors.tiltakNav}
                />
                <br />
                {schema.tiltakNav && (
                    <Textarea
                        maxLength={0}
                        value={schema.tiltakNavBeskriv || ''}
                        onChange={({ target: { value } }) => {
                            setSchema(state => ({
                                ...state,
                                tiltakNavBeskriv: value,
                            }));
                            validate('tiltakNavBeskriv', value);
                        }}
                        feil={errors.tiltakNavBeskriv}
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
                    feil={errors.innspillTilNAv}
                />
                <br />
                {schema.innspillTilNAv && (
                    <Textarea
                        maxLength={0}
                        value={schema.innspillTilNavBeskriv || ''}
                        onChange={({ target: { value } }) => {
                            setSchema(state => ({
                                ...state,
                                innspillTilNavBeskriv: value,
                            }));
                            validate('innspillTilNavBeskriv', value);
                        }}
                        label={<Element>Beskriv</Element>}
                        feil={errors.innspillTilNavBeskriv}
                    />
                )}
            </Subsection>
        </SectionContainer>
    );
};

export default ArbeidsevneSection;
