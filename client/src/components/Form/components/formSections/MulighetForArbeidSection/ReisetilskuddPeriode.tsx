import React from 'react';
import { FeiloppsummeringFeil } from 'nav-frontend-skjema';

import RangePicker from '../../formComponents/RangePicker';
import { FormType } from '../../../Form';
import { MFAOptions, MulighetForArbeidTypes } from './MulighetForArbeidSection';

export type ReisetilskuddPeriodeMFA = {
    type: MFAOptions;
    // Perioder for sykmelding med reisetilskudd
    reisetilskuddPeriode?: Date[];
};

type ReisetilskuddPeriodeProps = {
    mulighetForArbeid: ReisetilskuddPeriodeMFA;
    updateMfa: (mfa: MulighetForArbeidTypes) => void;
    errors: Map<keyof FormType, FeiloppsummeringFeil>;
};

const ReisetilskuddPeriode = ({ updateMfa, mulighetForArbeid, errors }: ReisetilskuddPeriodeProps) => {
    return (
        <RangePicker
            id="reisetilskuddPeriode"
            labelFrom="F.o.m"
            labelTo="t.o.m"
            value={mulighetForArbeid.reisetilskuddPeriode || []}
            onChange={(newDates) => {
                const updatedSchema = {
                    ...mulighetForArbeid,
                    reisetilskuddPeriode: newDates,
                };

                updateMfa(updatedSchema);
            }}
        />
    );
};

export default ReisetilskuddPeriode;
