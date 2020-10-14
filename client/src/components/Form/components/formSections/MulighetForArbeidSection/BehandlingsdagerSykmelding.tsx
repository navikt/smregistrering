import React from 'react';
import { Checkbox, Input } from 'nav-frontend-skjema';
import { Element } from 'nav-frontend-typografi';

import ExpandableField from '../../formComponents/ExpandableField';
import RangePicker from '../../formComponents/RangePicker';
import Subsection from '../../formComponents/Subsection';
import { ErrorSchemaType, SchemaType } from '../../../Form';
import { Validate } from '../../../validation';

type BehandlingsdagerSykmeldingProps = {
    schema: SchemaType;
    setSchema: (value: React.SetStateAction<SchemaType>) => void;
    errors: ErrorSchemaType;
    validate: Validate;
};

const BehandlingsdagerSykmelding = ({ setSchema, schema, errors, validate }: BehandlingsdagerSykmeldingProps) => {
    return (
        <Subsection sectionIdentifier="4.4">
            <Checkbox
                id="behandlingsdagerSykmelding"
                checked={schema.behandlingsdagerSykmelding}
                label="Pasienten kan ikke være i arbeid på behandlingsdager"
                onChange={() => {
                    setSchema(
                        (state): SchemaType => {
                            const updatedSchema = {
                                ...state,
                                behandlingsdagerSykmelding: !state.behandlingsdagerSykmelding,
                                behandlingsdagerPeriode: undefined,
                                behandlingsdagerAntall: undefined,
                            };
                            validate('behandlingsdagerSykmelding', updatedSchema);
                            validate('behandlingsdagerPeriode', updatedSchema);
                            validate('behandlingsdagerAntall', updatedSchema);
                            validate('mulighetForArbeid', updatedSchema);
                            return updatedSchema;
                        },
                    );
                }}
                feil={errors.behandlingsdagerSykmelding}
            />
            <br />
            <ExpandableField show={schema.behandlingsdagerSykmelding}>
                <>
                    <RangePicker
                        id="behandlingsdagerPeriode"
                        labelFrom="4.4.1 f.o.m."
                        labelTo="4.4.2 t.o.m."
                        value={schema.behandlingsdagerPeriode || []}
                        onChange={(newDates) => {
                            setSchema(
                                (state): SchemaType => {
                                    const updatedSchema = {
                                        ...state,
                                        behandlingsdagerPeriode: newDates,
                                    };
                                    validate('behandlingsdagerPeriode', updatedSchema);
                                    return updatedSchema;
                                },
                            );
                        }}
                        feil={errors.behandlingsdagerPeriode}
                    />

                    <Input
                        id="behandlingsdagerAntall"
                        className="form-margin-bottom half"
                        type="number"
                        value={schema.behandlingsdagerAntall}
                        onChange={({ target: { value } }) => {
                            setSchema(
                                (state): SchemaType => {
                                    const updatedSchema = {
                                        ...state,
                                        behandlingsdagerAntall: Number(value),
                                    };
                                    validate('behandlingsdagerAntall', updatedSchema);
                                    return updatedSchema;
                                },
                            );
                        }}
                        feil={errors.behandlingsdagerAntall}
                        label={<Element>4.4.3 Oppgi antall dager i perioden</Element>}
                    />
                </>
            </ExpandableField>
        </Subsection>
    );
};

export default BehandlingsdagerSykmelding;
