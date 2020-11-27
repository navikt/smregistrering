import './MulighetForArbeidSection.less';

import React from 'react';
import { Element } from 'nav-frontend-typografi';
import { FeiloppsummeringFeil, Textarea } from 'nav-frontend-skjema';

import RangePicker from '../../formComponents/RangePicker';
import { MFAOptions, MulighetForArbeidTypes } from './MulighetForArbeidSection';
import { FormType } from '../../../Form';

export type AvventendeMFA = {
    type: MFAOptions;
    // Perioder for avventende sykmelding
    avventendePeriode?: Date[];
    avventendeInnspillTilArbeidsgiver?: string;
};

type AvventendeArsakProps = {
    mulighetForArbeid: AvventendeMFA;
    updateMfa: (mfa: MulighetForArbeidTypes) => void;
    errors: Map<keyof FormType, FeiloppsummeringFeil>;
};

const AvventendeArsak = ({ updateMfa, mulighetForArbeid, errors }: AvventendeArsakProps) => {
    return (
        <div className="mulighetForArbeid__subsection-container">
            <RangePicker
                id="avventendePeriode"
                labelFrom="4.1.1 f.o.m."
                labelTo="4.1.2 t.o.m."
                value={mulighetForArbeid.avventendePeriode || []}
                onChange={(newDates) => {
                    const updatedSchema = {
                        ...mulighetForArbeid,
                        avventendePeriode: newDates,
                    };

                    updateMfa(updatedSchema);
                }}
                feil={undefined /* // TODO: errors.avventendePeriode */}
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
                feil={undefined /* // TODO: errors.avventendeInnspillTilArbeidsgiver */}
                label={<Element>4.1.3 Andre innspill til arbeidsgiver</Element>}
            />
        </div>
    );
};

export default AvventendeArsak;
