import React from 'react';
import { Element } from 'nav-frontend-typografi';
import { Input, Select } from 'nav-frontend-skjema';

import SectionContainer from '../SectionContainer';
import { ErrorSchemaType, SchemaType, Validate } from '../../Form';
import { Section } from '../../../../types/Section';

export enum HarArbeidsgiver {
    EN_ARBEIDSGIVER = 'Én arbeidsgiver',
    FLERE_ARBEIDSGIVERE = 'Flere arbeidsgivere',
    INGEN_ARBEIDSGIVER = 'Ingen arbeidsgiver',
}

export enum ArbeidsgiverField {
    HAR_ARBEIDSGIVER = 'harArbeidsgiver',
    NAVN = 'arbeidsgiverNavn',
    YRKESBETEGNELSE = 'yrkesbetegnelse',
    STILLINGSPROSENT = 'stillingsprosent',
}

export type Arbeidsgiver = {
    [ArbeidsgiverField.HAR_ARBEIDSGIVER]?: HarArbeidsgiver;
    [ArbeidsgiverField.NAVN]?: string;
    [ArbeidsgiverField.YRKESBETEGNELSE]?: string;
    [ArbeidsgiverField.STILLINGSPROSENT]?: number;
};

type ArbeidsgiverSectionProps = {
    section: Section;
    setSchema: (value: React.SetStateAction<SchemaType>) => void;
    errors: ErrorSchemaType;
    validate: Validate;
    schema: SchemaType;
};

const ArbeidsgiverSection = ({ section, setSchema, errors, validate, schema }: ArbeidsgiverSectionProps) => {
    return (
        <SectionContainer section={section}>
            <Select
                onChange={({ target: { value } }) => {
                    console.log(value);
                    if (value === '0') {
                        setSchema(state => ({
                            ...state,
                            [ArbeidsgiverField.HAR_ARBEIDSGIVER]: undefined,
                        }));
                    } else {
                        setSchema(state => ({
                            ...state,
                            [ArbeidsgiverField.HAR_ARBEIDSGIVER]: value as HarArbeidsgiver,
                        }));
                    }
                    validate(ArbeidsgiverField.HAR_ARBEIDSGIVER, value);
                }}
                className="form-margin-bottom"
                label={<Element>2.1 Pasienten har</Element>}
                feil={errors[ArbeidsgiverField.HAR_ARBEIDSGIVER]}
            >
                <option value="0">Velg</option>
                {Object.entries(HarArbeidsgiver).map(([key, value]) => {
                    return (
                        <option key={key} value={value}>
                            {value}
                        </option>
                    );
                })}
            </Select>
            <Input
                className="form-margin-bottom"
                type="text"
                onChange={({ target: { value } }) => {
                    setSchema(state => ({
                        ...state,
                        [ArbeidsgiverField.NAVN]: value,
                    }));
                    validate(ArbeidsgiverField.NAVN, value);
                }}
                label={<Element>2.2 Arbeidsgiver for denne sykmeldingen</Element>}
                feil={errors[ArbeidsgiverField.NAVN]}
            />
            <Input
                className="form-margin-bottom"
                type="text"
                onChange={({ target: { value } }) => {
                    setSchema(state => ({
                        ...state,
                        [ArbeidsgiverField.YRKESBETEGNELSE]: value,
                    }));
                    validate(ArbeidsgiverField.YRKESBETEGNELSE, value);
                }}
                label={<Element>2.3 Yrke/stilling for dette arbeidsforholdet</Element>}
                feil={errors[ArbeidsgiverField.YRKESBETEGNELSE]}
            />
            <Input
                className="form-margin-bottom half"
                type="number"
                onChange={({ target: { value } }) => {
                    setSchema(state => ({
                        ...state,
                        [ArbeidsgiverField.STILLINGSPROSENT]: Number(value),
                    }));
                    validate(ArbeidsgiverField.STILLINGSPROSENT, value);
                }}
                label={<Element>2.4 Stillingsprosent</Element>}
                feil={errors[ArbeidsgiverField.STILLINGSPROSENT]}
            />
        </SectionContainer>
    );
};

export default ArbeidsgiverSection;
