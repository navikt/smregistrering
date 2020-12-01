import './MulighetForArbeidSection.less';

import React from 'react';
import { Element } from 'nav-frontend-typografi';
import { FeiloppsummeringFeil, Textarea } from 'nav-frontend-skjema';

import RangePicker from '../../formComponents/RangePicker';
import { FormType } from '../../../Form';
import { MFAOptions, MulighetForArbeidTypes } from './MulighetForArbeidSection';

export type AvventendePeriodeMFA = {
    type: MFAOptions;
    // Perioder for avventende sykmelding
    avventendePeriode?: Date[];
    avventendeInnspillTilArbeidsgiver?: string;
};

type AvventendePeriodeProps = {
    mulighetForArbeid: AvventendePeriodeMFA;
    updateMfa: (mfa: MulighetForArbeidTypes) => void;
    errors: Map<keyof FormType, FeiloppsummeringFeil>;
};

const AvventendePeriode = ({ updateMfa, mulighetForArbeid, errors }: AvventendePeriodeProps) => {
    return (
        <div className="mulighetForArbeid__subsection-container">
            <RangePicker
                id="avventendePeriode"
                labelFrom="F.o.m"
                labelTo="t.o.m"
                value={mulighetForArbeid.avventendePeriode || []}
                onChange={(newDates) => {
                    const updatedSchema = {
                        ...mulighetForArbeid,
                        avventendePeriode: newDates,
                    };

                    updateMfa(updatedSchema);
                }}
            />
            <Textarea
                id="avventendeInnspillTilArbeidsgiver"
                maxLength={0}
                value={mulighetForArbeid.avventendeInnspillTilArbeidsgiver || ''}
                onChange={({ target: { value } }) => {
                    const updatedSchema = {
                        ...mulighetForArbeid,
                        avventendeInnspillTilArbeidsgiver: value,
                    };

                    updateMfa(updatedSchema);
                }}
                label={<Element>Andre innspill til arbeidsgiver</Element>}
            />
        </div>
    );
};

export default AvventendePeriode;
