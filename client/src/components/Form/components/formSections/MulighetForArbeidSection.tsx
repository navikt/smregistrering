import React from 'react';
import { Checkbox, Input, Textarea } from 'nav-frontend-skjema';
import { Element } from 'nav-frontend-typografi';

import RangePicker from '../formComponents/RangePicker';
import SectionContainer from '../SectionContainer';
import Subsection from '../formComponents/Subsection';
import { Section } from '../../../../App';

export enum AvventendeSykmeldingField {
    AVVENTENDE = 'avventende',
    AVVENTENDE_PERIODE = 'avventendePeriode',
    INNSPILL_TIL_ARBEIDSGIVER = 'innspillTilArbeidsgiver',
}

type AvventendeSykmelding = {
    [AvventendeSykmeldingField.AVVENTENDE]?: boolean;
    [AvventendeSykmeldingField.AVVENTENDE_PERIODE]: Date[];
    [AvventendeSykmeldingField.INNSPILL_TIL_ARBEIDSGIVER]?: string;
};

export enum GradertSykmeldingField {
    GRADERT = 'gradert',
    GRADERT_PERIODE = 'gradertPeriode',
    GRAD = 'grad',
    REISETILSKUDD = 'reisetilskudd',
}

type GradertSykmelding = {
    [GradertSykmeldingField.GRADERT]?: boolean;
    [GradertSykmeldingField.GRADERT_PERIODE]: Date[];
    [GradertSykmeldingField.GRAD]?: string;
    [GradertSykmeldingField.REISETILSKUDD]?: boolean;
};

export enum FullSykmeldingField {
    SYKMELDT = 'sykmeldt',
    SYKMELDT_PERIODE = 'sykmeldtPeriode',
    MEDISINSKE_AARSAKER = 'medisinskeAarsaker',
    ARBEIDSFORHOLD = 'arbeidsforhold',
}

type FullSykmelding = {
    [FullSykmeldingField.SYKMELDT]?: boolean;
    [FullSykmeldingField.SYKMELDT_PERIODE]: Date[];
    [FullSykmeldingField.MEDISINSKE_AARSAKER]?: boolean;
    [FullSykmeldingField.ARBEIDSFORHOLD]?: boolean;
};

export enum BehandlingField {
    KAN_ARBEIDE = 'kanArbeide',
    BEHANDLINGSPERIODE = 'behandlingsPeriode',
    ANTALL_DAGER = 'antallDager',
}

type Behandling = {
    [BehandlingField.KAN_ARBEIDE]?: boolean;
    [BehandlingField.BEHANDLINGSPERIODE]: Date[];
    [BehandlingField.ANTALL_DAGER]?: number;
};

export enum ReisetilskuddField {
    FULLT_ARBEID = 'fulltArbeid',
    ARBEIDSPERIODE = 'arbeidsPeriode',
}

type Reisetilskudd = {
    [ReisetilskuddField.FULLT_ARBEID]?: boolean;
    [ReisetilskuddField.ARBEIDSPERIODE]: Date[];
};

export enum MulighetForArbeidField {
    AVVENTENDE_SYKMELDING = 'avventendeSykmelding',
    GRADERT_SYKMELDING = 'gradertSykmelding',
    FULL_SYKMELDING = 'fullSykmelding',
    BEHANDLING = 'behandling',
    REISETILSKUDD = 'reisetilskudd',
}

export type MulighetForArbeid = {
    [MulighetForArbeidField.AVVENTENDE_SYKMELDING]: AvventendeSykmelding;
    [MulighetForArbeidField.GRADERT_SYKMELDING]: GradertSykmelding;
    [MulighetForArbeidField.FULL_SYKMELDING]: FullSykmelding;
    [MulighetForArbeidField.BEHANDLING]: Behandling;
    [MulighetForArbeidField.REISETILSKUDD]: Reisetilskudd;
};

type MulighetForArbeidSectionProps = {
    section: Section;
    expanded: boolean;
    setMulighetForArbeid: (value: React.SetStateAction<MulighetForArbeid>) => void;
    expandSection: () => void;
    mulighetForArbeid: MulighetForArbeid;
};

const MulighetForArbeidSection = ({
    section,
    expanded,
    expandSection,
    setMulighetForArbeid,
    mulighetForArbeid,
}: MulighetForArbeidSectionProps) => {
    return (
        <SectionContainer section={section} expanded={expanded} setExpanded={expandSection}>
            <Subsection sectionIdentifier="4.1">
                <Checkbox
                    checked={
                        mulighetForArbeid[MulighetForArbeidField.AVVENTENDE_SYKMELDING][
                            AvventendeSykmeldingField.AVVENTENDE
                        ]
                    }
                    label="Pasienten kan benytte avventende sykmelding"
                    onChange={() =>
                        setMulighetForArbeid(state => ({
                            ...state,
                            [MulighetForArbeidField.AVVENTENDE_SYKMELDING]: {
                                ...state[MulighetForArbeidField.AVVENTENDE_SYKMELDING],
                                [AvventendeSykmeldingField.AVVENTENDE]: !state[
                                    MulighetForArbeidField.AVVENTENDE_SYKMELDING
                                ][AvventendeSykmeldingField.AVVENTENDE],
                            },
                        }))
                    }
                />
                <br />
                {mulighetForArbeid[MulighetForArbeidField.AVVENTENDE_SYKMELDING][
                    AvventendeSykmeldingField.AVVENTENDE
                ] && (
                    <>
                        <RangePicker
                            labelFrom="4.1.1 f.o.m."
                            labelTo="4.1.2 t.o.m."
                            value={
                                mulighetForArbeid[MulighetForArbeidField.AVVENTENDE_SYKMELDING][
                                    AvventendeSykmeldingField.AVVENTENDE_PERIODE
                                ]
                            }
                            onChange={newDates =>
                                setMulighetForArbeid(state => ({
                                    ...state,
                                    [MulighetForArbeidField.AVVENTENDE_SYKMELDING]: {
                                        ...state[MulighetForArbeidField.AVVENTENDE_SYKMELDING],
                                        [AvventendeSykmeldingField.AVVENTENDE_PERIODE]: newDates,
                                    },
                                }))
                            }
                        />
                        <Textarea
                            maxLength={0}
                            value={
                                mulighetForArbeid[MulighetForArbeidField.AVVENTENDE_SYKMELDING][
                                    AvventendeSykmeldingField.INNSPILL_TIL_ARBEIDSGIVER
                                ] || ''
                            }
                            onChange={({ target: { value } }) =>
                                setMulighetForArbeid(state => ({
                                    ...state,
                                    [MulighetForArbeidField.AVVENTENDE_SYKMELDING]: {
                                        ...state[MulighetForArbeidField.AVVENTENDE_SYKMELDING],
                                        [AvventendeSykmeldingField.INNSPILL_TIL_ARBEIDSGIVER]: value,
                                    },
                                }))
                            }
                            label={<Element>4.1.3 Innspill til arbeidsgiver om tilrettelegging</Element>}
                        />
                    </>
                )}
            </Subsection>
            <Subsection sectionIdentifier="4.2">
                <Checkbox
                    checked={
                        mulighetForArbeid[MulighetForArbeidField.GRADERT_SYKMELDING][GradertSykmeldingField.GRADERT]
                    }
                    label="Pasienten kan være delvis i arbeid (gradert sykmelding)"
                    onChange={() =>
                        setMulighetForArbeid(state => ({
                            ...state,
                            [MulighetForArbeidField.GRADERT_SYKMELDING]: {
                                ...state[MulighetForArbeidField.GRADERT_SYKMELDING],
                                [GradertSykmeldingField.GRADERT]: !state[MulighetForArbeidField.GRADERT_SYKMELDING][
                                    GradertSykmeldingField.GRADERT
                                ],
                            },
                        }))
                    }
                />
                <br />
                {mulighetForArbeid[MulighetForArbeidField.GRADERT_SYKMELDING][GradertSykmeldingField.GRADERT] && (
                    <>
                        <RangePicker
                            labelFrom="4.2.1 f.o.m."
                            labelTo="4.2.2 t.o.m."
                            value={
                                mulighetForArbeid[MulighetForArbeidField.GRADERT_SYKMELDING][
                                    GradertSykmeldingField.GRADERT_PERIODE
                                ]
                            }
                            onChange={newDates =>
                                setMulighetForArbeid(state => ({
                                    ...state,
                                    [MulighetForArbeidField.GRADERT_SYKMELDING]: {
                                        ...state[MulighetForArbeidField.GRADERT_SYKMELDING],
                                        [GradertSykmeldingField.GRADERT_PERIODE]: newDates,
                                    },
                                }))
                            }
                        />
                        <Input
                            className="form-margin-bottom half"
                            onChange={({ target: { value } }) =>
                                setMulighetForArbeid(state => ({
                                    ...state,
                                    [MulighetForArbeidField.GRADERT_SYKMELDING]: {
                                        ...state[MulighetForArbeidField.GRADERT_SYKMELDING],
                                        [GradertSykmeldingField.GRAD]: value,
                                    },
                                }))
                            }
                            label={<Element>4.2.3 Oppgi grad for sykmelding</Element>}
                        />
                    </>
                )}

                <Element className="form-label">4.2.4</Element>
                <Checkbox
                    checked={
                        mulighetForArbeid[MulighetForArbeidField.GRADERT_SYKMELDING][
                            GradertSykmeldingField.REISETILSKUDD
                        ]
                    }
                    label="Pasienten kan være delvis i arbeid ved bruk av reisetilskudd"
                    onChange={() =>
                        setMulighetForArbeid(state => ({
                            ...state,
                            [MulighetForArbeidField.GRADERT_SYKMELDING]: {
                                ...state[MulighetForArbeidField.GRADERT_SYKMELDING],
                                [GradertSykmeldingField.REISETILSKUDD]: !state[
                                    MulighetForArbeidField.GRADERT_SYKMELDING
                                ][GradertSykmeldingField.REISETILSKUDD],
                            },
                        }))
                    }
                />
            </Subsection>

            <Subsection sectionIdentifier="4.3">
                <Checkbox
                    checked={mulighetForArbeid[MulighetForArbeidField.FULL_SYKMELDING][FullSykmeldingField.SYKMELDT]}
                    label="Pasienten kan ikke være i arbeid (100 prosent sykmelding)"
                    onChange={() =>
                        setMulighetForArbeid(state => ({
                            ...state,
                            [MulighetForArbeidField.FULL_SYKMELDING]: {
                                ...state[MulighetForArbeidField.FULL_SYKMELDING],
                                [FullSykmeldingField.SYKMELDT]: !state[MulighetForArbeidField.FULL_SYKMELDING][
                                    FullSykmeldingField.SYKMELDT
                                ],
                            },
                        }))
                    }
                />
                <br />
                {mulighetForArbeid[MulighetForArbeidField.FULL_SYKMELDING][FullSykmeldingField.SYKMELDT] && (
                    <>
                        <RangePicker
                            labelFrom="4.3.1 f.o.m."
                            labelTo="4.3.2 t.o.m."
                            value={
                                mulighetForArbeid[MulighetForArbeidField.FULL_SYKMELDING][
                                    FullSykmeldingField.SYKMELDT_PERIODE
                                ]
                            }
                            onChange={newDates =>
                                setMulighetForArbeid(state => ({
                                    ...state,
                                    [MulighetForArbeidField.FULL_SYKMELDING]: {
                                        ...state[MulighetForArbeidField.FULL_SYKMELDING],
                                        [FullSykmeldingField.SYKMELDT_PERIODE]: newDates,
                                    },
                                }))
                            }
                        />
                        <Element className="form-label">4.3.3</Element>
                        <Checkbox
                            className="form-margin-bottom"
                            checked={
                                mulighetForArbeid[MulighetForArbeidField.FULL_SYKMELDING][
                                    FullSykmeldingField.MEDISINSKE_AARSAKER
                                ]
                            }
                            label="Det er medisinske årsaker som hindrer arbeidsrelatert aktivitet"
                            onChange={() =>
                                setMulighetForArbeid(state => ({
                                    ...state,
                                    [MulighetForArbeidField.FULL_SYKMELDING]: {
                                        ...state[MulighetForArbeidField.FULL_SYKMELDING],
                                        [FullSykmeldingField.MEDISINSKE_AARSAKER]: !state[
                                            MulighetForArbeidField.FULL_SYKMELDING
                                        ][FullSykmeldingField.MEDISINSKE_AARSAKER],
                                    },
                                }))
                            }
                        />
                        <Element className="form-label">4.3.4</Element>
                        <Checkbox
                            className="form-margin-bottom"
                            checked={
                                mulighetForArbeid[MulighetForArbeidField.FULL_SYKMELDING][
                                    FullSykmeldingField.ARBEIDSFORHOLD
                                ]
                            }
                            label="Forhold på arbeidsplassen vanskeliggjør arbeidsrelatert aktivitet"
                            onChange={() =>
                                setMulighetForArbeid(state => ({
                                    ...state,
                                    [MulighetForArbeidField.FULL_SYKMELDING]: {
                                        ...state[MulighetForArbeidField.FULL_SYKMELDING],
                                        [FullSykmeldingField.ARBEIDSFORHOLD]: !state[
                                            MulighetForArbeidField.FULL_SYKMELDING
                                        ][FullSykmeldingField.ARBEIDSFORHOLD],
                                    },
                                }))
                            }
                        />
                    </>
                )}
            </Subsection>

            <Subsection sectionIdentifier="4.4">
                <Checkbox
                    checked={mulighetForArbeid[MulighetForArbeidField.BEHANDLING][BehandlingField.KAN_ARBEIDE]}
                    label="Pasienten kan ikke være i arbeid på behandlingsdager"
                    onChange={() =>
                        setMulighetForArbeid(state => ({
                            ...state,
                            [MulighetForArbeidField.BEHANDLING]: {
                                ...state[MulighetForArbeidField.BEHANDLING],
                                [BehandlingField.KAN_ARBEIDE]: !state[MulighetForArbeidField.BEHANDLING][
                                    BehandlingField.KAN_ARBEIDE
                                ],
                            },
                        }))
                    }
                />
                <br />
                {mulighetForArbeid[MulighetForArbeidField.BEHANDLING][BehandlingField.KAN_ARBEIDE] && (
                    <>
                        <RangePicker
                            labelFrom="4.4.1 f.o.m."
                            labelTo="4.4.2 t.o.m."
                            value={
                                mulighetForArbeid[MulighetForArbeidField.BEHANDLING][BehandlingField.BEHANDLINGSPERIODE]
                            }
                            onChange={newDates =>
                                setMulighetForArbeid(state => ({
                                    ...state,
                                    [MulighetForArbeidField.BEHANDLING]: {
                                        ...state[MulighetForArbeidField.BEHANDLING],
                                        [BehandlingField.BEHANDLINGSPERIODE]: newDates,
                                    },
                                }))
                            }
                        />

                        <Input
                            className="form-margin-bottom half"
                            type="number"
                            onChange={({ target: { value } }) =>
                                setMulighetForArbeid(state => ({
                                    ...state,
                                    [MulighetForArbeidField.BEHANDLING]: {
                                        ...state[MulighetForArbeidField.BEHANDLING],
                                        [BehandlingField.ANTALL_DAGER]: Number(value),
                                    },
                                }))
                            }
                            label={<Element>4.4.3 Oppgi antall dager i perioden</Element>}
                        />
                    </>
                )}
            </Subsection>

            <Subsection sectionIdentifier="4.5" underline={false}>
                <Checkbox
                    checked={mulighetForArbeid[MulighetForArbeidField.REISETILSKUDD][ReisetilskuddField.FULLT_ARBEID]}
                    label="Pasienten kan være i fullt arbeid ved bruk av reisetilskudd"
                    onChange={() =>
                        setMulighetForArbeid(state => ({
                            ...state,
                            [MulighetForArbeidField.REISETILSKUDD]: {
                                ...state[MulighetForArbeidField.REISETILSKUDD],
                                [ReisetilskuddField.FULLT_ARBEID]: !state[MulighetForArbeidField.REISETILSKUDD][
                                    ReisetilskuddField.FULLT_ARBEID
                                ],
                            },
                        }))
                    }
                />
                <br />
                {mulighetForArbeid[MulighetForArbeidField.REISETILSKUDD][ReisetilskuddField.FULLT_ARBEID] && (
                    <RangePicker
                        labelFrom="4.5.1 f.o.m."
                        labelTo="4.5.2 t.o.m."
                        value={
                            mulighetForArbeid[MulighetForArbeidField.REISETILSKUDD][ReisetilskuddField.ARBEIDSPERIODE]
                        }
                        onChange={newDates =>
                            setMulighetForArbeid(state => ({
                                ...state,
                                [MulighetForArbeidField.REISETILSKUDD]: {
                                    ...state[MulighetForArbeidField.REISETILSKUDD],
                                    [ReisetilskuddField.ARBEIDSPERIODE]: newDates,
                                },
                            }))
                        }
                    />
                )}
            </Subsection>
        </SectionContainer>
    );
};

export default MulighetForArbeidSection;
