import React from 'react';
import { Checkbox, Input, Textarea } from 'nav-frontend-skjema';
import { Element } from 'nav-frontend-typografi';

import RangePicker from '../formComponents/RangePicker';
import SectionContainer from '../SectionContainer';
import Subsection from '../formComponents/Subsection';
import { ErrorSchemaType, SchemaType, Validate } from '../../Form';
import { Section } from '../../../../types/Section';

export enum AvventendeSykmeldingField {
    AVVENTENDE = 'avventende',
    AVVENTENDE_PERIODE = 'avventendePeriode',
    INNSPILL_TIL_ARBEIDSGIVER = 'innspillTilArbeidsgiver',
}

export type AvventendeSykmelding = {
    avventende?: boolean;
    avventendePeriode: Date[];
    innspillTilArbeidsgiver?: string;
};

export enum GradertSykmeldingField {
    GRADERT = 'gradert',
    GRADERT_PERIODE = 'gradertPeriode',
    GRAD = 'grad',
    REISETILSKUDD = 'reisetilskudd',
}

export type GradertSykmelding = {
    gradert?: boolean;
    gradertPeriode: Date[];
    grad?: string;
    reisetilskudd?: boolean;
};

export enum FullSykmeldingField {
    SYKMELDT = 'sykmeldt',
    SYKMELDT_PERIODE = 'sykmeldtPeriode',
    MEDISINSKE_AARSAKER = 'medisinskeAarsaker',
    ARBEIDSFORHOLD = 'arbeidsforhold',
}

export type FullSykmelding = {
    sykmeldt?: boolean;
    sykmeldtPeriode: Date[];
    medisinskeAarsaker?: boolean;
    arbeidsforhold?: boolean;
};

export enum BehandlingField {
    KAN_ARBEIDE = 'kanArbeide',
    BEHANDLINGSPERIODE = 'behandlingsPeriode',
    ANTALL_DAGER = 'antallDager',
}

export type Behandling = {
    kanArbeide?: boolean;
    behandlingsPeriode: Date[];
    antallDager?: number;
};

export enum ReisetilskuddField {
    FULLT_ARBEID = 'fulltArbeid',
    ARBEIDSPERIODE = 'arbeidsPeriode',
}

export type Reisetilskudd = {
    fulltArbeid?: boolean;
    arbeidsPeriode: Date[];
};

export enum MulighetForArbeidField {
    AVVENTENDE_SYKMELDING = 'avventendeSykmelding',
    GRADERT_SYKMELDING = 'gradertSykmelding',
    FULL_SYKMELDING = 'fullSykmelding',
    BEHANDLING = 'behandling',
    REISETILSKUDD = 'reisetilskudd',
}

export type MulighetForArbeid = {
    avventendeSykmelding: AvventendeSykmelding;
    gradertSykmelding: GradertSykmelding;
    fullSykmelding: FullSykmelding;
    behandling: Behandling;
    reisetilskudd: Reisetilskudd;
};

type MulighetForArbeidSectionProps = {
    section: Section;
    expanded: boolean;
    setSchema: (value: React.SetStateAction<SchemaType>) => void;
    errors: ErrorSchemaType;
    validate: Validate;
    schema: SchemaType;
    expandSection: () => void;
};

const MulighetForArbeidSection = ({
    section,
    expanded,
    expandSection,
    setSchema,
    schema,
    errors,
    validate,
}: MulighetForArbeidSectionProps) => {
    return (
        <SectionContainer section={section} expanded={expanded} setExpanded={expandSection}>
            <Subsection sectionIdentifier="4.1">
                <Checkbox
                    checked={schema[AvventendeSykmeldingField.AVVENTENDE]}
                    label="Pasienten kan benytte avventende sykmelding"
                    onChange={() => {
                        setSchema(state => ({
                            ...state,
                            [AvventendeSykmeldingField.AVVENTENDE]: !state[AvventendeSykmeldingField.AVVENTENDE],
                        }));
                        validate(AvventendeSykmeldingField.AVVENTENDE, schema[AvventendeSykmeldingField.AVVENTENDE]);
                    }}
                    feil={errors[AvventendeSykmeldingField.AVVENTENDE]}
                />
                <br />
                {schema[AvventendeSykmeldingField.AVVENTENDE] && (
                    <>
                        <RangePicker
                            labelFrom="4.1.1 f.o.m."
                            labelTo="4.1.2 t.o.m."
                            value={schema[AvventendeSykmeldingField.AVVENTENDE_PERIODE] || []}
                            onChange={newDates => {
                                setSchema(state => ({
                                    ...state,
                                    [AvventendeSykmeldingField.AVVENTENDE_PERIODE]: newDates,
                                }));
                                validate(AvventendeSykmeldingField.AVVENTENDE_PERIODE, newDates);
                            }}
                            feil={errors[AvventendeSykmeldingField.AVVENTENDE_PERIODE]}
                        />
                        <Textarea
                            maxLength={0}
                            value={schema[AvventendeSykmeldingField.INNSPILL_TIL_ARBEIDSGIVER] || ''}
                            onChange={({ target: { value } }) =>
                                setSchema(state => ({
                                    ...state,
                                    [AvventendeSykmeldingField.INNSPILL_TIL_ARBEIDSGIVER]: value,
                                }))
                            }
                            label={<Element>4.1.3 Innspill til arbeidsgiver om tilrettelegging</Element>}
                        />
                    </>
                )}
            </Subsection>
            <Subsection sectionIdentifier="4.2">
                <Checkbox
                    checked={schema[GradertSykmeldingField.GRADERT]}
                    label="Pasienten kan være delvis i arbeid (gradert sykmelding)"
                    onChange={() =>
                        setSchema(state => ({
                            ...state,
                            [GradertSykmeldingField.GRADERT]: !state[GradertSykmeldingField.GRADERT],
                        }))
                    }
                />
                <br />
                {schema[GradertSykmeldingField.GRADERT] && (
                    <>
                        <RangePicker
                            labelFrom="4.2.1 f.o.m."
                            labelTo="4.2.2 t.o.m."
                            value={schema[GradertSykmeldingField.GRADERT_PERIODE] || []}
                            onChange={newDates =>
                                setSchema(state => ({
                                    ...state,
                                    [GradertSykmeldingField.GRADERT_PERIODE]: newDates,
                                }))
                            }
                        />
                        <Input
                            className="form-margin-bottom half"
                            onChange={({ target: { value } }) =>
                                setSchema(state => ({
                                    ...state,
                                    [GradertSykmeldingField.GRAD]: value,
                                }))
                            }
                            label={<Element>4.2.3 Oppgi grad for sykmelding</Element>}
                        />
                    </>
                )}

                <Element className="form-label">4.2.4</Element>
                <Checkbox
                    checked={schema[GradertSykmeldingField.REISETILSKUDD]}
                    label="Pasienten kan være delvis i arbeid ved bruk av reisetilskudd"
                    onChange={() =>
                        setSchema(state => ({
                            ...state,
                            [GradertSykmeldingField.REISETILSKUDD]: !state[GradertSykmeldingField.REISETILSKUDD],
                        }))
                    }
                />
            </Subsection>

            <Subsection sectionIdentifier="4.3">
                <Checkbox
                    checked={schema[FullSykmeldingField.SYKMELDT]}
                    label="Pasienten kan ikke være i arbeid (100 prosent sykmelding)"
                    onChange={() =>
                        setSchema(state => ({
                            ...state,
                            [FullSykmeldingField.SYKMELDT]: !state[FullSykmeldingField.SYKMELDT],
                        }))
                    }
                />
                <br />
                {schema[FullSykmeldingField.SYKMELDT] && (
                    <>
                        <RangePicker
                            labelFrom="4.3.1 f.o.m."
                            labelTo="4.3.2 t.o.m."
                            value={schema[FullSykmeldingField.SYKMELDT_PERIODE] || []}
                            onChange={newDates =>
                                setSchema(state => ({
                                    ...state,
                                    [FullSykmeldingField.SYKMELDT_PERIODE]: newDates,
                                }))
                            }
                        />
                        <Element className="form-label">4.3.3</Element>
                        <Checkbox
                            className="form-margin-bottom"
                            checked={schema[FullSykmeldingField.MEDISINSKE_AARSAKER]}
                            label="Det er medisinske årsaker som hindrer arbeidsrelatert aktivitet"
                            onChange={() =>
                                setSchema(state => ({
                                    ...state,
                                    [FullSykmeldingField.MEDISINSKE_AARSAKER]: !state[
                                        FullSykmeldingField.MEDISINSKE_AARSAKER
                                    ],
                                }))
                            }
                        />
                        <Element className="form-label">4.3.4</Element>
                        <Checkbox
                            className="form-margin-bottom"
                            checked={schema[FullSykmeldingField.ARBEIDSFORHOLD]}
                            label="Forhold på arbeidsplassen vanskeliggjør arbeidsrelatert aktivitet"
                            onChange={() =>
                                setSchema(state => ({
                                    ...state,
                                    [FullSykmeldingField.ARBEIDSFORHOLD]: !state[FullSykmeldingField.ARBEIDSFORHOLD],
                                }))
                            }
                        />
                    </>
                )}
            </Subsection>

            <Subsection sectionIdentifier="4.4">
                <Checkbox
                    checked={schema[BehandlingField.KAN_ARBEIDE]}
                    label="Pasienten kan ikke være i arbeid på behandlingsdager"
                    onChange={() =>
                        setSchema(state => ({
                            ...state,
                            [BehandlingField.KAN_ARBEIDE]: !state[BehandlingField.KAN_ARBEIDE],
                        }))
                    }
                />
                <br />
                {schema[BehandlingField.KAN_ARBEIDE] && (
                    <>
                        <RangePicker
                            labelFrom="4.4.1 f.o.m."
                            labelTo="4.4.2 t.o.m."
                            value={schema[BehandlingField.BEHANDLINGSPERIODE] || []}
                            onChange={newDates =>
                                setSchema(state => ({
                                    ...state,
                                    [BehandlingField.BEHANDLINGSPERIODE]: newDates,
                                }))
                            }
                        />

                        <Input
                            className="form-margin-bottom half"
                            type="number"
                            onChange={({ target: { value } }) =>
                                setSchema(state => ({
                                    ...state,
                                    [BehandlingField.ANTALL_DAGER]: Number(value),
                                }))
                            }
                            label={<Element>4.4.3 Oppgi antall dager i perioden</Element>}
                        />
                    </>
                )}
            </Subsection>

            <Subsection sectionIdentifier="4.5" underline={false}>
                <Checkbox
                    checked={schema[ReisetilskuddField.FULLT_ARBEID]}
                    label="Pasienten kan være i fullt arbeid ved bruk av reisetilskudd"
                    onChange={() =>
                        setSchema(state => ({
                            ...state,
                            [ReisetilskuddField.FULLT_ARBEID]: !state[ReisetilskuddField.FULLT_ARBEID],
                        }))
                    }
                />
                <br />
                {schema[ReisetilskuddField.FULLT_ARBEID] && (
                    <RangePicker
                        labelFrom="4.5.1 f.o.m."
                        labelTo="4.5.2 t.o.m."
                        value={schema[ReisetilskuddField.ARBEIDSPERIODE] || []}
                        onChange={newDates =>
                            setSchema(state => ({
                                ...state,
                                [ReisetilskuddField.ARBEIDSPERIODE]: newDates,
                            }))
                        }
                    />
                )}
            </Subsection>
        </SectionContainer>
    );
};

export default MulighetForArbeidSection;
