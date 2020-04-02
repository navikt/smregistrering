import React from 'react';
import { Element } from 'nav-frontend-typografi';
import { Input } from 'nav-frontend-skjema';

import Row from '../formComponents/Row';
import SectionContainer from '../SectionContainer';
import { ErrorSchemaType, SchemaType } from '../../Form';
import { Section } from '../../../../types/Section';

export enum MetadataField {
    LEGE_NAVN = 'legenavn',
    TELEFON = 'telefon',
    ETTERNAVN = 'etternavn',
    FORNAVN = 'fornavn',
}

export type Metadata = {
    [MetadataField.LEGE_NAVN]?: string;
    [MetadataField.TELEFON]?: string;
    [MetadataField.ETTERNAVN]?: string;
    [MetadataField.FORNAVN]?: string;
};

type PasientopplysningerProps = {
    section: Section;
    setSchema: (value: React.SetStateAction<SchemaType>) => void;
    errors: ErrorSchemaType;
    validate: (name: keyof SchemaType, value: SchemaType[keyof SchemaType]) => void;
    schema: SchemaType;
};

const PasientopplysningerSection = ({ section, setSchema, errors, validate, schema }: PasientopplysningerProps) => {
    return (
        <SectionContainer section={section}>
            <Row>
                <Input
                    onChange={({ target: { value } }) => {
                        setSchema(state => ({
                            ...state,
                            [MetadataField.ETTERNAVN]: value,
                        }));

                        validate(MetadataField.ETTERNAVN, value);
                    }}
                    onFocus={() => validate(MetadataField.ETTERNAVN, schema[MetadataField.ETTERNAVN])}
                    feil={errors[MetadataField.ETTERNAVN]}
                    type="text"
                    label={<Element>1.1.1 Etternavn</Element>}
                />
                <Input
                    onChange={({ target: { value } }) => {
                        setSchema(state => ({
                            ...state,
                            [MetadataField.FORNAVN]: value,
                        }));

                        validate(MetadataField.FORNAVN, value);
                    }}
                    feil={errors[MetadataField.FORNAVN]}
                    type="text"
                    label={<Element>1.1.2 Fornavn</Element>}
                />
            </Row>

            <Input
                className="form-margin-bottom half"
                type="tel"
                onChange={({ target: { value } }) => {
                    setSchema(state => ({
                        ...state,
                        [MetadataField.TELEFON]: value,
                    }));
                    validate(MetadataField.TELEFON, value);
                }}
                feil={errors[MetadataField.TELEFON]}
                label={<Element>1.3 Telefon</Element>}
            />

            <Input
                className="form-margin-bottom"
                type="text"
                feil={errors[MetadataField.LEGE_NAVN]}
                onChange={({ target: { value } }) =>
                    setSchema(state => ({ ...state, [MetadataField.LEGE_NAVN]: value }))
                }
                label={<Element>1.4 Navn på pasientens fastlege</Element>}
            />
        </SectionContainer>
    );
};

export default PasientopplysningerSection;
