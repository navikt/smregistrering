import React from 'react';
import { Input } from 'nav-frontend-skjema';

import SectionContainer from '../SectionContainer';
import { ErrorSchemaType, SchemaType } from '../../Form';
import { Section } from '../../../../types/Section';
import { Validate } from '../../validation';

export type Pasientopplysninger = {
    pasientFnr?: string | null;
};

type PasientopplysningerProps = {
    section: Section;
    setSchema: (value: React.SetStateAction<SchemaType>) => void;
    errors: ErrorSchemaType;
    validate: Validate;
    schema: SchemaType;
};

const PasientopplysningerSection = ({ section, setSchema, errors, validate, schema }: PasientopplysningerProps) => {
    return (
        <SectionContainer section={section}>
            <Input
                id="pasientFnr"
                value={schema.pasientFnr ? schema.pasientFnr : undefined}
                onChange={({ target: { value } }) => {
                    setSchema(
                        (state): SchemaType => {
                            const updatedSchema = {
                                ...state,
                                pasientFnr: value,
                            };
                            validate('pasientFnr', updatedSchema);
                            return updatedSchema;
                        },
                    );
                }}
                label="1.2 Fødselsnummer (11 siffer)"
                feil={errors.pasientFnr}
            />
        </SectionContainer>
    );
};

export default PasientopplysningerSection;
