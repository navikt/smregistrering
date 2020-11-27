import './MulighetForArbeidSection.less';

import React from 'react';
import { Element } from 'nav-frontend-typografi';
import { FeiloppsummeringFeil, Input } from 'nav-frontend-skjema';

import RangePicker from '../../formComponents/RangePicker';
import { MFAOptions, MulighetForArbeidTypes } from './MulighetForArbeidSection';
import { FormType } from '../../../Form';

export type BehandlingsdagerMFA = {
    type: MFAOptions;
    // Perioder for sykmelding for behandlignsdager
    behandlingsdagerPeriode?: Date[];
    behandlingsdagerAntall?: number;
};

type BehandlingsDagerProps = {
    mulighetForArbeid: BehandlingsdagerMFA;
    updateMfa: (mfa: MulighetForArbeidTypes) => void;
    errors: Map<keyof FormType, FeiloppsummeringFeil>;
};

const BehandlingsDager = ({ updateMfa, mulighetForArbeid, errors }: BehandlingsDagerProps) => {
    return (
        <div className="mulighetForArbeid__subsection-container">
            <RangePicker
                id="behandlingsdagerPeriode"
                labelFrom="4.4.1 f.o.m."
                labelTo="4.4.2 t.o.m."
                value={mulighetForArbeid.behandlingsdagerPeriode || []}
                onChange={(newDates) => {
                    const updatedSchema = {
                        ...mulighetForArbeid,
                        behandlingsdagerPeriode: newDates,
                    };

                    updateMfa(updatedSchema);
                }}
                feil={undefined /* // errors.behandlingsdagerPeriode */}
            />

            <Input
                id="behandlingsdagerAntall"
                className="form-margin-bottom half"
                type="number"
                value={mulighetForArbeid.behandlingsdagerAntall}
                onChange={({ target: { value } }) => {
                    const updatedSchema = {
                        ...mulighetForArbeid,
                        behandlingsdagerAntall: Number(value),
                    };

                    updateMfa(updatedSchema);
                }}
                feil={undefined /* // errors.behandlingsdagerAntall */}
                label={<Element>4.4.3 Oppgi antall dager i perioden</Element>}
            />
        </div>
    );
};

export default BehandlingsDager;
