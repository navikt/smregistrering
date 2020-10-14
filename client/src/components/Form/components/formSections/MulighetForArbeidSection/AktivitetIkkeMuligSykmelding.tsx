import React from 'react';
import { Checkbox, Input } from 'nav-frontend-skjema';
import { Element } from 'nav-frontend-typografi';

import ArbeidsrelatertArsak from './ArbeidsrelatertArsak';
import ExpandableField from '../../formComponents/ExpandableField';
import MedisinskArsak from './MedisinskArsak';
import RangePicker from '../../formComponents/RangePicker';
import Subsection from '../../formComponents/Subsection';
import { ErrorSchemaType, SchemaType } from '../../../Form';
import { Validate } from '../../../validation';

type AktivitetIkkeMuligSykmeldingProps = {
    schema: SchemaType;
    setSchema: (value: React.SetStateAction<SchemaType>) => void;
    errors: ErrorSchemaType;
    validate: Validate;
};

const AktivitetIkkeMuligSykmelding = ({ setSchema, schema, errors, validate }: AktivitetIkkeMuligSykmeldingProps) => {
    return (
        <Subsection sectionIdentifier="4.3">
            <Checkbox
                id="aktivitetIkkeMuligSykmelding"
                checked={schema.aktivitetIkkeMuligSykmelding}
                label="Pasienten kan ikke være i arbeid (100 prosent sykmelding)"
                onChange={() => {
                    setSchema(
                        (state): SchemaType => {
                            const updatedSchema = {
                                ...state,
                                aktivitetIkkeMuligSykmelding: !state.aktivitetIkkeMuligSykmelding,
                                aktivitetIkkeMuligPeriode: undefined,
                                aktivitetIkkeMuligMedisinskArsak: undefined,
                                aktivitetIkkeMuligMedisinskArsakType: undefined,
                                aktivitetIkkeMuligMedisinskArsakBeskrivelse: undefined,
                                aktivitetIkkeMuligArbeidsrelatertArsak: undefined,
                                aktivitetIkkeMuligArbeidsrelatertArsakType: undefined,
                                aktivitetIkkeMuligArbeidsrelatertArsakBeskrivelse: undefined,
                            };
                            validate('aktivitetIkkeMuligSykmelding', updatedSchema);
                            validate('aktivitetIkkeMuligPeriode', updatedSchema);
                            validate('aktivitetIkkeMuligMedisinskArsak', updatedSchema);
                            validate('aktivitetIkkeMuligMedisinskArsakType', updatedSchema);
                            validate('aktivitetIkkeMuligMedisinskArsakBeskrivelse', updatedSchema);
                            validate('aktivitetIkkeMuligArbeidsrelatertArsak', updatedSchema);
                            validate('aktivitetIkkeMuligArbeidsrelatertArsakType', updatedSchema);
                            validate('aktivitetIkkeMuligArbeidsrelatertArsakBeskrivelse', updatedSchema);
                            validate('mulighetForArbeid', updatedSchema);
                            return updatedSchema;
                        },
                    );
                }}
                feil={errors.aktivitetIkkeMuligSykmelding}
            />
            <br />
            <ExpandableField show={schema.aktivitetIkkeMuligSykmelding}>
                <>
                    <RangePicker
                        id="aktivitetIkkeMuligPeriode"
                        labelFrom="4.3.1 f.o.m."
                        labelTo="4.3.2 t.o.m."
                        value={schema.aktivitetIkkeMuligPeriode || []}
                        onChange={(newDates) => {
                            setSchema(
                                (state): SchemaType => {
                                    const updatedSchema = {
                                        ...state,
                                        aktivitetIkkeMuligPeriode: newDates,
                                    };
                                    validate('aktivitetIkkeMuligPeriode', updatedSchema);

                                    return updatedSchema;
                                },
                            );
                        }}
                        feil={errors.aktivitetIkkeMuligPeriode}
                    />
                    <Element className="form-label">4.3.3</Element>
                    <Checkbox
                        id="aktivitetIkkeMuligMedisinskArsak"
                        className="form-margin-bottom"
                        checked={schema.aktivitetIkkeMuligMedisinskArsak}
                        label="Det er medisinske årsaker som hindrer arbeidsrelatert aktivitet"
                        onChange={() =>
                            setSchema(
                                (state): SchemaType => {
                                    const updatedSchema = {
                                        ...state,
                                        aktivitetIkkeMuligMedisinskArsak: !state.aktivitetIkkeMuligMedisinskArsak,
                                        aktivitetIkkeMuligMedisinskArsakType: undefined,
                                        aktivitetIkkeMuligMedisinskArsakBeskrivelse: undefined,
                                    };
                                    validate('aktivitetIkkeMuligMedisinskArsak', updatedSchema);
                                    validate('aktivitetIkkeMuligMedisinskArsakType', updatedSchema);
                                    validate('aktivitetIkkeMuligMedisinskArsakBeskrivelse', updatedSchema);
                                    return updatedSchema;
                                },
                            )
                        }
                        feil={errors.aktivitetIkkeMuligMedisinskArsak}
                    />
                    <ExpandableField show={schema.aktivitetIkkeMuligMedisinskArsak}>
                        <>
                            <MedisinskArsak schema={schema} setSchema={setSchema} errors={errors} validate={validate} />
                            <Input
                                id="aktivitetIkkeMuligMedisinskArsakBeskrivelse"
                                className="form-margin-bottom"
                                value={
                                    schema.aktivitetIkkeMuligMedisinskArsakBeskrivelse
                                        ? schema.aktivitetIkkeMuligMedisinskArsakBeskrivelse
                                        : undefined
                                }
                                type="text"
                                onChange={({ target: { value } }) => {
                                    setSchema(
                                        (state): SchemaType => {
                                            const updatedSchema = {
                                                ...state,
                                                aktivitetIkkeMuligMedisinskArsakBeskrivelse: value,
                                            };
                                            validate('aktivitetIkkeMuligMedisinskArsakBeskrivelse', updatedSchema);
                                            return updatedSchema;
                                        },
                                    );
                                }}
                                label={<Element>Beskrivelse</Element>}
                                feil={errors.aktivitetIkkeMuligMedisinskArsakBeskrivelse}
                            />
                        </>
                    </ExpandableField>
                    <Element className="form-label">4.3.4</Element>
                    <Checkbox
                        id="aktivitetIkkeMuligArbeidsrelatertArsak"
                        className="form-margin-bottom"
                        checked={schema.aktivitetIkkeMuligArbeidsrelatertArsak}
                        label="Forhold på arbeidsplassen vanskeliggjør arbeidsrelatert aktivitet"
                        onChange={() =>
                            setSchema(
                                (state): SchemaType => ({
                                    ...state,
                                    aktivitetIkkeMuligArbeidsrelatertArsak: !state.aktivitetIkkeMuligArbeidsrelatertArsak,
                                    aktivitetIkkeMuligArbeidsrelatertArsakType: undefined,
                                    aktivitetIkkeMuligArbeidsrelatertArsakBeskrivelse: undefined,
                                }),
                            )
                        }
                        feil={errors.aktivitetIkkeMuligArbeidsrelatertArsak}
                    />
                    <ExpandableField show={schema.aktivitetIkkeMuligArbeidsrelatertArsak}>
                        <>
                            <ArbeidsrelatertArsak
                                schema={schema}
                                setSchema={setSchema}
                                errors={errors}
                                validate={validate}
                            />
                            <Input
                                id="aktivitetIkkeMuligArbeidsrelatertArsakBeskrivelse"
                                className="form-margin-bottom"
                                value={
                                    schema.aktivitetIkkeMuligArbeidsrelatertArsakBeskrivelse
                                        ? schema.aktivitetIkkeMuligArbeidsrelatertArsakBeskrivelse
                                        : undefined
                                }
                                type="text"
                                onChange={({ target: { value } }) => {
                                    setSchema(
                                        (state): SchemaType => {
                                            const updatedSchema = {
                                                ...state,
                                                aktivitetIkkeMuligArbeidsrelatertArsakBeskrivelse: value,
                                            };
                                            validate(
                                                'aktivitetIkkeMuligArbeidsrelatertArsakBeskrivelse',
                                                updatedSchema,
                                            );
                                            return updatedSchema;
                                        },
                                    );
                                }}
                                label={<Element>Beskrivelse</Element>}
                                feil={errors.aktivitetIkkeMuligArbeidsrelatertArsakBeskrivelse}
                            />
                        </>
                    </ExpandableField>
                </>
            </ExpandableField>
        </Subsection>
    );
};

export default AktivitetIkkeMuligSykmelding;
