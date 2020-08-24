import React from 'react';

import DatePicker from '../formComponents/DatePicker';
import { ErrorSchemaType, SchemaType } from '../../Form';
import { Validate } from '../../validation';

export type Other = {
    syketilfelleStartDato?: Date | null;
};

type OtherSectionProps = {
    setSchema: (value: React.SetStateAction<SchemaType>) => void;
    schema: SchemaType;
    errors: ErrorSchemaType;
    validate: Validate;
};

const OtherSection = ({ setSchema, schema, errors, validate }: OtherSectionProps) => {
    return (
        <section aria-label="other">
            <fieldset className=" section-content">
                <DatePicker
                    id="syketilfelleStartDato"
                    label="Startdato for legemeldt fravær"
                    value={schema.syketilfelleStartDato ? schema.syketilfelleStartDato : undefined}
                    onChange={(newDates) => {
                        setSchema(
                            (state): SchemaType => {
                                const updatedSchema = { ...state, syketilfelleStartDato: newDates };
                                validate('syketilfelleStartDato', updatedSchema);
                                return updatedSchema;
                            },
                        );
                    }}
                    feil={errors.syketilfelleStartDato}
                />
            </fieldset>
        </section>
    );
};

export default OtherSection;
