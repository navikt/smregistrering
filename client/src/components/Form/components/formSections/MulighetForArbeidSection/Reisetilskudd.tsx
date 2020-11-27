import { FeiloppsummeringFeil } from 'nav-frontend-skjema';
import React from 'react';
import { FormType } from '../../../Form';

import RangePicker from '../../formComponents/RangePicker';
import { MFAOptions, MulighetForArbeidTypes } from './MulighetForArbeidSection';

export type ReisetilskuddMFA = {
    type: MFAOptions;
    // Perioder for sykmelding med reisetilskudd
    reisetilskuddPeriode?: Date[];
};

type ReisetilskuddProps = {
    mulighetForArbeid: ReisetilskuddMFA;
    updateMfa: (mfa: MulighetForArbeidTypes) => void;
    errors: Map<keyof FormType, FeiloppsummeringFeil>;
};

const Reisetilskudd = ({ updateMfa, mulighetForArbeid, errors }: ReisetilskuddProps) => {
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

                updateMfa(updatedSchema);
            }}
            feil={undefined /* // TODO: errors.reisetilskuddPeriode */}
        />
    );
};

export default Reisetilskudd;
