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
                                gradertSykmeldingPerioder: undefined,
                            };
                            validate('gradertSykmelding', updatedSchema);
                            //validate('gradertSykmeldingPerioder', updatedSchema);
                            return updatedSchema;
                        },
                    );
                }}
                feil={errors.gradertSykmelding}
            />
            <br />

            <ExpandableField show={schema.gradertSykmelding}>
                {schema.gradertSykeldingPerioder.map((periode, index) => (
                    <>
                        <RangePicker
                            id="gradertPeriode"
                            labelFrom="4.2.1 f.o.m."
                            labelTo="4.2.2 t.o.m."
                            value={periode.gradertPeriode || []}
                            onChange={(newDates) => {
                                setSchema(
                                    (state): SchemaType => {
                                        const updatedPerioder = [
                                            ...state.gradertSykeldingPerioder.slice(undefined, index),
                                            {
                                                ...state.gradertSykeldingPerioder[index],
                                                gradertPeriode: newDates,
                                            },
                                            ...state.gradertSykeldingPerioder.slice(index + 1),
                                        ];
                                        const updatedSchema = {
                                            ...state,
                                            gradertSykeldingPerioder: updatedPerioder,
                                        };
                                        //validate('gradertPeriode', updatedSchema);

                                        return updatedSchema;
                                    },
                                );
                            }}
                            feil={/*errors.gradertPeriode*/ undefined}
                        />
                        <Input
                            id="gradertGrad"
                            className="form-margin-bottom half"
                            type="number"
                            value={periode.gradertGrad}
                            onChange={({ target: { value } }) => {
                                setSchema(
                                    (state): SchemaType => {
                                        const updatedPerioder = [
                                            ...state.gradertSykeldingPerioder.slice(undefined, index),
                                            {
                                                ...state.gradertSykeldingPerioder[index],
                                                gradertGrad: parseInt(value),
                                            },
                                            ...state.gradertSykeldingPerioder.slice(index + 1),
                                        ];
                                        const updatedSchema = {
                                            ...state,
                                            gradertSykeldingPerioder: updatedPerioder,
                                        };
                                        //validate('gradertGrad', updatedSchema);
                                        return updatedSchema;
                                    },
                                );
                            }}
                            feil={/*errors.gradertGrad*/ undefined}
                            label="4.2.3 Oppgi grad for sykmelding"
                        />
                        <Element className="form-label">4.2.4</Element>
                        <Checkbox
                            id="gradertReisetilskudd"
                            checked={periode.gradertReisetilskudd}
                            label="Pasienten kan være delvis i arbeid ved bruk av reisetilskudd"
                            onChange={() => {
                                setSchema(
                                    (state): SchemaType => {
                                        const updatedPerioder = [
                                            ...state.gradertSykeldingPerioder.slice(undefined, index),
                                            {
                                                ...state.gradertSykeldingPerioder[index],
                                                gradertReisetilskudd: !state.gradertSykeldingPerioder[index]
                                                    .gradertReisetilskudd,
                                            },
                                            ...state.gradertSykeldingPerioder.slice(index + 1),
                                        ];
                                        const updatedSchema = {
                                            ...state,
                                            gradertSykeldingPerioder: updatedPerioder,
                                        };
                                        //validate('gradertReisetilskudd', updatedSchema);
                                        return updatedSchema;
                                    },
                                );
                            }}
                            feil={/*errors.gradertReisetilskudd*/ undefined}
                        />
                    </>
                ))}
            </ExpandableField>
        </Subsection>
    );
};

export default GradertSykmelding;
