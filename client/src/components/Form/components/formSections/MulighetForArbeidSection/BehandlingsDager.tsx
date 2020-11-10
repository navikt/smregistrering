import React from 'react';
import { Element } from 'nav-frontend-typografi';
import { Input } from 'nav-frontend-skjema';

import RangePicker from '../../formComponents/RangePicker';
import { ErrorSchemaType } from '../../../Form';
import { MFAOptions, MulighetForArbeidTypes } from './MulighetForArbeidSection';
import { Validate } from '../../../validation';

export type BehandlingsdagerMFA = {
    type: MFAOptions;
    // Perioder for sykmelding for behandlignsdager
    behandlingsdagerPeriode?: Date[];
    behandlingsdagerAntall?: number;
};

type BehandlingsDagerProps = {
    mulighetForArbeid: BehandlingsdagerMFA;
    updateMfa: (mfa: MulighetForArbeidTypes) => void;
    errors: ErrorSchemaType;
    validate: Validate;
};

const BehandlingsDager = ({ updateMfa, mulighetForArbeid, errors, validate }: BehandlingsDagerProps) => {
    return (
        <>
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

                    // TODO: validate('behandlingsdagerPeriode', updatedSchema);
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

                    // TODO: validate('behandlingsdagerAntall', updatedSchema);
                    updateMfa(updatedSchema);
                }}
                feil={undefined /* // errors.behandlingsdagerAntall */}
                label={<Element>4.4.3 Oppgi antall dager i perioden</Element>}
            />
        </>
    );
};

export default BehandlingsDager;
