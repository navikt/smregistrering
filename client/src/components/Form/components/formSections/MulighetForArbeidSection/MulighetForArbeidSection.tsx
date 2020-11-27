import './MulighetForArbeidSection.less';

import React from 'react';
import { Element } from 'nav-frontend-typografi';
import { FeiloppsummeringFeil, Select } from 'nav-frontend-skjema';

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
    console.log(formState.mulighetForArbeid);

    const periodOptions = [
        <option value="velg">Velg</option>,
        <option value="avventende">Kan benytte avventende sykmelding</option>,
        <option value="gradert">Delvis (gradert sykmelding)</option>,
        <option value="fullsykmelding">Nei (100% sykmelding)</option>,
        <option value="behandlingsdager">Ikke på behandlingsdager</option>,
        <option value="reisetilskudd">Ved bruk av reisetilskudd</option>,
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
                    className="form-margin-bottom"
                    label={<Element>Har pasienten mulighet til å være i arbeid?</Element>}
                >
                    {periodOptions}
                </Select>
            )}

            {formState.mulighetForArbeid.length > 0 &&
                formState.mulighetForArbeid.map((mulighetForArbeid, index) => (
                    <div className="mulighetForArbeid__container">
                        <div style={{ display: 'flex' }}>
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
                                className="form-margin-bottom"
                                label={<Element>Har pasienten mulighet til å være i arbeid?</Element>}
                            >
                                {periodOptions}
                            </Select>
                            <ClearButton
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
                                buttonText="Fjern"
                            />
                        </div>
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
                            />
                        )}
                        {mulighetForArbeid?.type === 'fullsykmelding' && (
                            <AktivitetIkkeMuligPeriode
                                updateMfa={(updatedMfa) => updateSubsectionMFA(updatedMfa, index)}
                                mulighetForArbeid={mulighetForArbeid as AktivitetIkkeMuligPeriodeMFA}
                                errors={errors}
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
                    </div>
                ))}

            <button
                type="button"
                className="mulighetForArbeid__add"
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
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M16.3717 2.82C14.565 1.00583 12.1617 0.005 9.58252 0C4.30835 0 0.0100188 4.29 1.88156e-05 9.56417C-0.00498118 12.1242 0.986685 14.5325 2.79335 16.3467C4.60002 18.16 7.00418 19.1617 9.56502 19.1667H9.58335C14.8567 19.1667 19.1559 14.8758 19.1659 9.60083C19.1709 7.04167 18.1784 4.63333 16.3717 2.82ZM14.5834 10H10V14.5833C10 14.8133 9.81252 15 9.58335 15C9.35336 15 9.16669 14.8133 9.16669 14.5833V10H4.58336C4.35336 9.99917 4.16586 9.81333 4.16669 9.58333C4.16669 9.35417 4.35336 9.16667 4.58336 9.16667H9.16669V4.58333C9.16669 4.35333 9.35336 4.16667 9.58335 4.16667C9.81252 4.16667 10 4.35333 10 4.58333V9.16667H14.5834C14.8125 9.16667 15.0009 9.35333 15 9.58333C15 9.81333 14.8134 10 14.5834 10Z"
                        fill="#0067C5"
                    />
                </svg>

                <span className="mulighetForArbeid__add-text">Legg til periodetype</span>
            </button>
        </SectionContainer>
    );
};

export default MulighetForArbeidSection;
