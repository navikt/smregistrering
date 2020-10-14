import React from 'react';
import { Checkbox, Input } from 'nav-frontend-skjema';
import { Element } from 'nav-frontend-typografi';

import ExpandableField from '../../formComponents/ExpandableField';
import RangePicker from '../../formComponents/RangePicker';
import Subsection from '../../formComponents/Subsection';
import { ErrorSchemaType, SchemaType } from '../../../Form';
import { Validate } from '../../../validation';

type GradertSykmeldingProps = {
    schema: SchemaType;
    setSchema: (value: React.SetStateAction<SchemaType>) => void;
    errors: ErrorSchemaType;
    validate: Validate;
};

const GradertSykmelding = ({ setSchema, schema, errors, validate }: GradertSykmeldingProps) => {
    return (
        <Subsection sectionIdentifier="4.2">
            <Checkbox
                id="gradertSykmelding"
                checked={schema.gradertSykmelding}
                label="Pasienten kan være delvis i arbeid (gradert sykmelding)"
                onChange={() => {
                    setSchema(
                        (state): SchemaType => {
                            const updatedSchema = {
                                ...state,
                                gradertSykmelding: !state.gradertSykmelding,
                                gradertPeriode: undefined,
                                gradertGrad: undefined,
                            };
                            validate('gradertSykmelding', updatedSchema);
                            validate('gradertPeriode', updatedSchema);
                            validate('gradertGrad', updatedSchema);
                            validate('mulighetForArbeid', updatedSchema);
                            return updatedSchema;
                        },
                    );
                }}
                feil={errors.gradertSykmelding}
            />
            <br />
            <ExpandableField show={schema.gradertSykmelding}>
                <>
                    <RangePicker
                        id="gradertPeriode"
                        labelFrom="4.2.1 f.o.m."
                        labelTo="4.2.2 t.o.m."
                        value={schema.gradertPeriode || []}
                        onChange={(newDates) => {
                            setSchema(
                                (state): SchemaType => {
                                    const updatedSchema = {
                                        ...state,
                                        gradertPeriode: newDates,
                                    };
                                    validate('gradertPeriode', updatedSchema);

                                    return updatedSchema;
                                },
                            );
                        }}
                        feil={errors.gradertPeriode}
                    />
                    <Input
                        id="gradertGrad"
                        className="form-margin-bottom half"
                        type="number"
                        value={schema.gradertGrad}
                        onChange={({ target: { value } }) => {
                            setSchema(
                                (state): SchemaType => {
                                    const updatedSchema = {
                                        ...state,
                                        gradertGrad: parseInt(value),
                                    };
                                    validate('gradertGrad', updatedSchema);
                                    return updatedSchema;
                                },
                            );
                        }}
                        feil={errors.gradertGrad}
                        label="4.2.3 Oppgi grad for sykmelding"
                    />
                </>
            </ExpandableField>
            <Element className="form-label">4.2.4</Element>
            <Checkbox
                id="gradertReisetilskudd"
                checked={schema.gradertReisetilskudd}
                label="Pasienten kan være delvis i arbeid ved bruk av reisetilskudd"
                onChange={() => {
                    setSchema(
                        (state): SchemaType => {
                            const updatedSchema = {
                                ...state,
                                gradertReisetilskudd: !state.gradertReisetilskudd,
                            };
                            validate('gradertReisetilskudd', updatedSchema);
                            return updatedSchema;
                        },
                    );
                }}
                feil={errors.gradertReisetilskudd}
            />
        </Subsection>
    );
};

export default GradertSykmelding;
