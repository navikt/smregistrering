import React from 'react';
import { Textarea } from 'nav-frontend-skjema';

import SectionContainer from '../SectionContainer';
import { ErrorSchemaType, SchemaType } from '../../Form';
import { Section } from '../../../../types/Section';
import { Validate } from '../../validation';

export type MeldingTilArbeidsgiver = {
    meldingTilArbeidsgiverBeskriv?: string | null;
};

type MeldingTilArbeidsgiverSectionProps = {
    section: Section;
    setSchema: (value: React.SetStateAction<SchemaType>) => void;
    schema: SchemaType;
    errors: ErrorSchemaType;
    validate: Validate;
};

const MeldingTilArbeidsgiverSection = ({
    section,
    setSchema,
    schema,
    errors,
    validate,
}: MeldingTilArbeidsgiverSectionProps) => {
    return (
        <SectionContainer section={section}>
            <Textarea
                id="meldingTilArbeidsgiverBeskriv"
                maxLength={0}
                value={schema.meldingTilArbeidsgiverBeskriv || ''}
                onChange={({ target: { value } }) => {
                    setSchema(
                        (state): SchemaType => {
                            const updatedSchema = {
                                ...state,
                                meldingTilArbeidsgiverBeskriv: value,
                            };
                            validate('meldingTilArbeidsgiverBeskriv', updatedSchema);
                            return updatedSchema;
                        },
                    );
                }}
                feil={errors.meldingTilArbeidsgiverBeskriv}
                label="9.1 Andre innspill til arbeidsgiver"
            />
        </SectionContainer>
    );
};

export default MeldingTilArbeidsgiverSection;
