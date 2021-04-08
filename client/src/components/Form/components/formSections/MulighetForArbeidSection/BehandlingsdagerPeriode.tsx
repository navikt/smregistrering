import './MulighetForArbeidSection.less';

import React from 'react';
import { Element } from 'nav-frontend-typografi';
import { FeiloppsummeringFeil, Input } from 'nav-frontend-skjema';

import RangePicker from '../../formComponents/RangePicker';
import { FormType } from '../../../Form';
import { MFAOptions, MulighetForArbeidTypes } from './MulighetForArbeidSection';
import dayjs from "dayjs";

export type BehandlingsdagerPeriodeMFA = {
    type: MFAOptions;
    // Perioder for sykmelding for behandlignsdager
    behandlingsdagerPeriode?: Date[];
    behandlingsdagerAntall?: number;
};

type BehandlingsdagerPeriodeProps = {
    mfaPeriode: BehandlingsdagerPeriodeMFA;
    updateMfa: (mfa: MulighetForArbeidTypes) => void;
    errors: Map<keyof FormType, FeiloppsummeringFeil>;
    index: number;
};

const BehandlingsdagerPeriode = ({ updateMfa, mfaPeriode, errors, index }: BehandlingsdagerPeriodeProps) => {
    return (
        <div className="mulighetForArbeid__subsection-container">
            <RangePicker
                id={`behandlingsdagerPeriode-${index}`}
                labelFrom="F.o.m"
                labelTo="t.o.m"
                value={mfaPeriode.behandlingsdagerPeriode || []}
                onChange={(newDates) => {
                    const updatedSchema = {
                        ...mfaPeriode,
                        behandlingsdagerPeriode: newDates,
                    };

                    updateMfa(updatedSchema);
                }}
            />
            {mfaPeriode.behandlingsdagerPeriode != undefined &&
                <div style={{ marginTop: '-0.5rem', marginBottom: '2rem' }}>
                    Periode valgt: {dayjs(mfaPeriode.behandlingsdagerPeriode[0]).format("Do MMMM YYYY")} - {dayjs(mfaPeriode.behandlingsdagerPeriode[1]).format("Do MMMM YYYY")}
                </div>
            }

            <Input
                id={`behandlingsdagerAntall-${index}`}
                className="form-margin-bottom half"
                type="number"
                value={mfaPeriode.behandlingsdagerAntall}
                onChange={({ target: { value } }) => {
                    const updatedSchema = {
                        ...mfaPeriode,
                        behandlingsdagerAntall: Number(value),
                    };

                    updateMfa(updatedSchema);
                }}
                label={<Element>Oppgi antall dager i perioden</Element>}
            />
        </div>
    );
};

export default BehandlingsdagerPeriode;
