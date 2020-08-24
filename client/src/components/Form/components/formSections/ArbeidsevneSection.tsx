import React from 'react';
import { Textarea } from 'nav-frontend-skjema';

import SectionContainer from '../SectionContainer';
import Subsection from '../formComponents/Subsection';
import { ErrorSchemaType, SchemaType } from '../../Form';
import { Section } from '../../../../types/Section';
import { Validate } from '../../validation';

export type Arbeidsevne = {
    tiltakArbeidsplassen?: string | null;
    tiltakNav?: string | null;
    andreTiltak?: string | null;
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
                <Textarea
                    id="tiltakArbeidsplassen"
                    maxLength={0}
                    value={schema.tiltakArbeidsplassen || ''}
                    onChange={({ target: { value } }) => {
                        setSchema(
                            (state): SchemaType => {
                                const updatedSchema = {
                                    ...state,
                                    tiltakArbeidsplassen: value,
                                };
                                validate('tiltakArbeidsplassen', updatedSchema);
                                return updatedSchema;
                            },
                        );
                    }}
                    label="Tilrettelegging/hensyn som bør tas på arbeidsplassen"
                    feil={errors.tiltakArbeidsplassen}
                />
            </Subsection>

            <Subsection sectionIdentifier="7.2">
                <Textarea
                    id="tiltakNav"
                    maxLength={0}
                    value={schema.tiltakNav || ''}
                    onChange={({ target: { value } }) => {
                        setSchema(
                            (state): SchemaType => {
                                const updatedSchema = {
                                    ...state,
                                    tiltakNav: value,
                                };
                                validate('tiltakNav', updatedSchema);
                                return updatedSchema;
                            },
                        );
                    }}
                    feil={errors.tiltakNav}
                    label="Tiltak i regi av NAV. (Hvis det er behov for bistand fra NAV nå, bruk felt 8.)"
                />
            </Subsection>

            <Subsection sectionIdentifier="7.3" underline={false}>
                <Textarea
                    id="andreTiltak"
                    maxLength={0}
                    value={schema.andreTiltak || ''}
                    onChange={({ target: { value } }) => {
                        setSchema(
                            (state): SchemaType => {
                                const updatedSchema = {
                                    ...state,
                                    andreTiltak: value,
                                };
                                validate('andreTiltak', updatedSchema);
                                return updatedSchema;
                            },
                        );
                    }}
                    label="Eventuelle andre innspill til NAV"
                    feil={errors.andreTiltak}
                />
            </Subsection>
        </SectionContainer>
    );
};

export default ArbeidsevneSection;
