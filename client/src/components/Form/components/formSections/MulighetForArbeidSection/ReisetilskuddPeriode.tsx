import React from 'react';
import { FeiloppsummeringFeil } from 'nav-frontend-skjema';

import RangePicker from '../../formComponents/RangePicker';
import { FormType } from '../../../Form';
import { MFAOptions, MulighetForArbeidTypes } from './MulighetForArbeidSection';
import dayjs from "dayjs";

export type ReisetilskuddPeriodeMFA = {
    type: MFAOptions;
    // Perioder for sykmelding med reisetilskudd
    reisetilskuddPeriode?: Date[];
};

type ReisetilskuddPeriodeProps = {
    mfaPeriode: ReisetilskuddPeriodeMFA;
    updateMfa: (mfa: MulighetForArbeidTypes) => void;
    errors: Map<keyof FormType, FeiloppsummeringFeil>;
    index: number;
};

const ReisetilskuddPeriode = ({ updateMfa, mfaPeriode, errors, index }: ReisetilskuddPeriodeProps) => {
    return (
        <div className="mulighetForArbeid__subsection-container">
            <RangePicker
                id={`reisetilskuddPeriode-${index}`}
                labelFrom="F.o.m"
                labelTo="t.o.m"
                value={mfaPeriode.reisetilskuddPeriode || []}
                onChange={(newDates) => {
                    const updatedSchema = {
                        ...mfaPeriode,
                        reisetilskuddPeriode: newDates,
                    };

                    updateMfa(updatedSchema);
                }}
            />
            {mfaPeriode.reisetilskuddPeriode != undefined &&
            <div style={{marginTop: '-0.5rem', marginBottom: '2rem'}}>
                Periode valgt: {dayjs(mfaPeriode.reisetilskuddPeriode[0]).format("Do MMMM YYYY")} - {dayjs(mfaPeriode.reisetilskuddPeriode[1]).format("Do MMMM YYYY")}
            </div>
            }
        </div>
    );
};

export default ReisetilskuddPeriode;
