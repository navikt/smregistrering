import React from 'react';
import { Element } from 'nav-frontend-typografi';
import { Input } from 'nav-frontend-skjema';

import DatePicker from '../formComponents/DatePicker';
import Row from '../formComponents/Row';
import SectionContainer from '../SectionContainer';
import Subsection from '../formComponents/Subsection';
import { ErrorSchemaType, SchemaType } from '../../Form';
import { Section } from '../../../../types/Section';
import { Validate } from '../../validation';

export type Bekreftelse = {
    behandletDato?: Date | null;
    sykmeldersFornavn?: string | null;
    sykmeldersEtternavn?: string | null;
    sykmelderFnr?: string | null;
    aktoerId?: string | null;
    hpr?: string | null;
    sykmelderTelefon?: string | null;
    sykmelderGate?: string | null;
    sykmelderPostnummer?: number | null;
    sykmelderKommune?: string | null;
    sykmelderPostboks?: string | null;
    sykmelderLand?: string | null;
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
            <Row>
                <Input
                    id="sykmelderFnr"
                    className="form-margin-bottom"
                    value={schema.sykmelderFnr ? schema.sykmelderFnr : undefined}
                    onChange={({ target: { value } }) => {
                        setSchema(
                            (state): SchemaType => {
                                const updatedSchema = {
                                    ...state,
                                    sykmelderFnr: value,
                                };
                                validate('sykmelderFnr', updatedSchema);
                                return updatedSchema;
                            },
                        );
                    }}
                    label={<Element>Sykmelders fødselsnummer (11 siffer)</Element>}
                    feil={errors.sykmelderFnr}
                />
                <Input
                    id="aktoerId"
                    className="form-margin-bottom"
                    value={schema.aktoerId ? schema.aktoerId : undefined}
                    onChange={({ target: { value } }) => {
                        setSchema(
                            (state): SchemaType => {
                                const updatedSchema = {
                                    ...state,
                                    aktoerId: value,
                                };
                                validate('aktoerId', updatedSchema);
                                return updatedSchema;
                            },
                        );
                    }}
                    label={<Element>AktørID</Element>}
                    feil={errors.aktoerId}
                />
            </Row>
            <DatePicker
                id="behandletDato"
                label="12.1 Behandletdato"
                value={schema.behandletDato ? schema.behandletDato : undefined}
                onChange={(newDates) => {
                    setSchema(
                        (state): SchemaType => {
                            const updatedSchema = { ...state, behandletDato: newDates };
                            validate('behandletDato', updatedSchema);
                            return updatedSchema;
                        },
                    );
                }}
                feil={errors.behandletDato}
            />
            <Row>
                <Input
                    id="sykmeldersFornavn"
                    className="form-margin-bottom"
                    value={schema.sykmeldersFornavn ? schema.sykmeldersFornavn : undefined}
                    onChange={({ target: { value } }) => {
                        setSchema(
                            (state): SchemaType => {
                                const updatedSchema = {
                                    ...state,
                                    sykmeldersFornavn: value,
                                };
                                validate('sykmeldersFornavn', updatedSchema);
                                return updatedSchema;
                            },
                        );
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
                            (state): SchemaType => {
                                const updatedSchema = {
                                    ...state,
                                    sykmeldersEtternavn: value,
                                };
                                validate('sykmeldersEtternavn', updatedSchema);
                                return updatedSchema;
                            },
                        );
                    }}
                    feil={errors.sykmeldersEtternavn}
                    label={<Element>12.2.2 Sykmelders etternavn</Element>}
                />
            </Row>
            <Row>
                <Input
                    id="hpr"
                    className="form-margin-bottom"
                    value={schema.hpr ? schema.hpr : undefined}
                    onChange={({ target: { value } }) => {
                        setSchema(
                            (state): SchemaType => {
                                const updatedSchema = {
                                    ...state,
                                    hpr: value,
                                };
                                validate('hpr', updatedSchema);
                                return updatedSchema;
                            },
                        );
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
                            (state): SchemaType => {
                                const updatedSchema = {
                                    ...state,
                                    sykmelderTelefon: value,
                                };
                                validate('sykmelderTelefon', updatedSchema);
                                return updatedSchema;
                            },
                        );
                    }}
                    feil={errors.sykmelderTelefon}
                    label={<Element>12.5 Telefon</Element>}
                />
            </Row>

            <Subsection sectionIdentifier="12.6 Adresse" underline={false}>
                <Input
                    id="sykmelderGate"
                    className="form-margin-bottom"
                    value={schema.sykmelderGate ? schema.sykmelderGate : undefined}
                    onChange={({ target: { value } }) => {
                        setSchema(
                            (state): SchemaType => {
                                const updatedSchema = {
                                    ...state,
                                    sykmelderGate: value,
                                };
                                validate('sykmelderGate', updatedSchema);
                                return updatedSchema;
                            },
                        );
                    }}
                    feil={errors.sykmelderGate}
                    label={<Element>Gate</Element>}
                />
                <Row>
                    <Input
                        id="sykmelderPostnummer"
                        className="form-margin-bottom"
                        type="number"
                        value={schema.sykmelderPostnummer ? schema.sykmelderPostnummer : undefined}
                        onChange={({ target: { value } }) => {
                            setSchema(
                                (state): SchemaType => {
                                    const updatedSchema = {
                                        ...state,
                                        sykmelderPostnummer: Number(value),
                                    };
                                    validate('sykmelderPostnummer', updatedSchema);
                                    return updatedSchema;
                                },
                            );
                        }}
                        feil={errors.sykmelderPostnummer}
                        label={<Element>Postnummer</Element>}
                    />
                    <Input
                        id="sykmelderKommune"
                        className="form-margin-bottom"
                        value={schema.sykmelderKommune ? schema.sykmelderKommune : undefined}
                        onChange={({ target: { value } }) => {
                            setSchema(
                                (state): SchemaType => {
                                    const updatedSchema = {
                                        ...state,
                                        sykmelderKommune: value,
                                    };
                                    validate('sykmelderKommune', updatedSchema);
                                    return updatedSchema;
                                },
                            );
                        }}
                        feil={errors.sykmelderKommune}
                        label={<Element>Kommune</Element>}
                    />
                </Row>
                <Row>
                    <Input
                        id="sykmelderPostboks"
                        className="form-margin-bottom"
                        value={schema.sykmelderPostboks ? schema.sykmelderPostboks : undefined}
                        onChange={({ target: { value } }) => {
                            setSchema(
                                (state): SchemaType => {
                                    const updatedSchema = {
                                        ...state,
                                        sykmelderPostboks: value,
                                    };
                                    validate('sykmelderPostboks', updatedSchema);
                                    return updatedSchema;
                                },
                            );
                        }}
                        feil={errors.sykmelderPostboks}
                        label={<Element>Postboks</Element>}
                    />
                    <Input
                        id="sykmelderLand"
                        className="form-margin-bottom"
                        value={schema.sykmelderLand ? schema.sykmelderLand : undefined}
                        onChange={({ target: { value } }) => {
                            setSchema(
                                (state): SchemaType => {
                                    const updatedSchema = {
                                        ...state,
                                        sykmelderLand: value,
                                    };
                                    validate('sykmelderLand', updatedSchema);
                                    return updatedSchema;
                                },
                            );
                        }}
                        feil={errors.sykmelderLand}
                        label={<Element>Land</Element>}
                    />
                </Row>
            </Subsection>
        </SectionContainer>
    );
};

export default BekreftelseSection;
