import React from 'react';
import { Checkbox, Input, Textarea } from 'nav-frontend-skjema';
import { Element } from 'nav-frontend-typografi';

import ArbeidsrelatertArsak from './ArbeidsrelatertArsak';
import ExpandableField from '../../formComponents/ExpandableField';
import MedisinskArsak from './MedisinskArsak';
import RangePicker from '../../formComponents/RangePicker';
import SectionContainer from '../../SectionContainer';
import Subsection from '../../formComponents/Subsection';
import { ArbeidsrelatertArsakType, MedisinskArsakType } from '../../../../../types/RegistrertSykmelding';
import { ErrorSchemaType, SchemaType } from '../../../Form';
import { Section } from '../../../../../types/Section';
import { Validate } from '../../../validation';

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
    aktivitetIkkeMuligMedisinskArsakBeskrivelse?: string | null;
    aktivitetIkkeMuligArbeidsrelatertArsak?: boolean;
    aktivitetIkkeMuligArbeidsrelatertArsakType?: (keyof typeof ArbeidsrelatertArsakType)[];
    aktivitetIkkeMuligArbeidsrelatertArsakBeskrivelse?: string | null;
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
    schema: SchemaType;
    setSchema: (value: React.SetStateAction<SchemaType>) => void;
    errors: ErrorSchemaType;
    validate: Validate;
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
                                const updatedSchema = {
                                    ...state,
                                    avventendeSykmelding: !state.avventendeSykmelding,
                                    avventendePeriode: undefined,
                                    avventendeInnspillTilArbeidsgiver: undefined,
                                };
                                validate('avventendeSykmelding', updatedSchema);
                                validate('mulighetForArbeid', updatedSchema);
                                return updatedSchema;
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
                            onChange={(newDates) => {
                                setSchema(
                                    (state): SchemaType => {
                                        const updatedSchema = {
                                            ...state,
                                            avventendePeriode: newDates,
                                        };
                                        validate('avventendePeriode', updatedSchema);

                                        return updatedSchema;
                                    },
                                );
                            }}
                            feil={errors.avventendePeriode}
                        />
                        <Textarea
                            id="avventendeInnspillTilArbeidsgiver"
                            maxLength={0}
                            value={schema.avventendeInnspillTilArbeidsgiver || ''}
                            onChange={({ target: { value } }) => {
                                setSchema(
                                    (state): SchemaType => {
                                        const updatedSchema = {
                                            ...state,
                                            avventendeInnspillTilArbeidsgiver: value,
                                        };
                                        validate('avventendeInnspillTilArbeidsgiver', updatedSchema);
                                        return updatedSchema;
                                    },
                                );
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
                                const updatedSchema = {
                                    ...state,
                                    gradertSykmelding: !state.gradertSykmelding,
                                    gradertPeriode: undefined,
                                    gradertGrad: undefined,
                                };
                                validate('gradertSykmelding', updatedSchema);
                                validate('mulighetForArbeid', updatedSchema);
                                return updatedSchema;
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
                            onChange={(newDates) =>
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
                                    (state): SchemaType => {
                                        const updatedSchema = {
                                            ...state,
                                            gradertGrad: parseInt(value),
                                        };
                                        validate('gradertGrad', updatedSchema);
                                        return updatedSchema;
                                    },
                                );
                            }}
                            feil={errors.gradertGrad}
                            label="4.2.3 Oppgi grad for sykmelding"
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
                            (state): SchemaType => {
                                const updatedSchema = {
                                    ...state,
                                    gradertReisetilskudd: !state.gradertReisetilskudd,
                                };
                                validate('gradertReisetilskudd', updatedSchema);
                                return updatedSchema;
                            },
                        );
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
                                const updatedSchema = {
                                    ...state,
                                    aktivitetIkkeMuligSykmelding: !state.aktivitetIkkeMuligSykmelding,
                                    aktivitetIkkeMuligPeriode: undefined,
                                    aktivitetIkkeMuligMedisinskArsak: undefined,
                                    aktivitetIkkeMuligMedisinskArsakType: undefined,
                                    aktivitetIkkeMuligMedisinskArsakBeskrivelse: undefined,
                                    aktivitetIkkeMuligArbeidsrelatertArsak: undefined,
                                    aktivitetIkkeMuligArbeidsrelatertArsakType: undefined,
                                    aktivitetIkkeMuligArbeidsrelatertArsakBeskrivelse: undefined,
                                };
                                validate('aktivitetIkkeMuligSykmelding', updatedSchema);
                                validate('mulighetForArbeid', updatedSchema);
                                return updatedSchema;
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
                            onChange={(newDates) =>
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
                                    (state): SchemaType => {
                                        const updatedSchema = {
                                            ...state,
                                            aktivitetIkkeMuligMedisinskArsak: !state.aktivitetIkkeMuligMedisinskArsak,
                                            aktivitetIkkeMuligMedisinskArsakType: undefined,
                                            aktivitetIkkeMuligMedisinskArsakBeskrivelse: undefined,
                                        };

                                        validate('aktivitetIkkeMuligMedisinskArsakType', updatedSchema);
                                        return updatedSchema;
                                    },
                                )
                            }
                            feil={errors.aktivitetIkkeMuligMedisinskArsak}
                        />
                        <ExpandableField show={schema.aktivitetIkkeMuligMedisinskArsak}>
                            <>
                                <MedisinskArsak
                                    schema={schema}
                                    setSchema={setSchema}
                                    errors={errors}
                                    validate={validate}
                                />
                                <Input
                                    id="aktivitetIkkeMuligMedisinskArsakBeskrivelse"
                                    className="form-margin-bottom"
                                    value={
                                        schema.aktivitetIkkeMuligMedisinskArsakBeskrivelse
                                            ? schema.aktivitetIkkeMuligMedisinskArsakBeskrivelse
                                            : undefined
                                    }
                                    type="text"
                                    onChange={({ target: { value } }) => {
                                        setSchema(
                                            (state): SchemaType => {
                                                const updatedSchema = {
                                                    ...state,
                                                    aktivitetIkkeMuligMedisinskArsakBeskrivelse: value,
                                                };
                                                validate('aktivitetIkkeMuligMedisinskArsakBeskrivelse', updatedSchema);
                                                return updatedSchema;
                                            },
                                        );
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
                                        aktivitetIkkeMuligArbeidsrelatertArsakType: undefined,
                                        aktivitetIkkeMuligArbeidsrelatertArsakBeskrivelse: undefined,
                                    }),
                                )
                            }
                            feil={errors.aktivitetIkkeMuligArbeidsrelatertArsak}
                        />
                        <ExpandableField show={schema.aktivitetIkkeMuligArbeidsrelatertArsak}>
                            <>
                                <ArbeidsrelatertArsak
                                    schema={schema}
                                    setSchema={setSchema}
                                    errors={errors}
                                    validate={validate}
                                />
                                <Input
                                    id="aktivitetIkkeMuligArbeidsrelatertArsakBeskrivelse"
                                    className="form-margin-bottom"
                                    value={
                                        schema.aktivitetIkkeMuligArbeidsrelatertArsakBeskrivelse
                                            ? schema.aktivitetIkkeMuligArbeidsrelatertArsakBeskrivelse
                                            : undefined
                                    }
                                    type="text"
                                    onChange={({ target: { value } }) => {
                                        setSchema(
                                            (state): SchemaType => {
                                                const updatedSchema = {
                                                    ...state,
                                                    aktivitetIkkeMuligArbeidsrelatertArsakBeskrivelse: value,
                                                };
                                                validate(
                                                    'aktivitetIkkeMuligArbeidsrelatertArsakBeskrivelse',
                                                    updatedSchema,
                                                );
                                                return updatedSchema;
                                            },
                                        );
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
                                const updatedSchema = {
                                    ...state,
                                    behandlingsdagerSykmelding: !state.behandlingsdagerSykmelding,
                                };
                                validate('behandlingsdagerSykmelding', updatedSchema);
                                validate('mulighetForArbeid', updatedSchema);
                                return updatedSchema;
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
                            onChange={(newDates) => {
                                setSchema(
                                    (state): SchemaType => {
                                        const updatedSchema = {
                                            ...state,
                                            behandlingsdagerPeriode: newDates,
                                        };
                                        validate('behandlingsdagerPeriode', updatedSchema);
                                        return updatedSchema;
                                    },
                                );
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
                                    (state): SchemaType => {
                                        const updatedSchema = {
                                            ...state,
                                            behandlingsdagerAntall: Number(value),
                                        };
                                        validate('behandlingsdagerAntall', updatedSchema);
                                        return updatedSchema;
                                    },
                                );
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
                                const updatedSchema = {
                                    ...state,
                                    reisetilskuddSykmelding: !state.reisetilskuddSykmelding,
                                };
                                validate('reisetilskuddSykmelding', updatedSchema);
                                validate('mulighetForArbeid', updatedSchema);
                                return updatedSchema;
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
                        onChange={(newDates) => {
                            setSchema(
                                (state): SchemaType => {
                                    const updatedSchema = {
                                        ...state,
                                        reisetilskuddPeriode: newDates,
                                    };
                                    validate('reisetilskuddPeriode', updatedSchema);
                                    return updatedSchema;
                                },
                            );
                        }}
                        feil={errors.reisetilskuddPeriode}
                    />
                </ExpandableField>
            </Subsection>
        </SectionContainer>
    );
};

export default MulighetForArbeidSection;
