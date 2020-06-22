import React from 'react';
import { Checkbox, Input, Select, Textarea } from 'nav-frontend-skjema';
import { Element } from 'nav-frontend-typografi';

import ExpandableField from '../formComponents/ExpandableField';
import RangePicker from '../formComponents/RangePicker';
import SectionContainer from '../SectionContainer';
import Subsection from '../formComponents/Subsection';
import { ArbeidsrelatertArsakType, MedisinskArsakType } from '../../../../types/RegistrertSykmelding';
import { ErrorSchemaType, SchemaType } from '../../Form';
import { Section } from '../../../../types/Section';
import { Validate } from '../../validation';

export type MulighetForArbeid = {
    // For validering av minimum én periode valgt
    mulighetForArbeid?: boolean;
    // Perioder for avventende sykmelding
    avventendeSykmelding: boolean;
    avventendePeriode?: Date[];
    avventendeInnspillTilArbeidsgiver?: string;
    // Perioder for gradert sykmelding
    gradertSykmelding: boolean;
    gradertPeriode?: Date[];
    gradertGrad?: number;
    gradertReisetilskudd: boolean;
    // Perioder for full sykmelding
    aktivitetIkkeMuligSykmelding: boolean;
    aktivitetIkkeMuligPeriode?: Date[];
    aktivitetIkkeMuligMedisinskArsak?: boolean;
    aktivitetIkkeMuligMedisinskArsakType?: (keyof typeof MedisinskArsakType)[];
    aktivitetIkkeMuligMedisinskArsakBeskrivelse?: string;
    aktivitetIkkeMuligArbeidsrelatertArsak?: boolean;
    aktivitetIkkeMuligArbeidsrelatertArsakType?: (keyof typeof ArbeidsrelatertArsakType)[];
    aktivitetIkkeMuligArbeidsrelatertArsakBeskrivelse?: string;
    // Perioder for sykmelding for behandlignsdager
    behandlingsdagerSykmelding: boolean;
    behandlingsdagerPeriode?: Date[];
    behandlingsdagerAntall?: number;
    // Perioder for sykmelding med reisetilskudd
    reisetilskuddSykmelding: boolean;
    reisetilskuddPeriode?: Date[];
};

type MulighetForArbeidSectionProps = {
    section: Section;
    setSchema: (value: React.SetStateAction<SchemaType>) => void;
    errors: ErrorSchemaType;
    validate: Validate;
    schema: SchemaType;
};

const MulighetForArbeidSection = ({ section, setSchema, schema, errors, validate }: MulighetForArbeidSectionProps) => {
    return (
        <SectionContainer id="mulighetForArbeid" section={section} sectionError={errors.mulighetForArbeid}>
            <Subsection sectionIdentifier="4.1">
                <Checkbox
                    id="avventendeSykmelding"
                    checked={schema.avventendeSykmelding}
                    label="Pasienten kan benytte avventende sykmelding"
                    onChange={() => {
                        setSchema(
                            (state): SchemaType => {
                                validate('avventendeSykmelding', !state.avventendeSykmelding);
                                validate('mulighetForArbeid', !state.avventendeSykmelding);
                                return {
                                    ...state,
                                    avventendeSykmelding: !state.avventendeSykmelding,
                                };
                            },
                        );
                    }}
                    feil={errors.avventendeSykmelding}
                />
                <br />
                <ExpandableField show={schema.avventendeSykmelding}>
                    <>
                        <RangePicker
                            id="avventendePeriode"
                            labelFrom="4.1.1 f.o.m."
                            labelTo="4.1.2 t.o.m."
                            value={schema.avventendePeriode || []}
                            onChange={newDates => {
                                console.log(newDates);
                                setSchema(
                                    (state): SchemaType => ({
                                        ...state,
                                        avventendePeriode: newDates,
                                    }),
                                );
                                validate('avventendePeriode', newDates);
                            }}
                            feil={errors.avventendePeriode}
                        />
                        <Textarea
                            id="avventendeInnspillTilArbeidsgiver"
                            maxLength={0}
                            value={schema.avventendeInnspillTilArbeidsgiver || ''}
                            onChange={({ target: { value } }) => {
                                setSchema(
                                    (state): SchemaType => ({
                                        ...state,
                                        avventendeInnspillTilArbeidsgiver: value,
                                    }),
                                );
                                validate('avventendeInnspillTilArbeidsgiver', value);
                            }}
                            feil={errors.avventendeInnspillTilArbeidsgiver}
                            label={<Element>4.1.3 Innspill til arbeidsgiver om tilrettelegging</Element>}
                        />
                    </>
                </ExpandableField>
            </Subsection>
            <Subsection sectionIdentifier="4.2">
                <Checkbox
                    id="gradertSykmelding"
                    checked={schema.gradertSykmelding}
                    label="Pasienten kan være delvis i arbeid (gradert sykmelding)"
                    onChange={() => {
                        setSchema(
                            (state): SchemaType => {
                                validate('gradertSykmelding', !state.gradertSykmelding);
                                validate('mulighetForArbeid', !state.gradertSykmelding);
                                return {
                                    ...state,
                                    gradertSykmelding: !state.gradertSykmelding,
                                };
                            },
                        );
                    }}
                    feil={errors.gradertSykmelding}
                />
                <br />
                <ExpandableField show={schema.gradertSykmelding}>
                    <>
                        <RangePicker
                            id="gradertPeriode"
                            labelFrom="4.2.1 f.o.m."
                            labelTo="4.2.2 t.o.m."
                            value={schema.gradertPeriode || []}
                            onChange={newDates =>
                                setSchema(
                                    (state): SchemaType => ({
                                        ...state,
                                        gradertPeriode: newDates,
                                    }),
                                )
                            }
                            feil={errors.gradertPeriode}
                        />
                        <Input
                            id="gradertGrad"
                            className="form-margin-bottom half"
                            type="number"
                            value={schema.gradertGrad}
                            onChange={({ target: { value } }) => {
                                setSchema(
                                    (state): SchemaType => ({
                                        ...state,
                                        gradertGrad: parseInt(value),
                                    }),
                                );
                                validate('gradertGrad', value);
                            }}
                            feil={errors.gradertGrad}
                            label={<Element>4.2.3 Oppgi grad for sykmelding</Element>}
                        />
                    </>
                </ExpandableField>
                <Element className="form-label">4.2.4</Element>
                <Checkbox
                    id="gradertReisetilskudd"
                    checked={schema.gradertReisetilskudd}
                    label="Pasienten kan være delvis i arbeid ved bruk av reisetilskudd"
                    onChange={() => {
                        setSchema(
                            (state): SchemaType => ({
                                ...state,
                                gradertReisetilskudd: !state.gradertReisetilskudd,
                            }),
                        );
                        validate('gradertReisetilskudd', schema.gradertReisetilskudd);
                    }}
                    feil={errors.gradertReisetilskudd}
                />
            </Subsection>

            <Subsection sectionIdentifier="4.3">
                <Checkbox
                    id="aktivitetIkkeMuligSykmelding"
                    checked={schema.aktivitetIkkeMuligSykmelding}
                    label="Pasienten kan ikke være i arbeid (100 prosent sykmelding)"
                    onChange={() => {
                        setSchema(
                            (state): SchemaType => {
                                validate('aktivitetIkkeMuligSykmelding', !state.aktivitetIkkeMuligSykmelding);
                                validate('mulighetForArbeid', !state.aktivitetIkkeMuligSykmelding);
                                return {
                                    ...state,
                                    aktivitetIkkeMuligSykmelding: !state.aktivitetIkkeMuligSykmelding,
                                };
                            },
                        );
                    }}
                    feil={errors.aktivitetIkkeMuligSykmelding}
                />
                <br />
                <ExpandableField show={schema.aktivitetIkkeMuligSykmelding}>
                    <>
                        <RangePicker
                            id="aktivitetIkkeMuligPeriode"
                            labelFrom="4.3.1 f.o.m."
                            labelTo="4.3.2 t.o.m."
                            value={schema.aktivitetIkkeMuligPeriode || []}
                            onChange={newDates =>
                                setSchema(
                                    (state): SchemaType => ({
                                        ...state,
                                        aktivitetIkkeMuligPeriode: newDates,
                                    }),
                                )
                            }
                            feil={errors.aktivitetIkkeMuligPeriode}
                        />
                        <Element className="form-label">4.3.3</Element>
                        <Checkbox
                            id="aktivitetIkkeMuligMedisinskArsak"
                            className="form-margin-bottom"
                            checked={schema.aktivitetIkkeMuligMedisinskArsak}
                            label="Det er medisinske årsaker som hindrer arbeidsrelatert aktivitet"
                            onChange={() =>
                                setSchema(
                                    (state): SchemaType => ({
                                        ...state,
                                        aktivitetIkkeMuligMedisinskArsak: !state.aktivitetIkkeMuligMedisinskArsak,
                                    }),
                                )
                            }
                            feil={errors.aktivitetIkkeMuligMedisinskArsak}
                        />
                        <ExpandableField show={schema.aktivitetIkkeMuligMedisinskArsak}>
                            <>
                                <Select
                                    id="aktivitetIkkeMuligMedisinskArsakType"
                                    onChange={({ target: { value } }) => {
                                        if (value === '0') {
                                            setSchema(
                                                (state): SchemaType => ({
                                                    ...state,
                                                    aktivitetIkkeMuligMedisinskArsakType: undefined,
                                                }),
                                            );
                                            validate('aktivitetIkkeMuligMedisinskArsakType', undefined);
                                        } else {
                                            setSchema(
                                                (state): SchemaType => ({
                                                    ...state,
                                                    aktivitetIkkeMuligMedisinskArsakType: [
                                                        value,
                                                    ] as (keyof typeof MedisinskArsakType)[],
                                                }),
                                            );
                                            validate('aktivitetIkkeMuligMedisinskArsakType', [
                                                value,
                                            ] as (keyof typeof MedisinskArsakType)[]);
                                        }
                                    }}
                                    value={schema.aktivitetIkkeMuligMedisinskArsakType}
                                    className="form-margin-bottom"
                                    label={<Element>Medisinsk årsak</Element>}
                                    feil={errors.aktivitetIkkeMuligMedisinskArsakType}
                                >
                                    <option value="0">Velg</option>
                                    {Object.entries(MedisinskArsakType).map(([key, value]) => {
                                        return (
                                            <option key={key} value={key}>
                                                {value}
                                            </option>
                                        );
                                    })}
                                </Select>
                                <Input
                                    id="aktivitetIkkeMuligMedisinskArsakBeskrivelse"
                                    className="form-margin-bottom"
                                    type="text"
                                    onChange={({ target: { value } }) => {
                                        setSchema(
                                            (state): SchemaType => ({
                                                ...state,
                                                aktivitetIkkeMuligMedisinskArsakBeskrivelse: value,
                                            }),
                                        );
                                        validate('aktivitetIkkeMuligMedisinskArsakBeskrivelse', value);
                                    }}
                                    label={<Element>Beskrivelse</Element>}
                                    feil={errors.aktivitetIkkeMuligMedisinskArsakBeskrivelse}
                                />
                            </>
                        </ExpandableField>
                        <Element className="form-label">4.3.4</Element>
                        <Checkbox
                            id="aktivitetIkkeMuligArbeidsrelatertArsak"
                            className="form-margin-bottom"
                            checked={schema.aktivitetIkkeMuligArbeidsrelatertArsak}
                            label="Forhold på arbeidsplassen vanskeliggjør arbeidsrelatert aktivitet"
                            onChange={() =>
                                setSchema(
                                    (state): SchemaType => ({
                                        ...state,
                                        aktivitetIkkeMuligArbeidsrelatertArsak: !state.aktivitetIkkeMuligArbeidsrelatertArsak,
                                    }),
                                )
                            }
                            feil={errors.aktivitetIkkeMuligArbeidsrelatertArsak}
                        />
                        <ExpandableField show={schema.aktivitetIkkeMuligArbeidsrelatertArsak}>
                            <>
                                <Select
                                    id="aktivitetIkkeMuligArbeidsrelatertArsakType"
                                    onChange={({ target: { value } }) => {
                                        if (value === '0') {
                                            setSchema(
                                                (state): SchemaType => ({
                                                    ...state,
                                                    aktivitetIkkeMuligArbeidsrelatertArsakType: undefined,
                                                }),
                                            );
                                            validate('aktivitetIkkeMuligArbeidsrelatertArsakType', undefined);
                                        } else {
                                            setSchema(
                                                (state): SchemaType => ({
                                                    ...state,
                                                    aktivitetIkkeMuligArbeidsrelatertArsakType: [
                                                        value,
                                                    ] as (keyof typeof ArbeidsrelatertArsakType)[],
                                                }),
                                            );
                                            validate('aktivitetIkkeMuligArbeidsrelatertArsakType', [
                                                value,
                                            ] as (keyof typeof ArbeidsrelatertArsakType)[]);
                                        }
                                    }}
                                    value={schema.aktivitetIkkeMuligArbeidsrelatertArsakType}
                                    className="form-margin-bottom"
                                    label={<Element>Arbeidsrelatert årsak</Element>}
                                    feil={errors.aktivitetIkkeMuligArbeidsrelatertArsakType}
                                >
                                    <option value="0">Velg</option>
                                    {Object.entries(ArbeidsrelatertArsakType).map(([key, value]) => {
                                        return (
                                            <option key={key} value={key}>
                                                {value}
                                            </option>
                                        );
                                    })}
                                </Select>
                                <Input
                                    id="aktivitetIkkeMuligArbeidsrelatertArsakBeskrivelse"
                                    className="form-margin-bottom"
                                    type="text"
                                    onChange={({ target: { value } }) => {
                                        setSchema(
                                            (state): SchemaType => ({
                                                ...state,
                                                aktivitetIkkeMuligArbeidsrelatertArsakBeskrivelse: value,
                                            }),
                                        );
                                        validate('aktivitetIkkeMuligArbeidsrelatertArsakBeskrivelse', value);
                                    }}
                                    label={<Element>Beskrivelse</Element>}
                                    feil={errors.aktivitetIkkeMuligArbeidsrelatertArsakBeskrivelse}
                                />
                            </>
                        </ExpandableField>
                    </>
                </ExpandableField>
            </Subsection>

            <Subsection sectionIdentifier="4.4">
                <Checkbox
                    id="behandlingsdagerSykmelding"
                    checked={schema.behandlingsdagerSykmelding}
                    label="Pasienten kan ikke være i arbeid på behandlingsdager"
                    onChange={() => {
                        setSchema(
                            (state): SchemaType => {
                                validate('behandlingsdagerSykmelding', !state.behandlingsdagerSykmelding);
                                validate('mulighetForArbeid', !state.behandlingsdagerSykmelding);
                                return {
                                    ...state,
                                    behandlingsdagerSykmelding: !state.behandlingsdagerSykmelding,
                                };
                            },
                        );
                    }}
                    feil={errors.behandlingsdagerSykmelding}
                />
                <br />
                <ExpandableField show={schema.behandlingsdagerSykmelding}>
                    <>
                        <RangePicker
                            id="behandlingsdagerPeriode"
                            labelFrom="4.4.1 f.o.m."
                            labelTo="4.4.2 t.o.m."
                            value={schema.behandlingsdagerPeriode || []}
                            onChange={newDates => {
                                setSchema(
                                    (state): SchemaType => ({
                                        ...state,
                                        behandlingsdagerPeriode: newDates,
                                    }),
                                );
                                validate('behandlingsdagerPeriode', newDates);
                            }}
                            feil={errors.behandlingsdagerPeriode}
                        />

                        <Input
                            id="behandlingsdagerAntall"
                            className="form-margin-bottom half"
                            type="number"
                            value={schema.behandlingsdagerAntall}
                            onChange={({ target: { value } }) => {
                                setSchema(
                                    (state): SchemaType => ({
                                        ...state,
                                        behandlingsdagerAntall: Number(value),
                                    }),
                                );
                                validate('behandlingsdagerAntall', value);
                            }}
                            feil={errors.behandlingsdagerAntall}
                            label={<Element>4.4.3 Oppgi antall dager i perioden</Element>}
                        />
                    </>
                </ExpandableField>
            </Subsection>

            <Subsection sectionIdentifier="4.5" underline={false}>
                <Checkbox
                    id="reisetilskuddSykmelding"
                    checked={schema.reisetilskuddSykmelding}
                    label="Pasienten kan være i fullt arbeid ved bruk av reisetilskudd"
                    onChange={() => {
                        setSchema(
                            (state): SchemaType => {
                                validate('reisetilskuddSykmelding', !state.reisetilskuddSykmelding);
                                validate('mulighetForArbeid', !state.reisetilskuddSykmelding);
                                return {
                                    ...state,
                                    reisetilskuddSykmelding: !state.reisetilskuddSykmelding,
                                };
                            },
                        );
                    }}
                    feil={errors.reisetilskuddSykmelding}
                />
                <br />
                <ExpandableField show={schema.reisetilskuddSykmelding}>
                    <RangePicker
                        id="reisetilskuddPeriode"
                        labelFrom="4.5.1 f.o.m."
                        labelTo="4.5.2 t.o.m."
                        value={schema.reisetilskuddPeriode || []}
                        onChange={newDates => {
                            setSchema(
                                (state): SchemaType => ({
                                    ...state,
                                    reisetilskuddPeriode: newDates,
                                }),
                            );
                            validate('reisetilskuddPeriode', newDates);
                        }}
                        feil={errors.reisetilskuddPeriode}
                    />
                </ExpandableField>
            </Subsection>
        </SectionContainer>
    );
};

export default MulighetForArbeidSection;
