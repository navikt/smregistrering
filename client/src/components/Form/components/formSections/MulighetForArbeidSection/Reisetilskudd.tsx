import React from 'react';

import RangePicker from '../../formComponents/RangePicker';
import { ErrorSchemaType } from '../../../Form';
import { MFAOptions, MulighetForArbeidTypes } from './MulighetForArbeidSection';
import { Validate } from '../../../validation';

export type ReisetilskuddMFA = {
    type: MFAOptions;
    // Perioder for sykmelding med reisetilskudd
    reisetilskuddPeriode?: Date[];
};

type ReisetilskuddProps = {
    mulighetForArbeid: ReisetilskuddMFA;
    updateMfa: (mfa: MulighetForArbeidTypes) => void;
    errors: ErrorSchemaType;
    validate: Validate;
};

const Reisetilskudd = ({ updateMfa, mulighetForArbeid, errors, validate }: ReisetilskuddProps) => {
    return (
        <RangePicker
            id="reisetilskuddPeriode"
            labelFrom="4.5.1 f.o.m."
            labelTo="4.5.2 t.o.m."
            value={mulighetForArbeid.reisetilskuddPeriode || []}
            onChange={(newDates) => {
                const updatedSchema = {
                    ...mulighetForArbeid,
                    reisetilskuddPeriode: newDates,
                };

                // TODO: validate('reisetilskuddPeriode', updatedSchema);
                updateMfa(updatedSchema);
            }}
            feil={undefined /* // TODO: errors.reisetilskuddPeriode */}
        />
    );
};

export default Reisetilskudd;
