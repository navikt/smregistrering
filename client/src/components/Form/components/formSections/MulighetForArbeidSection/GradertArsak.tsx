import React from 'react';
import { Checkbox, Input } from 'nav-frontend-skjema';

import RangePicker from '../../formComponents/RangePicker';
import { ErrorSchemaType } from '../../../Form';
import { MFAOptions, MulighetForArbeidTypes } from './MulighetForArbeidSection';

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
};

const GradertArsak = ({ updateMfa, mulighetForArbeid, errors }: GradertArsakProps) => {
    return (
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

                    updateMfa(updatedSchema);
                }}
                feil={undefined /* // TODO: errors.gradertGrad */}
                label="4.2.3 Oppgi grad for sykmelding"
            />
            <Checkbox
                id="gradertReisetilskudd"
                checked={mulighetForArbeid.gradertReisetilskudd}
                label="Pasienten kan være delvis i arbeid ved bruk av reisetilskudd"
                onChange={() => {
                    const updatedSchema = {
                        ...mulighetForArbeid,
                        gradertReisetilskudd: !mulighetForArbeid.gradertReisetilskudd,
                    };

                    updateMfa(updatedSchema);
                }}
                feil={undefined /* // TODO: errors.gradertReisetilskudd */}
            />
        </>
    );
};

export default GradertArsak;
