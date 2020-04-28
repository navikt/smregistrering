import React from 'react';
import { Checkbox, Textarea } from 'nav-frontend-skjema';
import { Element } from 'nav-frontend-typografi';

import SectionContainer from '../SectionContainer';
import Subsection from '../formComponents/Subsection';
import { SchemaType, ErrorSchemaType } from '../../Form';
import { Section } from '../../../../types/Section';
import { Validate } from '../../validation';

export type MeldingTilNav = {
    meldingTilNavBistand?: boolean;
    meldingTilNavBegrunn?: string;
};

type MeldingTilNavSectionProps = {
    section: Section;
    setSchema: (value: React.SetStateAction<SchemaType>) => void;
    schema: SchemaType;
    errors: ErrorSchemaType;
    validate: Validate;
};

const MeldingTilNavSection = ({ section, setSchema, schema, errors, validate }: MeldingTilNavSectionProps) => {
    return (
        <SectionContainer section={section}>
            <Subsection sectionIdentifier="8.1" underline={false}>
                <Checkbox
                    checked={schema.meldingTilNavBistand}
                    label="Ønskes bistand fra NAV nå?"
                    onChange={() =>
                        setSchema(state => ({
                            ...state,
                            meldingTilNavBistand: !state.meldingTilNavBistand,
                        }))
                    }
                />
                <br />
                {schema.meldingTilNavBistand && (
                    <Textarea
                        maxLength={0}
                        value={schema.meldingTilNavBegrunn || ''}
                        onChange={({ target: { value } }) =>
                            setSchema(state => ({
                                ...state,
                                meldingTilNavBegrunn: value,
                            }))
                        }
                        label={<Element>Begrunn nærmere</Element>}
                    />
                )}
            </Subsection>
        </SectionContainer>
    );
};

export default MeldingTilNavSection;
