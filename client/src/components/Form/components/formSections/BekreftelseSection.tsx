import React from 'react';
import { Checkbox, Input } from 'nav-frontend-skjema';
import { Element } from 'nav-frontend-typografi';

import Row from '../formComponents/Row';
import SectionContainer from '../SectionContainer';
import Subsection from '../formComponents/Subsection';
import { ErrorSchemaType, SchemaType } from '../../Form';
import { Section } from '../../../../types/Section';
import { Validate } from '../../validation';

export type Bekreftelse = {
    legitimert: boolean;
    sykmeldersFornavn?: string | null;
    sykmeldersEtternavn?: string | null;
    sykmelderFnr?: string | null;
    hpr?: string | null;
    sykmelderTelefon?: string | null;
    sykmelderAdresse?: string | null;
};

type BekreftelseSectionProps = {
    section: Section;
    setSchema: (value: React.SetStateAction<SchemaType>) => void;
    schema: SchemaType;
    errors: ErrorSchemaType;
    validate: Validate;
};

const BekreftelseSection = ({ section, setSchema, schema, errors, validate }: BekreftelseSectionProps) => {
    return (
        <SectionContainer section={section}>
            <Subsection sectionIdentifier="12.1" underline={false}>
                <Checkbox
                    id="legitimert"
                    className="form-margin-bottom"
                    checked={schema.legitimert}
                    label="Pasienten er kjent eller har vist legitimasjon"
                    onChange={() =>
                        setSchema(
                            (state): SchemaType => ({
                                ...state,
                                legitimert: !state.legitimert,
                            }),
                        )
                    }
                    feil={errors.legitimert}
                />
            </Subsection>
            <Input
                id="sykmelderFnr"
                className="form-margin-bottom half"
                value={schema.sykmelderFnr ? schema.sykmelderFnr : undefined}
                onChange={({ target: { value } }) => {
                    setSchema(
                        (state): SchemaType => ({
                            ...state,
                            sykmelderFnr: value,
                        }),
                    );
                    validate('sykmelderFnr', value);
                }}
                label={<Element>Sykmelders fødselsnummer (11 siffer)</Element>}
                feil={errors.sykmelderFnr}
            />
            <Row>
                <Input
                    id="sykmeldersFornavn"
                    className="form-margin-bottom"
                    value={schema.sykmeldersFornavn ? schema.sykmeldersFornavn : undefined}
                    onChange={({ target: { value } }) => {
                        setSchema(
                            (state): SchemaType => ({
                                ...state,
                                sykmeldersFornavn: value,
                            }),
                        );
                        validate('sykmeldersFornavn', value);
                    }}
                    feil={errors.sykmeldersFornavn}
                    label={<Element>12.2.1 Sykmelders fornavn</Element>}
                />
                <Input
                    id="sykmeldersEtternavn"
                    className="form-margin-bottom"
                    value={schema.sykmeldersEtternavn ? schema.sykmeldersEtternavn : undefined}
                    onChange={({ target: { value } }) => {
                        setSchema(
                            (state): SchemaType => ({
                                ...state,
                                sykmeldersEtternavn: value,
                            }),
                        );
                        validate('sykmeldersEtternavn', value);
                    }}
                    feil={errors.sykmeldersEtternavn}
                    label={<Element>Sykmelders etternavn</Element>}
                />
            </Row>
            <Row>
                <Input
                    id="hpr"
                    className="form-margin-bottom"
                    value={schema.hpr ? schema.hpr : undefined}
                    onChange={({ target: { value } }) => {
                        setSchema(
                            (state): SchemaType => ({
                                ...state,
                                hpr: value,
                            }),
                        );
                        validate('hpr', value);
                    }}
                    feil={errors.hpr}
                    label={<Element>12.4 HPR-nummer</Element>}
                />
                <Input
                    id="sykmelderTelefon"
                    className="form-margin-bottom"
                    value={schema.sykmelderTelefon ? schema.sykmelderTelefon : undefined}
                    onChange={({ target: { value } }) => {
                        setSchema(
                            (state): SchemaType => ({
                                ...state,
                                sykmelderTelefon: value,
                            }),
                        );
                        validate('sykmelderTelefon', value);
                    }}
                    feil={errors.sykmelderTelefon}
                    label={<Element>12.5 Telefon</Element>}
                />
            </Row>

            <Input
                id="sykmelderAdresse"
                className="form-margin-bottom"
                value={schema.sykmelderAdresse ? schema.sykmelderAdresse : undefined}
                onChange={({ target: { value } }) =>
                    setSchema(
                        (state): SchemaType => ({
                            ...state,
                            sykmelderAdresse: value,
                        }),
                    )
                }
                label={<Element>12.6 Adresse</Element>}
            />
        </SectionContainer>
    );
};

export default BekreftelseSection;
