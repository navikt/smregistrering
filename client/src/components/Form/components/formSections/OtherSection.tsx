import React from 'react';
import { EtikettLiten } from 'nav-frontend-typografi';
import { Input } from 'nav-frontend-skjema';

import DatePicker from '../formComponents/DatePicker';
import { ErrorSchemaType, SchemaType } from '../../Form';
import { Validate } from '../../validation';

export type Other = {
    pasientFnr?: string | null;
    syketilfelleStartDato?: Date | null;
    behandletDato?: Date | null;
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
                <Input
                    id="pasientFnr"
                    className="form-margin-bottom half"
                    value={schema.pasientFnr ? schema.pasientFnr : undefined}
                    onChange={({ target: { value } }) => {
                        setSchema(
                            (state): SchemaType => ({
                                ...state,
                                pasientFnr: value,
                            }),
                        );
                        validate('pasientFnr', value);
                    }}
                    label={<EtikettLiten>Fødselsnummer (11 siffer)</EtikettLiten>}
                    feil={errors.pasientFnr}
                />
                <DatePicker
                    id="syketilfelleStartDato"
                    label="Startdato for legemeldt fravær"
                    value={schema.syketilfelleStartDato ? schema.syketilfelleStartDato : undefined}
                    onChange={newDates => {
                        setSchema((state): SchemaType => ({ ...state, syketilfelleStartDato: newDates }));
                        validate('syketilfelleStartDato', newDates);
                    }}
                    feil={errors.syketilfelleStartDato}
                />
                <DatePicker
                    id="behandletDato"
                    label="Behandletdato"
                    value={schema.behandletDato ? schema.behandletDato : undefined}
                    onChange={newDates => {
                        setSchema((state): SchemaType => ({ ...state, behandletDato: newDates }));
                        validate('behandletDato', newDates);
                    }}
                    feil={errors.behandletDato}
                />
            </fieldset>
        </section>
    );
};

export default OtherSection;
