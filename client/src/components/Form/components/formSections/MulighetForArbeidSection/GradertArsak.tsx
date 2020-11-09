import React from 'react';
import { Input } from 'nav-frontend-skjema';

import ExpandableField from '../../formComponents/ExpandableField';
import RangePicker from '../../formComponents/RangePicker';
import { ErrorSchemaType } from '../../../Form';
import { MFAOptions, MulighetForArbeidTypes } from './MulighetForArbeidSection';
import { Validate } from '../../../validation';

export type GradertMFA = {
    type: MFAOptions;
    // Perioder for gradert sykmelding
    gradertPeriode?: Date[];
    gradertGrad?: number;
    gradertReisetilskudd: boolean;
};

type GradertArsakProps = {
    mulighetForArbeid: GradertMFA;
    updateMfa: (mfa: MulighetForArbeidTypes) => void;
    errors: ErrorSchemaType;
    validate: Validate;
};

const GradertArsak = ({ updateMfa, mulighetForArbeid, errors, validate }: GradertArsakProps) => {
    return (
        <ExpandableField show>
            <>
                <RangePicker
                    id="gradertPeriode"
                    labelFrom="4.2.1 f.o.m."
                    labelTo="4.2.2 t.o.m."
                    value={mulighetForArbeid.gradertPeriode || []}
                    onChange={(newDates) => {
                        const updatedSchema = {
                            ...mulighetForArbeid,
                            gradertPeriode: newDates,
                        };

                        // TODO: validate('gradertPeriode', updatedSchema);
                        updateMfa(updatedSchema);
                    }}
                    feil={undefined /* // TODO: errors.gradertPeriode */}
                />
                <Input
                    id="gradertGrad"
                    className="form-margin-bottom half"
                    type="number"
                    value={mulighetForArbeid.gradertGrad}
                    onChange={({ target: { value } }) => {
                        const updatedSchema = {
                            ...mulighetForArbeid,
                            gradertGrad: parseInt(value),
                        };

                        // TODO: validate('gradertGrad', updatedSchema);
                        updateMfa(updatedSchema);
                    }}
                    feil={undefined /* // TODO: errors.gradertGrad */}
                    label="4.2.3 Oppgi grad for sykmelding"
                />
            </>
        </ExpandableField>
    );
};

export default GradertArsak;
