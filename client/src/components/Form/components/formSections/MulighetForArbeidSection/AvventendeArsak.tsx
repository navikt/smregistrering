import React from 'react';
import { Element } from 'nav-frontend-typografi';
import { Textarea } from 'nav-frontend-skjema';

import RangePicker from '../../formComponents/RangePicker';
import { ErrorSchemaType } from '../../../Form';
import { MFAOptions, MulighetForArbeidTypes } from './MulighetForArbeidSection';
import { Validate } from '../../../validation';

export type AvventendeMFA = {
    type: MFAOptions;
    // Perioder for avventende sykmelding
    avventendePeriode?: Date[];
    avventendeInnspillTilArbeidsgiver?: string;
};

type AvventendeArsakProps = {
    mulighetForArbeid: AvventendeMFA;
    updateMfa: (mfa: MulighetForArbeidTypes) => void;
    errors: ErrorSchemaType;
    validate: Validate;
};

const AvventendeArsak = ({ updateMfa, mulighetForArbeid, errors, validate }: AvventendeArsakProps) => {
    return (
        <>
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
                    // TODO: validate('avventendePeriode', updatedSchema);

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
                    // TODO: validate('avventendeInnspillTilArbeidsgiver', updatedSchema);

                    updateMfa(updatedSchema);
                }}
                feil={undefined /* // TODO: errors.avventendeInnspillTilArbeidsgiver */}
                label={<Element>4.1.3 Innspill til arbeidsgiver om tilrettelegging</Element>}
            />
        </>
    );
};

export default AvventendeArsak;
