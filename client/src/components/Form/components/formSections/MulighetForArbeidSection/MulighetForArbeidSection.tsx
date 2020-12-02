import './MulighetForArbeidSection.less';

import React from 'react';
import { Element } from 'nav-frontend-typografi';
import { FeiloppsummeringFeil, Select } from 'nav-frontend-skjema';
import { Knapp } from 'nav-frontend-knapper';

import ClearButton from '../../formComponents/ClearButton';
import Divider from '../../formComponents/Divider';
import SectionContainer from '../../SectionContainer';
import AktivitetIkkeMuligPeriode, { AktivitetIkkeMuligPeriodeMFA } from './AktivitetIkkeMuligPeriode';
import AvventendePeriode, { AvventendePeriodeMFA } from './AvventendePeriode';
import BehandlingsdagerPeriode, { BehandlingsdagerPeriodeMFA } from './BehandlingsdagerPeriode';
import GradertPeriode, { GradertPeriodeMFA } from './GradertPeriode';
import ReisetilskuddPeriode, { ReisetilskuddPeriodeMFA } from './ReisetilskuddPeriode';
import { FormType } from '../../../Form';
import { Section } from '../../../../../types/Section';

export type MulighetForArbeidTypes =
    | AvventendePeriodeMFA
    | GradertPeriodeMFA
    | AktivitetIkkeMuligPeriodeMFA
    | BehandlingsdagerPeriodeMFA
    | ReisetilskuddPeriodeMFA
    | undefined;

export type MulighetForArbeid = {
    mulighetForArbeid: MulighetForArbeidTypes[];
};

export type MFAOptions = 'velg' | 'avventende' | 'gradert' | 'fullsykmelding' | 'behandlingsdager' | 'reisetilskudd';

const isAvventendePeriode = (periode: MulighetForArbeidTypes): periode is AvventendePeriodeMFA =>
    periode?.type === 'avventende';
const isGradertPeriode = (periode: MulighetForArbeidTypes): periode is GradertPeriodeMFA => periode?.type === 'gradert';
const isAktivitetIkkeMuligPeriode = (periode: MulighetForArbeidTypes): periode is AktivitetIkkeMuligPeriodeMFA =>
    periode?.type === 'fullsykmelding';
const isBehandlingsdagerPeriode = (periode: MulighetForArbeidTypes): periode is BehandlingsdagerPeriodeMFA =>
    periode?.type === 'behandlingsdager';
const isReisetilskuddPeriode = (periode: MulighetForArbeidTypes): periode is ReisetilskuddPeriodeMFA =>
    periode?.type === 'reisetilskudd';

type MulighetForArbeidSectionProps = {
    section: Section;
    formState: FormType;
    errors: Map<keyof FormType, FeiloppsummeringFeil>;
    setFormState: React.Dispatch<React.SetStateAction<FormType>>;
};

const MulighetForArbeidSection = ({ section, setFormState, formState, errors }: MulighetForArbeidSectionProps) => {
    const periodOptions = [
        <option value="velg">Velg periodetype</option>,
        <option value="avventende">4.1 Avventende sykmelding</option>,
        <option value="gradert">4.2 Gradert sykmelding</option>,
        <option value="fullsykmelding">4.3 100% sykmelding</option>,
        <option value="behandlingsdager">4.4 Behandlingsdager</option>,
        <option value="reisetilskudd">4.5 Reisetilskudd</option>,
    ];

    const createEmptyMFA = (type: MFAOptions): MulighetForArbeidTypes => {
        if (type === 'avventende') {
            return {
                type,
                avventendePeriode: undefined,
                avventendeInnspillTilArbeidsgiver: undefined,
            };
        }

        if (type === 'gradert') {
            return { type, gradertPeriode: undefined, gradertGrad: undefined, gradertReisetilskudd: false };
        }

        if (type === 'fullsykmelding') {
            return {
                type,
                aktivitetIkkeMuligPeriode: undefined,
                aktivitetIkkeMuligMedisinskArsak: undefined,
                aktivitetIkkeMuligMedisinskArsakType: undefined,
                aktivitetIkkeMuligMedisinskArsakBeskrivelse: undefined,
                aktivitetIkkeMuligArbeidsrelatertArsak: undefined,
                aktivitetIkkeMuligArbeidsrelatertArsakType: undefined,
                aktivitetIkkeMuligArbeidsrelatertArsakBeskrivelse: undefined,
            };
        }

        if (type === 'behandlingsdager') {
            return { type, behandlingsdagerPeriode: undefined, behandlingsdagerAntall: undefined };
        }

        if (type === 'reisetilskudd') {
            return { type, reisetilskuddPeriode: undefined };
        }

        return undefined;
    };

    const mergeMFAAtIndex = (mfa: MulighetForArbeidTypes, state: FormType, index: number) => {
        return [...state.mulighetForArbeid.slice(0, index), mfa, ...state.mulighetForArbeid.slice(index + 1)];
    };

    const updateSubsectionMFA = (updatedMfa: MulighetForArbeidTypes, index: number) =>
        setFormState(
            (state): FormType => {
                const updatedMulighetForArbeid = mergeMFAAtIndex(updatedMfa, state, index);

                return {
                    ...state,
                    mulighetForArbeid: updatedMulighetForArbeid,
                };
            },
        );

    return (
        <SectionContainer section={section} sectionError={errors.get('mulighetForArbeid')?.feilmelding}>
            <div id="mulighetForArbeid">
                {formState.mulighetForArbeid.length === 0 && (
                    <Select
                        id="mulighetForArbeid-selector"
                        value={undefined}
                        onChange={({ target: { value } }) => {
                            setFormState(
                                (state): FormType => {
                                    const period = createEmptyMFA(value as MFAOptions);

                                    return {
                                        ...state,
                                        mulighetForArbeid: [period],
                                    };
                                },
                            );
                        }}
                        className="form-margin-bottom half"
                        label={<Element>Periodetype</Element>}
                    >
                        {periodOptions}
                    </Select>
                )}

                {formState.mulighetForArbeid.length > 0 &&
                    formState.mulighetForArbeid.map((mfaPeriode, index) => (
                        <div className="mulighetForArbeid__container">
                            <Select
                                style={{ flex: 'auto' }}
                                id={`mulighetForArbeid-selector-${index}`}
                                value={mfaPeriode && mfaPeriode.type}
                                onChange={({ target: { value } }) => {
                                    setFormState(
                                        (state): FormType => {
                                            const mfa = createEmptyMFA(value as MFAOptions);

                                            const updatedMulighetForArbeid = mergeMFAAtIndex(mfa, state, index);

                                            return {
                                                ...state,
                                                mulighetForArbeid: updatedMulighetForArbeid,
                                            };
                                        },
                                    );
                                }}
                                className="form-margin-bottom half"
                                label={<Element>Periodetype</Element>}
                            >
                                {periodOptions}
                            </Select>
                            {isAvventendePeriode(mfaPeriode) && (
                                <AvventendePeriode
                                    updateMfa={(updatedMfa) => updateSubsectionMFA(updatedMfa, index)}
                                    mfaPeriode={mfaPeriode}
                                    errors={errors}
                                    index={index}
                                />
                            )}
                            {isGradertPeriode(mfaPeriode) && (
                                <GradertPeriode
                                    updateMfa={(updatedMfa) => updateSubsectionMFA(updatedMfa, index)}
                                    mfaPeriode={mfaPeriode}
                                    errors={errors}
                                    index={index}
                                />
                            )}
                            {isAktivitetIkkeMuligPeriode(mfaPeriode) && (
                                <AktivitetIkkeMuligPeriode
                                    updateMfa={(updatedMfa) => updateSubsectionMFA(updatedMfa, index)}
                                    mfaPeriode={mfaPeriode}
                                    errors={errors}
                                    index={index}
                                />
                            )}
                            {isBehandlingsdagerPeriode(mfaPeriode) && (
                                <BehandlingsdagerPeriode
                                    updateMfa={(updatedMfa) => updateSubsectionMFA(updatedMfa, index)}
                                    mfaPeriode={mfaPeriode}
                                    errors={errors}
                                    index={index}
                                />
                            )}
                            {isReisetilskuddPeriode(mfaPeriode) && (
                                <ReisetilskuddPeriode
                                    updateMfa={(updatedMfa) => updateSubsectionMFA(updatedMfa, index)}
                                    mfaPeriode={mfaPeriode}
                                    errors={errors}
                                    index={index}
                                />
                            )}
                            <ClearButton
                                iconType="Can"
                                onChange={(event) => {
                                    event.preventDefault();
                                    setFormState((formState) => {
                                        if (!formState.mulighetForArbeid) {
                                            return formState;
                                        }
                                        if (formState.mulighetForArbeid.length === 1) {
                                            return {
                                                ...formState,
                                                mulighetForArbeid: [],
                                            };
                                        }
                                        const mulighetForArbeid = formState.mulighetForArbeid;
                                        const withoutIndex = [
                                            ...mulighetForArbeid.slice(0, index),
                                            ...mulighetForArbeid.slice(index + 1),
                                        ];
                                        return {
                                            ...formState,
                                            mulighetForArbeid: withoutIndex,
                                        };
                                    });
                                }}
                                buttonText="Slett periode"
                            />
                            {index !== formState.mulighetForArbeid.length - 1 && <Divider />}
                        </div>
                    ))}

                <Knapp
                    id="mulighetForArbeid-leggTilPeriode"
                    htmlType="button"
                    form="kompakt"
                    onClick={(event) => {
                        event.preventDefault();
                        setFormState(
                            (state): FormType => {
                                // Since the initial dropdown is not stored in the array, we need to add two undefined objects to the array if no data is currently stored
                                // If there is data in the array, undefined is appended to it.
                                const mulighetForArbeid =
                                    state.mulighetForArbeid.length === 0
                                        ? [undefined, undefined]
                                        : [...state.mulighetForArbeid, undefined];

                                const updatedState = {
                                    ...state,
                                    mulighetForArbeid,
                                };
                                return updatedState;
                            },
                        );
                    }}
                >
                    Legg til periode
                </Knapp>
            </div>
        </SectionContainer>
    );
};

export default MulighetForArbeidSection;
