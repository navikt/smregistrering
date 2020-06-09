import React from 'react';
import { Element } from 'nav-frontend-typografi';
import { Input, Select } from 'nav-frontend-skjema';

import SectionContainer from '../SectionContainer';
import { ErrorSchemaType, SchemaType } from '../../Form';
import { HarArbeidsgiver } from '../../../../types/RegistrertSykmelding';
import { Section } from '../../../../types/Section';
import { Validate } from '../../validation';

export type Arbeidsgiver = {
    harArbeidsgiver?: HarArbeidsgiver | null;
    arbeidsgiverNavn?: string | null;
    yrkesbetegnelse?: string | null;
    stillingsprosent?: number | null;
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
                id="harArbeidsgiver"
                value={schema.harArbeidsgiver ? schema.harArbeidsgiver : undefined}
                onChange={({ target: { value } }) => {
                    if (value === '0') {
                        setSchema(
                            (state): SchemaType => ({
                                ...state,
                                harArbeidsgiver: undefined,
                            }),
                        );
                    } else {
                        setSchema(
                            (state): SchemaType => ({
                                ...state,
                                harArbeidsgiver: value as HarArbeidsgiver,
                            }),
                        );
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
                id="arbeidsgiverNavn"
                className="form-margin-bottom"
                type="text"
                value={schema.arbeidsgiverNavn ? schema.arbeidsgiverNavn : undefined}
                onChange={({ target: { value } }) => {
                    setSchema(
                        (state): SchemaType => ({
                            ...state,
                            arbeidsgiverNavn: value,
                        }),
                    );
                    validate('arbeidsgiverNavn', value);
                }}
                label={<Element>2.2 Arbeidsgiver for denne sykmeldingen</Element>}
                feil={errors.arbeidsgiverNavn}
            />
            <Input
                id="yrkesbetegnelse"
                className="form-margin-bottom"
                type="text"
                value={schema.yrkesbetegnelse ? schema.yrkesbetegnelse : undefined}
                onChange={({ target: { value } }) => {
                    setSchema(
                        (state): SchemaType => ({
                            ...state,
                            yrkesbetegnelse: value,
                        }),
                    );
                    validate('yrkesbetegnelse', value);
                }}
                label={<Element>2.3 Yrke/stilling for dette arbeidsforholdet</Element>}
                feil={errors.yrkesbetegnelse}
            />
            <Input
                id="stillingsprosent"
                className="form-margin-bottom half"
                type="number"
                value={schema.stillingsprosent ? schema.stillingsprosent : undefined}
                onChange={({ target: { value } }) => {
                    setSchema(
                        (state): SchemaType => ({
                            ...state,
                            stillingsprosent: Number(value),
                        }),
                    );
                    validate('stillingsprosent', value);
                }}
                label={<Element>2.4 Stillingsprosent</Element>}
                feil={errors.stillingsprosent}
            />
        </SectionContainer>
    );
};

export default ArbeidsgiverSection;
