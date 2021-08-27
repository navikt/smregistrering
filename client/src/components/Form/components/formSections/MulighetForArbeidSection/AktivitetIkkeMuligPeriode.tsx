import './MulighetForArbeidSection.less';

import React from 'react';
import { Checkbox, FeiloppsummeringFeil, Input } from 'nav-frontend-skjema';
import { Element } from 'nav-frontend-typografi';

import ArbeidsrelatertArsak from './ArbeidsrelatertArsak';
import ExpandableField from '../../formComponents/ExpandableField';
import MedisinskArsak from './MedisinskArsak';
import RangePicker from '../../formComponents/RangePicker';
import { ArbeidsrelatertArsakType, MedisinskArsakType } from '../../../../../types/sykmelding/Periode';
import { FormType } from '../../../Form';
import { MFAOptions, MulighetForArbeidTypes } from './MulighetForArbeidSection';

export type AktivitetIkkeMuligPeriodeMFA = {
    type: MFAOptions;
    // Perioder for full sykmelding
    aktivitetIkkeMuligPeriode: string[] | null;
    aktivitetIkkeMuligMedisinskArsak: boolean;
    aktivitetIkkeMuligMedisinskArsakType: MedisinskArsakType[];
    aktivitetIkkeMuligMedisinskArsakBeskrivelse: string | null;
    aktivitetIkkeMuligArbeidsrelatertArsak: boolean;
    aktivitetIkkeMuligArbeidsrelatertArsakType: ArbeidsrelatertArsakType[];
    aktivitetIkkeMuligArbeidsrelatertArsakBeskrivelse: string | null;
};

type AktivitetIkkeMuligPeriodeProps = {
    mfaPeriode: AktivitetIkkeMuligPeriodeMFA;
    updateMfa: (mfa: MulighetForArbeidTypes) => void;
    errors: Map<keyof FormType, FeiloppsummeringFeil>;
    index: number;
};

const AktivitetIkkeMuligPeriode = ({ updateMfa, mfaPeriode, errors, index }: AktivitetIkkeMuligPeriodeProps) => {
    return (
        <div className="mulighetForArbeid__subsection-container">
            <RangePicker
                id={`aktivitetIkkeMuligPeriode-${index}`}
                labelFrom="F.o.m"
                labelTo="t.o.m"
                value={mfaPeriode.aktivitetIkkeMuligPeriode || []}
                onChange={(newDates) => {
                    const updatedSchema = {
                        ...mfaPeriode,
                        aktivitetIkkeMuligPeriode: newDates ?? null,
                    };

                    updateMfa(updatedSchema);
                }}
            />
            <Checkbox
                id={`aktivitetIkkeMuligMedisinskArsak-${index}`}
                className="form-margin-bottom"
                checked={!!mfaPeriode.aktivitetIkkeMuligMedisinskArsak}
                label="Det er medisinske årsaker som hindrer arbeidsrelatert aktivitet"
                onChange={() => {
                    const updatedSchema = {
                        ...mfaPeriode,
                        aktivitetIkkeMuligMedisinskArsak: !mfaPeriode.aktivitetIkkeMuligMedisinskArsak,
                        aktivitetIkkeMuligMedisinskArsakType: [],
                        aktivitetIkkeMuligMedisinskArsakBeskrivelse: null,
                    };

                    updateMfa(updatedSchema);
                }}
            />
            <ExpandableField show={!!mfaPeriode.aktivitetIkkeMuligMedisinskArsak}>
                <>
                    <MedisinskArsak mfaPeriode={mfaPeriode} updateMfa={updateMfa} errors={errors} index={index} />
                    <Input
                        id={`aktivitetIkkeMuligMedisinskArsakBeskrivelse-${index}`}
                        className="form-margin-bottom"
                        value={
                            mfaPeriode.aktivitetIkkeMuligMedisinskArsakBeskrivelse
                                ? mfaPeriode.aktivitetIkkeMuligMedisinskArsakBeskrivelse
                                : undefined
                        }
                        type="text"
                        onChange={({ target: { value } }) => {
                            const updatedSchema = {
                                ...mfaPeriode,
                                aktivitetIkkeMuligMedisinskArsakBeskrivelse: value,
                            };

                            updateMfa(updatedSchema);
                        }}
                        label={<Element>Beskrivelse</Element>}
                    />
                </>
            </ExpandableField>
            <Checkbox
                id={`aktivitetIkkeMuligArbeidsrelatertArsak-${index}`}
                className="form-margin-bottom"
                checked={!!mfaPeriode.aktivitetIkkeMuligArbeidsrelatertArsak}
                label="Forhold på arbeidsplassen vanskeliggjør arbeidsrelatert aktivitet"
                onChange={() => {
                    const updatedSchema = {
                        ...mfaPeriode,
                        aktivitetIkkeMuligArbeidsrelatertArsak: !mfaPeriode.aktivitetIkkeMuligArbeidsrelatertArsak,
                        aktivitetIkkeMuligArbeidsrelatertArsakType: [],
                        aktivitetIkkeMuligArbeidsrelatertArsakBeskrivelse: null,
                    };

                    updateMfa(updatedSchema);
                }}
            />
            <ExpandableField show={!!mfaPeriode.aktivitetIkkeMuligArbeidsrelatertArsak}>
                <>
                    <ArbeidsrelatertArsak mfaPeriode={mfaPeriode} updateMfa={updateMfa} errors={errors} index={index} />
                    <Input
                        id={`aktivitetIkkeMuligArbeidsrelatertArsakBeskrivelse-${index}`}
                        className="form-margin-bottom"
                        value={
                            mfaPeriode.aktivitetIkkeMuligArbeidsrelatertArsakBeskrivelse
                                ? mfaPeriode.aktivitetIkkeMuligArbeidsrelatertArsakBeskrivelse
                                : undefined
                        }
                        type="text"
                        onChange={({ target: { value } }) => {
                            const updatedSchema = {
                                ...mfaPeriode,
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
