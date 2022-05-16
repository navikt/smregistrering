import './MulighetForArbeidSection.css';

import React, { useEffect } from 'react';
import { Element } from 'nav-frontend-typografi';
import { FeiloppsummeringFeil, Select } from 'nav-frontend-skjema';
import { Knapp } from 'nav-frontend-knapper';

import ClearButton from '../../formComponents/ClearButton';
import Divider from '../../formComponents/Divider';
import SectionContainer from '../../SectionContainer';
import { FormType } from '../../../Form';
import { Section } from '../../../../../types/Section';

import AktivitetIkkeMuligPeriode, { AktivitetIkkeMuligPeriodeMFA } from './AktivitetIkkeMuligPeriode';
import AvventendePeriode, { AvventendePeriodeMFA } from './AvventendePeriode';
import BehandlingsdagerPeriode, { BehandlingsdagerPeriodeMFA } from './BehandlingsdagerPeriode';
import GradertPeriode, { GradertPeriodeMFA } from './GradertPeriode';
import ReisetilskuddPeriode, { ReisetilskuddPeriodeMFA } from './ReisetilskuddPeriode';

export type MulighetForArbeidTypes =
    | AvventendePeriodeMFA
    | GradertPeriodeMFA
    | AktivitetIkkeMuligPeriodeMFA
    | BehandlingsdagerPeriodeMFA
    | ReisetilskuddPeriodeMFA;

export type MulighetForArbeid = {
    mulighetForArbeid: MulighetForArbeidTypes[];
};

export type MFAOptions = 'fullsykmelding' | 'avventende' | 'gradert' | 'behandlingsdager' | 'reisetilskudd';

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
    // Create empty period with 'fullsykmelding' selected if no periods are present
    useEffect(() => {
        if (!formState.mulighetForArbeid.length) {
            setFormState((formState) => ({
                ...formState,
                mulighetForArbeid: [createEmptyMFA('fullsykmelding')],
            }));
        }
    }, [formState, setFormState]);

    const createEmptyMFA = (type: MFAOptions): MulighetForArbeidTypes => {
        if (type === 'avventende') {
            return {
                type,
                avventendePeriode: null,
                avventendeInnspillTilArbeidsgiver: null,
            };
        }

        if (type === 'gradert') {
            return { type, gradertPeriode: null, gradertGrad: null, gradertReisetilskudd: false };
        }

        if (type === 'behandlingsdager') {
            return { type, behandlingsdagerPeriode: null, behandlingsdagerAntall: null };
        }

        if (type === 'reisetilskudd') {
            return { type, reisetilskuddPeriode: null };
        }

        return {
            type: 'fullsykmelding',
            aktivitetIkkeMuligPeriode: null,
            aktivitetIkkeMuligMedisinskArsak: false,
            aktivitetIkkeMuligMedisinskArsakType: [],
            aktivitetIkkeMuligMedisinskArsakBeskrivelse: null,
            aktivitetIkkeMuligArbeidsrelatertArsak: false,
            aktivitetIkkeMuligArbeidsrelatertArsakType: [],
            aktivitetIkkeMuligArbeidsrelatertArsakBeskrivelse: null,
        };
    };

    const mergeMFAAtIndex = (mfa: MulighetForArbeidTypes, state: FormType, index: number) => {
        return [...state.mulighetForArbeid.slice(0, index), mfa, ...state.mulighetForArbeid.slice(index + 1)];
    };

    const updateSubsectionMFA = (updatedMfa: MulighetForArbeidTypes, index: number) =>
        setFormState((state): FormType => {
            const updatedMulighetForArbeid = mergeMFAAtIndex(updatedMfa, state, index);

            return {
                ...state,
                mulighetForArbeid: updatedMulighetForArbeid,
            };
        });

    return (
        <SectionContainer section={section} sectionError={errors.get('mulighetForArbeid')?.feilmelding}>
            <div id="mulighetForArbeid">
                {formState.mulighetForArbeid.map((mfaPeriode, index) => (
                    <div key={index} className="mulighetForArbeid__container">
                        <Select
                            style={{ flex: 'auto' }}
                            id={`mulighetForArbeid-selector-${index}`}
                            value={mfaPeriode && mfaPeriode.type}
                            onChange={({ target: { value } }) => {
                                setFormState((state): FormType => {
                                    const mfa = createEmptyMFA(value as MFAOptions);

                                    const updatedMulighetForArbeid = mergeMFAAtIndex(mfa, state, index);

                                    return {
                                        ...state,
                                        mulighetForArbeid: updatedMulighetForArbeid,
                                    };
                                });
                            }}
                            className="form-margin-bottom half"
                            label={<Element>Periodetype</Element>}
                        >
                            <option value="avventende">4.1 Avventende sykmelding</option>
                            <option value="gradert">4.2 Gradert sykmelding</option>
                            <option value="fullsykmelding">4.3 100% sykmelding</option>
                            <option value="behandlingsdager">4.4 Behandlingsdager</option>
                            <option value="reisetilskudd">4.5 Reisetilskudd</option>
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

                        {/* Dont let the user delete the the period if only one period */}
                        {formState.mulighetForArbeid.length > 1 && (
                            <ClearButton
                                id={`mulighetForArbeid-clear-button-${index}`}
                                iconType="Can"
                                onChange={(event) => {
                                    event.preventDefault();
                                    setFormState((formState) => {
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
                        )}

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
                            (state): FormType => ({
                                ...state,
                                mulighetForArbeid: [...state.mulighetForArbeid, createEmptyMFA('fullsykmelding')],
                            }),
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
