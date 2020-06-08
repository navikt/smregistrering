import React from 'react';
import { Element } from 'nav-frontend-typografi';
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
                            (state): SchemaType => ({
                                ...state,
                                tiltakArbeidsplassen: value,
                            }),
                        );
                        validate('tiltakArbeidsplassen', value);
                    }}
                    label={<Element>Tilrettelegging/hensyn som bør tas på arbeidsplassen</Element>}
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
                            (state): SchemaType => ({
                                ...state,
                                tiltakNav: value,
                            }),
                        );
                        validate('tiltakNav', value);
                    }}
                    feil={errors.tiltakNav}
                    label={
                        <Element>
                            Tiltak i regi av NAV. (Hvis det er behov for bistand fra NAV nå, bruk felt 8.)
                        </Element>
                    }
                />
            </Subsection>

            <Subsection sectionIdentifier="7.3" underline={false}>
                <Textarea
                    id="andreTiltak"
                    maxLength={0}
                    value={schema.andreTiltak || ''}
                    onChange={({ target: { value } }) => {
                        setSchema(
                            (state): SchemaType => ({
                                ...state,
                                andreTiltak: value,
                            }),
                        );
                        validate('andreTiltak', value);
                    }}
                    label={<Element>Eventuelle andre innspill til NAV</Element>}
                    feil={errors.andreTiltak}
                />
            </Subsection>
        </SectionContainer>
    );
};

export default ArbeidsevneSection;
