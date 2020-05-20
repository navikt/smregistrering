import React from 'react';
import { Element } from 'nav-frontend-typografi';
import { Input } from 'nav-frontend-skjema';

import Row from '../formComponents/Row';
import SectionContainer from '../SectionContainer';
import { ErrorSchemaType, SchemaType } from '../../Form';
import { Section } from '../../../../types/Section';
import { Validate } from '../../validation';

export type Pasientopplysninger = {
    behandlerNavn?: string;
    pasientTelefon?: string;
    pasientEtternavn?: string;
    pasientFornavn?: string;
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
            <Row>
                <Input
                    id="pasientEtternavn"
                    disabled
                    onChange={({ target: { value } }) => {
                        setSchema(state => ({
                            ...state,
                            pasientEtternavn: value,
                        }));

                        validate('pasientEtternavn', value);
                    }}
                    onFocus={() => validate('pasientEtternavn', schema.pasientEtternavn)}
                    feil={errors.pasientEtternavn}
                    type="text"
                    label={<Element>1.1.1 Etternavn</Element>}
                />
                <Input
                    id="pasientFornavn"
                    disabled
                    onChange={({ target: { value } }) => {
                        setSchema(state => ({
                            ...state,
                            pasientFornavn: value,
                        }));

                        validate('pasientFornavn', value);
                    }}
                    feil={errors.pasientFornavn}
                    type="text"
                    label={<Element>1.1.2 Fornavn</Element>}
                />
            </Row>

            <Input
                id="pasientTelefon"
                disabled
                className="form-margin-bottom half"
                type="tel"
                onChange={({ target: { value } }) => {
                    setSchema(state => ({
                        ...state,
                        pasientTelefon: value,
                    }));
                    validate('pasientTelefon', value);
                }}
                feil={errors.pasientTelefon}
                label={<Element>1.3 Telefon</Element>}
            />

            <Input
                id="behandlerNavn"
                disabled
                className="form-margin-bottom"
                type="text"
                feil={errors.behandlerNavn}
                onChange={({ target: { value } }) => {
                    setSchema(state => ({ ...state, behandlerNavn: value }));
                    validate('behandlerNavn', value);
                }}
                label={<Element>1.4 Navn på pasientens fastlege</Element>}
            />
        </SectionContainer>
    );
};

export default PasientopplysningerSection;
