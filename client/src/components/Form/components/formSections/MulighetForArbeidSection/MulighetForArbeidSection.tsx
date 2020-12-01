import './MulighetForArbeidSection.less';

import React from 'react';
import { Element } from 'nav-frontend-typografi';
import { FeiloppsummeringFeil, Select } from 'nav-frontend-skjema';
import { Knapp } from 'nav-frontend-knapper';

import ClearButton from '../../formComponents/ClearButton';
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

type MulighetForArbeidSectionProps = {
    section: Section;
    formState: FormType;
    errors: Map<keyof FormType, FeiloppsummeringFeil>;
    setFormState: React.Dispatch<React.SetStateAction<FormType>>;
};

const MulighetForArbeidSection = ({ section, setFormState, formState, errors }: MulighetForArbeidSectionProps) => {
    const periodOptions = [
        <option value="velg">Velg periodetype</option>,
        <option value="avventende">Avventende sykmelding</option>,
        <option value="gradert">Gradert sykmelding</option>,
        <option value="fullsykmelding">100% sykmelding</option>,
        <option value="behandlingsdager">Behandlingsdager</option>,
        <option value="reisetilskudd">Reisetilskudd</option>,
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
            {formState.mulighetForArbeid.length === 0 && (
                <Select
                    id="mulighetForArbeid"
                    value={undefined}
                    onChange={({ target: { value } }) => {
                        setFormState(
                            (state): FormType => {
                                // TODO: Fix this so it doesn't require "as"
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
                formState.mulighetForArbeid.map((mulighetForArbeid, index) => (
                    <div className="mulighetForArbeid__container">
                        <Select
                            style={{ flex: 'auto' }}
                            id="mulighetForArbeid"
                            value={mulighetForArbeid && mulighetForArbeid.type}
                            onChange={({ target: { value } }) => {
                                setFormState(
                                    (state): FormType => {
                                        // TODO: Fix this so it doesn't require "as"
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
                        {mulighetForArbeid?.type === 'avventende' && (
                            <AvventendePeriode
                                updateMfa={(updatedMfa) => updateSubsectionMFA(updatedMfa, index)}
                                mulighetForArbeid={mulighetForArbeid as AvventendePeriodeMFA}
                                errors={errors}
                            />
                        )}
                        {mulighetForArbeid?.type === 'gradert' && (
                            <GradertPeriode
                                updateMfa={(updatedMfa) => updateSubsectionMFA(updatedMfa, index)}
                                mulighetForArbeid={mulighetForArbeid as GradertPeriodeMFA}
                                errors={errors}
                                index={index}
                            />
                        )}
                        {mulighetForArbeid?.type === 'fullsykmelding' && (
                            <AktivitetIkkeMuligPeriode
                                updateMfa={(updatedMfa) => updateSubsectionMFA(updatedMfa, index)}
                                mulighetForArbeid={mulighetForArbeid as AktivitetIkkeMuligPeriodeMFA}
                                errors={errors}
                                index={index}
                            />
                        )}
                        {mulighetForArbeid?.type === 'behandlingsdager' && (
                            <BehandlingsdagerPeriode
                                updateMfa={(updatedMfa) => updateSubsectionMFA(updatedMfa, index)}
                                mulighetForArbeid={mulighetForArbeid as BehandlingsdagerPeriodeMFA}
                                errors={errors}
                            />
                        )}
                        {mulighetForArbeid?.type === 'reisetilskudd' && (
                            <ReisetilskuddPeriode
                                updateMfa={(updatedMfa) => updateSubsectionMFA(updatedMfa, index)}
                                mulighetForArbeid={mulighetForArbeid as ReisetilskuddPeriodeMFA}
                                errors={errors}
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
                        <hr className="mulighetForArbeid__divider" />
                    </div>
                ))}

            <Knapp
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
        </SectionContainer>
    );
};

export default MulighetForArbeidSection;
