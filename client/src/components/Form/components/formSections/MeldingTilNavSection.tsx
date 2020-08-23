import React from 'react';
import { Checkbox, Textarea } from 'nav-frontend-skjema';

import ExpandableField from '../formComponents/ExpandableField';
import SectionContainer from '../SectionContainer';
import Subsection from '../formComponents/Subsection';
import { ErrorSchemaType, SchemaType } from '../../Form';
import { Section } from '../../../../types/Section';
import { Validate } from '../../validation';

export type MeldingTilNav = {
    meldingTilNavBistand: boolean;
    meldingTilNavBegrunn?: string | null;
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
                    id="meldingTilNavBistand"
                    checked={schema.meldingTilNavBistand}
                    label="Ønskes bistand fra NAV nå?"
                    onChange={() =>
                        setSchema(
                            (state): SchemaType => {
                                const updatedSchema = {
                                    ...state,
                                    meldingTilNavBistand: !state.meldingTilNavBistand,
                                };
                                validate('meldingTilNavBistand', updatedSchema);
                                return updatedSchema;
                            },
                        )
                    }
                    feil={errors.meldingTilNavBistand}
                />
                <br />
                <ExpandableField show={schema.meldingTilNavBistand}>
                    <Textarea
                        id="meldingTilNavBegrunn"
                        maxLength={0}
                        value={schema.meldingTilNavBegrunn || ''}
                        onChange={({ target: { value } }) => {
                            setSchema(
                                (state): SchemaType => {
                                    const updatedSchema = {
                                        ...state,
                                        meldingTilNavBegrunn: value,
                                    };
                                    validate('meldingTilNavBegrunn', updatedSchema);
                                    return updatedSchema;
                                },
                            );
                        }}
                        feil={errors.meldingTilNavBegrunn}
                        label="Begrunn nærmere"
                    />
                </ExpandableField>
            </Subsection>
        </SectionContainer>
    );
};

export default MeldingTilNavSection;
