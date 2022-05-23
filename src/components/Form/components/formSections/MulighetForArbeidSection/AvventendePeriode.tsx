import React from 'react';
import { Element } from 'nav-frontend-typografi';
import { FeiloppsummeringFeil, Textarea } from 'nav-frontend-skjema';

import RangePicker from '../../formComponents/RangePicker';
import { FormType } from '../../../Form';

import { MFAOptions, MulighetForArbeidTypes } from './MulighetForArbeidSection';

export type AvventendePeriodeMFA = {
    type: MFAOptions;
    // Perioder for avventende sykmelding
    avventendePeriode: string[] | null;
    avventendeInnspillTilArbeidsgiver: string | null;
};

type AvventendePeriodeProps = {
    mfaPeriode: AvventendePeriodeMFA;
    updateMfa: (mfa: MulighetForArbeidTypes) => void;
    errors: Map<keyof FormType, FeiloppsummeringFeil>;
    index: number;
};

const AvventendePeriode = ({ updateMfa, mfaPeriode, index }: AvventendePeriodeProps) => {
    return (
        <div className="mulighetForArbeid__subsection-container">
            <RangePicker
                id={`avventendePeriode-${index}`}
                labelFrom="F.o.m"
                labelTo="t.o.m"
                value={mfaPeriode.avventendePeriode || []}
                onChange={(newDates) => {
                    const updatedSchema = {
                        ...mfaPeriode,
                        avventendePeriode: newDates ?? null,
                    };

                    updateMfa(updatedSchema);
                }}
            />
            <Textarea
                id={`avventendeInnspillTilArbeidsgiver-${index}`}
                maxLength={0}
                value={mfaPeriode.avventendeInnspillTilArbeidsgiver || ''}
                onChange={({ target: { value } }) => {
                    const updatedSchema = {
                        ...mfaPeriode,
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
