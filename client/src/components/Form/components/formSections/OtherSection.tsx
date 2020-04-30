import React from 'react';
import { EtikettLiten } from 'nav-frontend-typografi';
import { Input } from 'nav-frontend-skjema';

import DatePicker from '../formComponents/DatePicker';
import { ErrorSchemaType, SchemaType } from '../../Form';
import { Validate } from '../../validation';

export type Other = {
    pasientFnr?: string;
    sykmelderFnr?: string;
    syketilfelleStartDato?: Date;
    behandletDato?: Date;
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
            <Input
                className="form-margin-bottom half"
                defaultValue={schema.pasientFnr}
                onChange={({ target: { value } }) => {
                    setSchema(state => ({
                        ...state,
                        pasientFnr: value,
                    }));
                    validate('pasientFnr', value);
                }}
                label={<EtikettLiten>Fødselsnummer (11 siffer)</EtikettLiten>}
                feil={errors.pasientFnr}
            />
            <Input
                className="form-margin-bottom half"
                onChange={({ target: { value } }) => {
                    setSchema(state => ({
                        ...state,
                        sykmelderFnr: value,
                    }));
                    validate('sykmelderFnr', value);
                }}
                label={<EtikettLiten>Sykmelders fødselsnummer (11 siffer)</EtikettLiten>}
                feil={errors.sykmelderFnr}
            />
            <DatePicker
                label="Startdato for legemeldt fravær"
                value={schema.syketilfelleStartDato}
                onChange={newDates => {
                    setSchema(state => ({ ...state, syketilfelleStartDato: newDates }));
                    validate('syketilfelleStartDato', newDates);
                }}
            />
            <DatePicker
                label="Behandletdato"
                value={schema.behandletDato}
                onChange={newDates => {
                    setSchema(state => ({ ...state, behandletDato: newDates }));
                    validate('behandletDato', newDates);
                }}
            />
        </div>
    );
};

export default OtherSection;
