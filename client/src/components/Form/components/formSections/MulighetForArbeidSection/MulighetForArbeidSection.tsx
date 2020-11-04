import React from 'react';
import { Checkbox, Input, Select, Textarea } from 'nav-frontend-skjema';
import { Element } from 'nav-frontend-typografi';
import { Knapp } from 'nav-frontend-knapper';

import ArbeidsrelatertArsak from './ArbeidsrelatertArsak';
import AvventendeArsak from './AvventendeArsak';
import ExpandableField from '../../formComponents/ExpandableField';
import MedisinskArsak from './MedisinskArsak';
import RangePicker from '../../formComponents/RangePicker';
import SectionContainer from '../../SectionContainer';
import Subsection from '../../formComponents/Subsection';
import { ArbeidsrelatertArsakType, MedisinskArsakType } from '../../../../../types/RegistrertSykmelding';
import { ErrorSchemaType, SchemaType } from '../../../Form';
import { Section } from '../../../../../types/Section';
import { Validate } from '../../../validation';

export type AvventendeMFA = {
    type: MFAOptions;
    // Perioder for avventende sykmelding
    avventendePeriode?: Date[];
    avventendeInnspillTilArbeidsgiver?: string;
};

export type GradertMFA = {
    type: MFAOptions;
    // Perioder for gradert sykmelding
    gradertPeriode?: Date[];
    gradertGrad?: number;
    gradertReisetilskudd: boolean;
};

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

    const getPeriodDisplay = (mulighetForArbeid: MulighetForArbeidTypes, index: number) => {
        if (!mulighetForArbeid) {
            return undefined;
        }

        if (mulighetForArbeid.type === 'avventende') {
            return (
                <AvventendeArsak
                    updateMfa={(updatedMfa) =>
                        setSchema(
                            (state): SchemaType => {
                                // TODO: Fix this so it doesn't require "as"
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
            );
        }

        if (mulighetForArbeid.type === 'gradert') {
            return <div>gradert</div>;
        }

        if (mulighetForArbeid.type === 'fullsykmelding') {
            return <div>fullsykmelding</div>;
        }

        if (mulighetForArbeid.type === 'behandlingsdager') {
            return <div>behandlingsdager</div>;
        }

        return undefined;
    };

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
                        {getPeriodDisplay(mulighetForArbeid, index)}
                    </>
                ))}

            <Knapp
                onClick={(event) => {
                    event.preventDefault();
                    setSchema(
                        (state): SchemaType => {
                            if (state.mulighetForArbeid.length === 0) {
                                const updatedState = {
                                    ...state,
                                    mulighetForArbeid: [undefined, undefined],
                                };
                                return updatedState;
                            }

                            const updatedState = {
                                ...state,
                                mulighetForArbeid: [...state.mulighetForArbeid, undefined],
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
                                validate('aktivitetIkkeMuligPeriode', updatedSchema);
                                validate('aktivitetIkkeMuligMedisinskArsak', updatedSchema);
                                validate('aktivitetIkkeMuligMedisinskArsakType', updatedSchema);
                                validate('aktivitetIkkeMuligMedisinskArsakBeskrivelse', updatedSchema);
                                validate('aktivitetIkkeMuligArbeidsrelatertArsak', updatedSchema);
                                validate('aktivitetIkkeMuligArbeidsrelatertArsakType', updatedSchema);
                                validate('aktivitetIkkeMuligArbeidsrelatertArsakBeskrivelse', updatedSchema);
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
                            onChange={(newDates) => {
                                setSchema(
                                    (state): SchemaType => {
                                        const updatedSchema = {
                                            ...state,
                                            aktivitetIkkeMuligPeriode: newDates,
                                        };
                                        validate('aktivitetIkkeMuligPeriode', updatedSchema);

                                        return updatedSchema;
                                    },
                                );
                            }}
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
                                        validate('aktivitetIkkeMuligMedisinskArsak', updatedSchema);
                                        validate('aktivitetIkkeMuligMedisinskArsakType', updatedSchema);
                                        validate('aktivitetIkkeMuligMedisinskArsakBeskrivelse', updatedSchema);
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
