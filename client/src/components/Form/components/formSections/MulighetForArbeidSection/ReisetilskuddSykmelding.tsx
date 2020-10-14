import React from 'react';
import { Checkbox } from 'nav-frontend-skjema';

import ExpandableField from '../../formComponents/ExpandableField';
import RangePicker from '../../formComponents/RangePicker';
import Subsection from '../../formComponents/Subsection';
import { ErrorSchemaType, SchemaType } from '../../../Form';
import { Validate } from '../../../validation';

type ReisetilskuddSykmeldingProps = {
    schema: SchemaType;
    setSchema: (value: React.SetStateAction<SchemaType>) => void;
    errors: ErrorSchemaType;
    validate: Validate;
};

const ReisetilskuddSykmelding = ({ setSchema, schema, errors, validate }: ReisetilskuddSykmeldingProps) => {
    return (
        <Subsection sectionIdentifier="4.5" underline={false}>
            <Checkbox
                id="reisetilskuddSykmelding"
                checked={schema.reisetilskuddSykmelding}
                label="Pasienten kan være i fullt arbeid ved bruk av reisetilskudd"
                onChange={() => {
                    setSchema(
                        (state): SchemaType => {
                            const updatedSchema = {
                                ...state,
                                reisetilskuddSykmelding: !state.reisetilskuddSykmelding,
                                reisetilskuddPeriode: undefined,
                            };
                            validate('reisetilskuddSykmelding', updatedSchema);
                            validate('reisetilskuddPeriode', updatedSchema);
                            validate('mulighetForArbeid', updatedSchema);
                            return updatedSchema;
                        },
                    );
                }}
                feil={errors.reisetilskuddSykmelding}
            />
            <br />
            <ExpandableField show={schema.reisetilskuddSykmelding}>
                <RangePicker
                    id="reisetilskuddPeriode"
                    labelFrom="4.5.1 f.o.m."
                    labelTo="4.5.2 t.o.m."
                    value={schema.reisetilskuddPeriode || []}
                    onChange={(newDates) => {
                        setSchema(
                            (state): SchemaType => {
                                const updatedSchema = {
                                    ...state,
                                    reisetilskuddPeriode: newDates,
                                };
                                validate('reisetilskuddPeriode', updatedSchema);
                                return updatedSchema;
                            },
                        );
                    }}
                    feil={errors.reisetilskuddPeriode}
                />
            </ExpandableField>
        </Subsection>
    );
};

export default ReisetilskuddSykmelding;
