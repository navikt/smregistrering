import './MulighetForArbeidSection.less';

import React from 'react';
import { Checkbox, Input } from 'nav-frontend-skjema';
import { Element } from 'nav-frontend-typografi';

import ArbeidsrelatertArsak from './ArbeidsrelatertArsak';
import ExpandableField from '../../formComponents/ExpandableField';
import MedisinskArsak from './MedisinskArsak';
import RangePicker from '../../formComponents/RangePicker';
import { ArbeidsrelatertArsakType, MedisinskArsakType } from '../../../../../types/RegistrertSykmelding';
import { ErrorSchemaType } from '../../../Form';
import { MFAOptions, MulighetForArbeidTypes } from './MulighetForArbeidSection';

export type FullSykmeldingMFA = {
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

type FullSykmeldingProps = {
    mulighetForArbeid: FullSykmeldingMFA;
    updateMfa: (mfa: MulighetForArbeidTypes) => void;
    errors: ErrorSchemaType;
};

const FullSykmelding = ({ updateMfa, mulighetForArbeid, errors }: FullSykmeldingProps) => {
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
                feil={undefined /* // TODO: errors.aktivitetIkkeMuligPeriode */}
            />
            <Element className="form-label">4.3.3</Element>
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
                feil={undefined /* // TODO: errors.aktivitetIkkeMuligMedisinskArsak */}
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

                            // TODO: validate('aktivitetIkkeMuligMedisinskArsakBeskrivelse', updatedSchema);

                            updateMfa(updatedSchema);
                        }}
                        label={<Element>Beskrivelse</Element>}
                        feil={undefined /* // TODO: errors.aktivitetIkkeMuligMedisinskArsakBeskrivelse */}
                    />
                </>
            </ExpandableField>
            <Element className="form-label">4.3.4</Element>
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
                feil={undefined /* // TODO: errors.aktivitetIkkeMuligArbeidsrelatertArsak */}
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
                        feil={undefined /* // TODO: errors.aktivitetIkkeMuligArbeidsrelatertArsakBeskrivelse */}
                    />
                </>
            </ExpandableField>
        </div>
    );
};

export default FullSykmelding;
