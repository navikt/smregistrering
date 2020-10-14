import React from 'react';
import { Checkbox, Textarea } from 'nav-frontend-skjema';
import { Element } from 'nav-frontend-typografi';

import ExpandableField from '../../formComponents/ExpandableField';
import RangePicker from '../../formComponents/RangePicker';
import Subsection from '../../formComponents/Subsection';
import { ErrorSchemaType, SchemaType } from '../../../Form';
import { Validate } from '../../../validation';

type AvventendeSykmeldingProps = {
    schema: SchemaType;
    setSchema: (value: React.SetStateAction<SchemaType>) => void;
    errors: ErrorSchemaType;
    validate: Validate;
};

const AvventendeSykmelding = ({ setSchema, schema, errors, validate }: AvventendeSykmeldingProps) => {
    return (
        <Subsection sectionIdentifier="4.1">
            <Checkbox
                id="avventendeSykmelding"
                checked={schema.avventendeSykmelding}
                label="Pasienten kan benytte avventende sykmelding"
                onChange={() => {
                    setSchema(
                        (state): SchemaType => {
                            const updatedSchema = {
                                ...state,
                                avventendeSykmelding: !state.avventendeSykmelding,
                                avventendePeriode: undefined,
                                avventendeInnspillTilArbeidsgiver: undefined,
                            };
                            validate('avventendeSykmelding', updatedSchema);
                            validate('avventendePeriode', updatedSchema);
                            validate('avventendeInnspillTilArbeidsgiver', updatedSchema);
                            validate('mulighetForArbeid', updatedSchema);
                            return updatedSchema;
                        },
                    );
                }}
                feil={errors.avventendeSykmelding}
            />
            <br />
            <ExpandableField show={schema.avventendeSykmelding}>
                <>
                    <RangePicker
                        id="avventendePeriode"
                        labelFrom="4.1.1 f.o.m."
                        labelTo="4.1.2 t.o.m."
                        value={schema.avventendePeriode || []}
                        onChange={(newDates) => {
                            setSchema(
                                (state): SchemaType => {
                                    const updatedSchema = {
                                        ...state,
                                        avventendePeriode: newDates,
                                    };
                                    validate('avventendePeriode', updatedSchema);

                                    return updatedSchema;
                                },
                            );
                        }}
                        feil={errors.avventendePeriode}
                    />
                    <Textarea
                        id="avventendeInnspillTilArbeidsgiver"
                        maxLength={0}
                        value={schema.avventendeInnspillTilArbeidsgiver || ''}
                        onChange={({ target: { value } }) => {
                            setSchema(
                                (state): SchemaType => {
                                    const updatedSchema = {
                                        ...state,
                                        avventendeInnspillTilArbeidsgiver: value,
                                    };
                                    validate('avventendeInnspillTilArbeidsgiver', updatedSchema);
                                    return updatedSchema;
                                },
                            );
                        }}
                        feil={errors.avventendeInnspillTilArbeidsgiver}
                        label={<Element>4.1.3 Innspill til arbeidsgiver om tilrettelegging</Element>}
                    />
                </>
            </ExpandableField>
        </Subsection>
    );
};

export default AvventendeSykmelding;
