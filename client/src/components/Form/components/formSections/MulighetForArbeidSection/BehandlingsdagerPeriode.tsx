import './MulighetForArbeidSection.less';

import React from 'react';
import { Element } from 'nav-frontend-typografi';
import { FeiloppsummeringFeil, Input } from 'nav-frontend-skjema';

import RangePicker from '../../formComponents/RangePicker';
import { FormType } from '../../../Form';

import { MFAOptions, MulighetForArbeidTypes } from './MulighetForArbeidSection';

export type BehandlingsdagerPeriodeMFA = {
    type: MFAOptions;
    // Perioder for sykmelding for behandlignsdager
    behandlingsdagerPeriode: string[] | null;
    behandlingsdagerAntall: number | null;
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
                        behandlingsdagerPeriode: newDates ?? null,
                    };

                    updateMfa(updatedSchema);
                }}
            />

            <Input
                id={`behandlingsdagerAntall-${index}`}
                className="form-margin-bottom half"
                type="number"
                value={mfaPeriode.behandlingsdagerAntall ?? undefined}
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
