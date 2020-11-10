import React from 'react';
import { Element } from 'nav-frontend-typografi';
import { Knapp } from 'nav-frontend-knapper';
import { Select } from 'nav-frontend-skjema';

import AvventendeArsak from './AvventendeArsak';
import SectionContainer from '../../SectionContainer';
import FullSykmelding, { FullSykmeldingMFA } from './FullSykmelding';
import GradertArsak, { GradertMFA } from './GradertArsak';
import { ErrorSchemaType, SchemaType } from '../../../Form';
import { Section } from '../../../../../types/Section';
import { Validate } from '../../../validation';

export type AvventendeMFA = {
    type: MFAOptions;
    // Perioder for avventende sykmelding
    avventendePeriode?: Date[];
    avventendeInnspillTilArbeidsgiver?: string;
};

export type BehandlingsdagerMFA = {
    type: MFAOptions;
    // Perioder for sykmelding for behandlignsdager
    behandlingsdagerPeriode?: Date[];
    behandlingsdagerAntall?: number;
};

export type ReisetilskuddMFA = {
    type: MFAOptions;
    // Perioder for sykmelding med reisetilskudd
    reisetilskuddPeriode?: Date[];
};

export type MulighetForArbeidTypes =
    | AvventendeMFA
    | GradertMFA
    | FullSykmeldingMFA
    | BehandlingsdagerMFA
    | ReisetilskuddMFA
    | undefined;

export type MulighetForArbeid = {
    mulighetForArbeid: MulighetForArbeidTypes[];
};

export type MFAOptions = 'velg' | 'avventende' | 'gradert' | 'fullsykmelding' | 'behandlingsdager' | 'reisetilskudd';

type MulighetForArbeidSectionProps = {
    section: Section;
    schema: SchemaType;
    setSchema: (value: React.SetStateAction<SchemaType>) => void;
    errors: ErrorSchemaType;
    validate: Validate;
};

const MulighetForArbeidSection = ({ section, setSchema, schema, errors, validate }: MulighetForArbeidSectionProps) => {
    console.log(schema.mulighetForArbeid);

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

        // reisetilskudd

        return undefined;
    };

    const mergeMFAAtIndex = (mfa: MulighetForArbeidTypes, state: SchemaType, index: number) => {
        return [...state.mulighetForArbeid.slice(0, index), mfa, ...state.mulighetForArbeid.slice(index + 1)];
    };

    return (
        <SectionContainer section={section} sectionError={errors.mulighetForArbeid}>
            {schema.mulighetForArbeid.length === 0 && (
                <Select
                    id="mulighetForArbeid"
                    value={undefined}
                    onChange={({ target: { value } }) => {
                        setSchema(
                            (state): SchemaType => {
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
                    feil={errors.harArbeidsgiver}
                >
                    {periodOptions}
                </Select>
            )}

            {schema.mulighetForArbeid.length > 0 &&
                schema.mulighetForArbeid.map((mulighetForArbeid, index) => (
                    <>
                        <Select
                            id="mulighetForArbeid"
                            value={mulighetForArbeid && mulighetForArbeid.type}
                            onChange={({ target: { value } }) => {
                                setSchema(
                                    (state): SchemaType => {
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
                            feil={errors.harArbeidsgiver}
                        >
                            {periodOptions}
                        </Select>
                        {mulighetForArbeid?.type === 'avventende' && (
                            <AvventendeArsak
                                updateMfa={(updatedMfa) =>
                                    setSchema(
                                        (state): SchemaType => {
                                            const updatedMulighetForArbeid = mergeMFAAtIndex(updatedMfa, state, index);

                                            return {
                                                ...state,
                                                mulighetForArbeid: updatedMulighetForArbeid,
                                            };
                                        },
                                    )
                                }
                                mulighetForArbeid={mulighetForArbeid as AvventendeMFA}
                                errors={errors}
                                validate={validate}
                            />
                        )}
                        {mulighetForArbeid?.type === 'gradert' && (
                            <GradertArsak
                                updateMfa={(updatedMfa) =>
                                    setSchema(
                                        (state): SchemaType => {
                                            const updatedMulighetForArbeid = mergeMFAAtIndex(updatedMfa, state, index);

                                            return {
                                                ...state,
                                                mulighetForArbeid: updatedMulighetForArbeid,
                                            };
                                        },
                                    )
                                }
                                mulighetForArbeid={mulighetForArbeid as GradertMFA}
                                errors={errors}
                                validate={validate}
                            />
                        )}
                        {mulighetForArbeid?.type === 'fullsykmelding' && (
                            <FullSykmelding
                                updateMfa={(updatedMfa) =>
                                    setSchema(
                                        (state): SchemaType => {
                                            const updatedMulighetForArbeid = mergeMFAAtIndex(updatedMfa, state, index);

                                            return {
                                                ...state,
                                                mulighetForArbeid: updatedMulighetForArbeid,
                                            };
                                        },
                                    )
                                }
                                mulighetForArbeid={mulighetForArbeid as FullSykmeldingMFA}
                                errors={errors}
                                validate={validate}
                            />
                        )}
                        {mulighetForArbeid?.type === 'behandlingsdager' && <div>behandlingsdager</div>}
                        {mulighetForArbeid?.type === 'reisetilskudd' && <div>reisetilskudd</div>}
                    </>
                ))}

            <Knapp
                onClick={(event) => {
                    event.preventDefault();
                    setSchema(
                        (state): SchemaType => {
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
                Legg til
            </Knapp>
        </SectionContainer>
    );

    /*
        <SectionContainer section={section} sectionError={errors.mulighetForArbeid}>
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
                                validate('avventendePeriode', updatedSchema);
                                validate('avventendeInnspillTilArbeidsgiver', updatedSchema);
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
                                validate('gradertPeriode', updatedSchema);
                                validate('gradertGrad', updatedSchema);
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
                            onChange={(newDates) => {
                                setSchema(
                                    (state): SchemaType => {
                                        const updatedSchema = {
                                            ...state,
                                            gradertPeriode: newDates,
                                        };
                                        validate('gradertPeriode', updatedSchema);

                                        return updatedSchema;
                                    },
                                );
                            }}
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
                                    behandlingsdagerPeriode: undefined,
                                    behandlingsdagerAntall: undefined,
                                };
                                validate('behandlingsdagerSykmelding', updatedSchema);
                                validate('behandlingsdagerPeriode', updatedSchema);
                                validate('behandlingsdagerAntall', updatedSchema);
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
                                    reisetilskuddPeriode: undefined,
                                };
                                validate('reisetilskuddSykmelding', updatedSchema);
                                validate('reisetilskuddPeriode', updatedSchema);
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
        */
};

export default MulighetForArbeidSection;
