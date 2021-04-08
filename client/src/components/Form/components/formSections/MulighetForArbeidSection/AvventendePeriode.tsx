import './MulighetForArbeidSection.less';

import React from 'react';
import { Element } from 'nav-frontend-typografi';
import { FeiloppsummeringFeil, Textarea } from 'nav-frontend-skjema';

import RangePicker from '../../formComponents/RangePicker';
import { FormType } from '../../../Form';
import { MFAOptions, MulighetForArbeidTypes } from './MulighetForArbeidSection';
import dayjs from "dayjs";

export type AvventendePeriodeMFA = {
    type: MFAOptions;
    // Perioder for avventende sykmelding
    avventendePeriode?: Date[];
    avventendeInnspillTilArbeidsgiver?: string;
};

type AvventendePeriodeProps = {
    mfaPeriode: AvventendePeriodeMFA;
    updateMfa: (mfa: MulighetForArbeidTypes) => void;
    errors: Map<keyof FormType, FeiloppsummeringFeil>;
    index: number;
};

const AvventendePeriode = ({ updateMfa, mfaPeriode, errors, index }: AvventendePeriodeProps) => {
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
                        avventendePeriode: newDates,
                    };

                    updateMfa(updatedSchema);
                }}
            />
            {mfaPeriode.avventendePeriode != undefined &&
                <div style={{ marginTop: '-0.5rem', marginBottom: '2rem' }}>
                    Periode valgt: {dayjs(mfaPeriode.avventendePeriode[0]).format("Do MMMM YYYY")} - {dayjs(mfaPeriode.avventendePeriode[1]).format("Do MMMM YYYY")}
                </div>
            }
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
