import React from 'react';
import { EtikettLiten } from 'nav-frontend-typografi';
import { FnrInput } from 'nav-frontend-skjema';

import DatePicker from '../formComponents/DatePicker';
import { ErrorSchemaType, SchemaType } from '../../Form';
import { Validate } from '../../validation';

export type Other = {
    fnr?: string;
    syketilfelleStartDato?: Date;
};

type OtherSectionProps = {
    setSchema: (value: React.SetStateAction<SchemaType>) => void;
    schema: SchemaType;
    errors: ErrorSchemaType;
    validate: Validate;
};

const OtherSection = ({ setSchema, schema, errors, validate }: OtherSectionProps) => {
    return (
        <div className="form-margin-bottom section-content">
            <FnrInput
                className="form-margin-bottom half"
                defaultValue={schema.fnr}
                onChange={({ target: { value } }) => {
                    setSchema(state => ({
                        ...state,
                        fnr: value,
                    }));
                    validate('fnr', value);
                }}
                onValidate={valid => console.log(valid)}
                label={<EtikettLiten>Fødselsnummer (11 siffer)</EtikettLiten>}
                feil={errors.fnr}
            />
            <DatePicker
                label="Startdato for legemeldt fravær"
                value={schema.syketilfelleStartDato}
                onChange={newDates => setSchema(state => ({ ...state, syketilfelleStartDato: newDates }))}
            />
        </div>
    );
};

export default OtherSection;
