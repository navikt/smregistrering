import React from 'react';
import { Checkbox, Input } from 'nav-frontend-skjema';
import { Element } from 'nav-frontend-typografi';
import { Knapp } from 'nav-frontend-knapper';

import ExpandableField from '../../formComponents/ExpandableField';
import Plus from '../../../../../svg/Plus';
import RangePicker from '../../formComponents/RangePicker';
import Subsection from '../../formComponents/Subsection';
import { ErrorSchemaType, SchemaType } from '../../../Form';
import { Validate } from '../../../validation';

type GradertSykmeldingGroupProps = {
    schema: SchemaType;
    setSchema: (value: React.SetStateAction<SchemaType>) => void;
    errors: ErrorSchemaType;
    validate: Validate;
};

const GradertSykmeldingGroup = ({ setSchema, schema, errors, validate }: GradertSykmeldingGroupProps) => {
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
                                gradertSykmeldingPerioder: [],
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
                {schema.gradertSykmeldingPerioder.map((periode, index) => (
                    <div key={`gradert-periode-${index}`}>
                        <RangePicker
                            id="gradertPeriode"
                            labelFrom="4.2.1 f.o.m."
                            labelTo="4.2.2 t.o.m."
                            value={periode.gradertPeriode || []}
                            onChange={(newDates) => {
                                setSchema(
                                    (state): SchemaType => {
                                        const updatedPerioder = [
                                            ...state.gradertSykmeldingPerioder.slice(undefined, index),
                                            {
                                                ...state.gradertSykmeldingPerioder[index],
                                                gradertPeriode: newDates,
                                            },
                                            ...state.gradertSykmeldingPerioder.slice(index + 1),
                                        ];
                                        const updatedSchema = {
                                            ...state,
                                            gradertSykmeldingPerioder: updatedPerioder,
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
                                            ...state.gradertSykmeldingPerioder.slice(undefined, index),
                                            {
                                                ...state.gradertSykmeldingPerioder[index],
                                                gradertGrad: parseInt(value),
                                            },
                                            ...state.gradertSykmeldingPerioder.slice(index + 1),
                                        ];
                                        const updatedSchema = {
                                            ...state,
                                            gradertSykmeldingPerioder: updatedPerioder,
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
                                            ...state.gradertSykmeldingPerioder.slice(undefined, index),
                                            {
                                                ...state.gradertSykmeldingPerioder[index],
                                                gradertReisetilskudd: !state.gradertSykmeldingPerioder[index]
                                                    .gradertReisetilskudd,
                                            },
                                            ...state.gradertSykmeldingPerioder.slice(index + 1),
                                        ];
                                        const updatedSchema = {
                                            ...state,
                                            gradertSykmeldingPerioder: updatedPerioder,
                                        };
                                        //validate('gradertReisetilskudd', updatedSchema);
                                        return updatedSchema;
                                    },
                                );
                            }}
                            feil={/*errors.gradertReisetilskudd*/ undefined}
                        />
                    </div>
                ))}
            </ExpandableField>
            <Knapp
                form="kompakt"
                onClick={() => {
                    setSchema(
                        (state): SchemaType => {
                            return {
                                ...state,
                                gradertSykmeldingPerioder: [
                                    ...state.gradertSykmeldingPerioder,
                                    { gradertPeriode: undefined, gradertGrad: undefined, gradertReisetilskudd: false },
                                ],
                            };
                        },
                    );
                }}
            >
                <Plus />
                <span>Legg til periode</span>
            </Knapp>
        </Subsection>
    );
};

export default GradertSykmeldingGroup;
