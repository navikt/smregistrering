import React from 'react';
import { Element } from 'nav-frontend-typografi';
import { Input, Select } from 'nav-frontend-skjema';

import SectionContainer from '../SectionContainer';
import { ErrorSchemaType, SchemaType, Validate } from '../../Form';
import { HarArbeidsgiver } from '../../../../types/RegistrertSykmelding';
import { Section } from '../../../../types/Section';

export type Arbeidsgiver = {
    harArbeidsgiver?: HarArbeidsgiver;
    arbeidsgiverNavn?: string;
    yrkesbetegnelse?: string;
    stillingsprosent?: number;
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
                    if (value === '0') {
                        setSchema(state => ({
                            ...state,
                            harArbeidsgiver: undefined,
                        }));
                    } else {
                        setSchema(state => ({
                            ...state,
                            harArbeidsgiver: value as HarArbeidsgiver,
                        }));
                    }
                    validate('harArbeidsgiver', value);
                }}
                className="form-margin-bottom"
                label={<Element>2.1 Pasienten har</Element>}
                feil={errors.harArbeidsgiver}
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
                        arbeidsgiverNavn: value,
                    }));
                    validate('arbeidsgiverNavn', value);
                }}
                label={<Element>2.2 Arbeidsgiver for denne sykmeldingen</Element>}
                feil={errors.arbeidsgiverNavn}
            />
            <Input
                className="form-margin-bottom"
                type="text"
                onChange={({ target: { value } }) => {
                    setSchema(state => ({
                        ...state,
                        yrkesbetegnelse: value,
                    }));
                    validate('yrkesbetegnelse', value);
                }}
                label={<Element>2.3 Yrke/stilling for dette arbeidsforholdet</Element>}
                feil={errors.yrkesbetegnelse}
            />
            <Input
                className="form-margin-bottom half"
                type="number"
                onChange={({ target: { value } }) => {
                    setSchema(state => ({
                        ...state,
                        stillingsprosent: Number(value),
                    }));
                    validate('stillingsprosent', value);
                }}
                label={<Element>2.4 Stillingsprosent</Element>}
                feil={errors.stillingsprosent}
            />
        </SectionContainer>
    );
};

export default ArbeidsgiverSection;
