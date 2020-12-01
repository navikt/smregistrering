import './MulighetForArbeidSection.less';

import React from 'react';
import { Checkbox, FeiloppsummeringFeil, Input } from 'nav-frontend-skjema';

import RangePicker from '../../formComponents/RangePicker';
import { FormType } from '../../../Form';
import { MFAOptions, MulighetForArbeidTypes } from './MulighetForArbeidSection';

export type GradertPeriodeMFA = {
    type: MFAOptions;
    // Perioder for gradert sykmelding
    gradertPeriode?: Date[];
    gradertGrad?: number;
    gradertReisetilskudd: boolean;
};

type GradertPeriodeProps = {
    mulighetForArbeid: GradertPeriodeMFA;
    updateMfa: (mfa: MulighetForArbeidTypes) => void;
    errors: Map<keyof FormType, FeiloppsummeringFeil>;
    index: number;
};

const GradertPeriode = ({ updateMfa, mulighetForArbeid, errors, index }: GradertPeriodeProps) => {
    return (
        <div className="mulighetForArbeid__subsection-container">
            <div className="mulighetForArbeid__gradert-row">
                <Input
                    id="gradertGrad"
                    className="mulighetForArbeid__gradert-row__grad"
                    type="number"
                    value={mulighetForArbeid.gradertGrad}
                    onChange={({ target: { value } }) => {
                        const updatedSchema = {
                            ...mulighetForArbeid,
                            gradertGrad: parseInt(value),
                        };

                        updateMfa(updatedSchema);
                    }}
                    label="Oppgi grad"
                />
                <RangePicker
                    id="gradertPeriode"
                    labelFrom="F.o.m"
                    labelTo="t.o.m"
                    value={mulighetForArbeid.gradertPeriode || []}
                    onChange={(newDates) => {
                        const updatedSchema = {
                            ...mulighetForArbeid,
                            gradertPeriode: newDates,
                        };

                        updateMfa(updatedSchema);
                    }}
                />
            </div>

            <Checkbox
                id={`gradertReisetilskudd-${index}`}
                checked={mulighetForArbeid.gradertReisetilskudd}
                label="Pasienten kan være delvis i arbeid ved bruk av reisetilskudd"
                onChange={() => {
                    const updatedSchema = {
                        ...mulighetForArbeid,
                        gradertReisetilskudd: !mulighetForArbeid.gradertReisetilskudd,
                    };

                    updateMfa(updatedSchema);
                }}
            />
        </div>
    );
};

export default GradertPeriode;
