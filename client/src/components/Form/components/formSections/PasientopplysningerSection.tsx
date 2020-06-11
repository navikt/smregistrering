import React from 'react';
import { Element } from 'nav-frontend-typografi';
import { Input } from 'nav-frontend-skjema';

import Row from '../formComponents/Row';
import SectionContainer from '../SectionContainer';
import { ErrorSchemaType, SchemaType } from '../../Form';
import { Section } from '../../../../types/Section';
import { Validate } from '../../validation';

export type Pasientopplysninger = {
    pasientFnr?: string | null;
    pasientTelefon?: string;
    pasientEtternavn?: string;
    pasientFornavn?: string;
    navnFastlege?: string;
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
                    disabled
                    id="pasientEtternavn"
                    onChange={({ target: { value } }) => {
                        setSchema(
                            (state): SchemaType => ({
                                ...state,
                                pasientEtternavn: value,
                            }),
                        );

                        validate('pasientEtternavn', value);
                    }}
                    onFocus={() => validate('pasientEtternavn', schema.pasientEtternavn)}
                    feil={errors.pasientEtternavn}
                    type="text"
                    label={<Element>1.1.1 Etternavn</Element>}
                />
                <Input
                    disabled
                    id="pasientFornavn"
                    onChange={({ target: { value } }) => {
                        setSchema(
                            (state): SchemaType => ({
                                ...state,
                                pasientFornavn: value,
                            }),
                        );

                        validate('pasientFornavn', value);
                    }}
                    feil={errors.pasientFornavn}
                    type="text"
                    label={<Element>1.1.2 Fornavn</Element>}
                />
            </Row>
            <Row>
                <Input
                    id="pasientFnr"
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
                    label="1.2 Fødselsnummer (11 siffer)"
                    feil={errors.pasientFnr}
                />
                <Input
                    disabled
                    id="pasientTelefon"
                    type="tel"
                    onChange={({ target: { value } }) => {
                        setSchema(
                            (state): SchemaType => ({
                                ...state,
                                pasientTelefon: value,
                            }),
                        );
                        validate('pasientTelefon', value);
                    }}
                    feil={errors.pasientTelefon}
                    label={<Element>1.3 Telefon</Element>}
                />
            </Row>

            <Input
                id="navnFastlege"
                className="form-margin-bottom"
                type="text"
                feil={errors.navnFastlege}
                onChange={({ target: { value } }) => {
                    setSchema((state): SchemaType => ({ ...state, navnFastlege: value }));
                    validate('navnFastlege', value);
                }}
                label={<Element>1.4 Navn på pasientens fastlege</Element>}
            />
        </SectionContainer>
    );
};

export default PasientopplysningerSection;
