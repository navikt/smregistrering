import './MulighetForArbeidSection.less';

import React from 'react';
import { Checkbox, FeiloppsummeringFeil, Input } from 'nav-frontend-skjema';
import { Element } from 'nav-frontend-typografi';

import ArbeidsrelatertArsak from './ArbeidsrelatertArsak';
import ExpandableField from '../../formComponents/ExpandableField';
import MedisinskArsak from './MedisinskArsak';
import RangePicker from '../../formComponents/RangePicker';
import { ArbeidsrelatertArsakType, MedisinskArsakType } from '../../../../../types/RegistrertSykmelding';
import { FormType } from '../../../Form';
import { MFAOptions, MulighetForArbeidTypes } from './MulighetForArbeidSection';

export type AktivitetIkkeMuligPeriodeMFA = {
    type: MFAOptions;
    // Perioder for full sykmelding
    aktivitetIkkeMuligPeriode?: Date[];
    aktivitetIkkeMuligMedisinskArsak?: boolean;
    aktivitetIkkeMuligMedisinskArsakType?: (keyof typeof MedisinskArsakType)[];
    aktivitetIkkeMuligMedisinskArsakBeskrivelse?: string | null;
    aktivitetIkkeMuligArbeidsrelatertArsak?: boolean;
    aktivitetIkkeMuligArbeidsrelatertArsakType?: (keyof typeof ArbeidsrelatertArsakType)[];
    aktivitetIkkeMuligArbeidsrelatertArsakBeskrivelse?: string | null;
};

type AktivitetIkkeMuligPeriodeProps = {
    mulighetForArbeid: AktivitetIkkeMuligPeriodeMFA;
    updateMfa: (mfa: MulighetForArbeidTypes) => void;
    errors: Map<keyof FormType, FeiloppsummeringFeil>;
};

const AktivitetIkkeMuligPeriode = ({ updateMfa, mulighetForArbeid, errors }: AktivitetIkkeMuligPeriodeProps) => {
    return (
        <div className="mulighetForArbeid__subsection-container">
            <RangePicker
                id="aktivitetIkkeMuligPeriode"
                labelFrom="4.3.1 f.o.m."
                labelTo="4.3.2 t.o.m."
                value={mulighetForArbeid.aktivitetIkkeMuligPeriode || []}
                onChange={(newDates) => {
                    const updatedSchema = {
                        ...mulighetForArbeid,
                        aktivitetIkkeMuligPeriode: newDates,
                    };

                    updateMfa(updatedSchema);
                }}
            />
            <Checkbox
                id="aktivitetIkkeMuligMedisinskArsak"
                className="form-margin-bottom"
                checked={mulighetForArbeid.aktivitetIkkeMuligMedisinskArsak}
                label="Det er medisinske årsaker som hindrer arbeidsrelatert aktivitet"
                onChange={() => {
                    const updatedSchema = {
                        ...mulighetForArbeid,
                        aktivitetIkkeMuligMedisinskArsak: !mulighetForArbeid.aktivitetIkkeMuligMedisinskArsak,
                        aktivitetIkkeMuligMedisinskArsakType: undefined,
                        aktivitetIkkeMuligMedisinskArsakBeskrivelse: undefined,
                    };

                    updateMfa(updatedSchema);
                }}
            />
            <ExpandableField show={mulighetForArbeid.aktivitetIkkeMuligMedisinskArsak}>
                <>
                    <MedisinskArsak mulighetForArbeid={mulighetForArbeid} updateMfa={updateMfa} errors={errors} />
                    <Input
                        id="aktivitetIkkeMuligMedisinskArsakBeskrivelse"
                        className="form-margin-bottom"
                        value={
                            mulighetForArbeid.aktivitetIkkeMuligMedisinskArsakBeskrivelse
                                ? mulighetForArbeid.aktivitetIkkeMuligMedisinskArsakBeskrivelse
                                : undefined
                        }
                        type="text"
                        onChange={({ target: { value } }) => {
                            const updatedSchema = {
                                ...mulighetForArbeid,
                                aktivitetIkkeMuligMedisinskArsakBeskrivelse: value,
                            };

                            updateMfa(updatedSchema);
                        }}
                        label={<Element>Beskrivelse</Element>}
                    />
                </>
            </ExpandableField>
            <Checkbox
                id="aktivitetIkkeMuligArbeidsrelatertArsak"
                className="form-margin-bottom"
                checked={mulighetForArbeid.aktivitetIkkeMuligArbeidsrelatertArsak}
                label="Forhold på arbeidsplassen vanskeliggjør arbeidsrelatert aktivitet"
                onChange={() => {
                    const updatedSchema = {
                        ...mulighetForArbeid,
                        aktivitetIkkeMuligArbeidsrelatertArsak: !mulighetForArbeid.aktivitetIkkeMuligArbeidsrelatertArsak,
                        aktivitetIkkeMuligArbeidsrelatertArsakType: undefined,
                        aktivitetIkkeMuligArbeidsrelatertArsakBeskrivelse: undefined,
                    };

                    updateMfa(updatedSchema);
                }}
            />
            <ExpandableField show={mulighetForArbeid.aktivitetIkkeMuligArbeidsrelatertArsak}>
                <>
                    <ArbeidsrelatertArsak mulighetForArbeid={mulighetForArbeid} updateMfa={updateMfa} errors={errors} />
                    <Input
                        id="aktivitetIkkeMuligArbeidsrelatertArsakBeskrivelse"
                        className="form-margin-bottom"
                        value={
                            mulighetForArbeid.aktivitetIkkeMuligArbeidsrelatertArsakBeskrivelse
                                ? mulighetForArbeid.aktivitetIkkeMuligArbeidsrelatertArsakBeskrivelse
                                : undefined
                        }
                        type="text"
                        onChange={({ target: { value } }) => {
                            const updatedSchema = {
                                ...mulighetForArbeid,
                                aktivitetIkkeMuligArbeidsrelatertArsakBeskrivelse: value,
                            };

                            updateMfa(updatedSchema);
                        }}
                        label={<Element>Beskrivelse</Element>}
                    />
                </>
            </ExpandableField>
        </div>
    );
};

export default AktivitetIkkeMuligPeriode;
