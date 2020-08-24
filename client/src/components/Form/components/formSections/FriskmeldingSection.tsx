import React from 'react';
import { Checkbox, Textarea } from 'nav-frontend-skjema';
import { Element } from 'nav-frontend-typografi';

import DatePicker from '../formComponents/DatePicker';
import ExpandableField from '../formComponents/ExpandableField';
import SectionContainer from '../SectionContainer';
import Subsection from '../formComponents/Subsection';
import { ErrorSchemaType, SchemaType } from '../../Form';
import { Section } from '../../../../types/Section';
import { Validate } from '../../validation';

export type Friskmelding = {
    arbeidsfoerEtterPeriode: boolean;
    hensynArbeidsplassen?: string | null;
    erIArbeid?: boolean;
    erIkkeIArbeid?: boolean;
    egetArbeidPaSikt: boolean;
    annetArbeidPaSikt: boolean;
    arbeidFOM?: Date | null;
    vurderingsDatoIArbeid?: Date | null;
    arbeidsforPaSikt: boolean;
    arbeidsforFOM?: Date | null;
    vurderingsDatoUtenArbeid?: Date | null;
};

type FriskmeldingSectionProps = {
    section: Section;
    setSchema: (value: React.SetStateAction<SchemaType>) => void;
    schema: SchemaType;
    errors: ErrorSchemaType;
    validate: Validate;
};

const FriskmeldingSection = ({ section, setSchema, schema, errors, validate }: FriskmeldingSectionProps) => {
    return (
        <SectionContainer section={section}>
            <Subsection sectionIdentifier="5.1" underline={true}>
                <Checkbox
                    id="arbeidsfoerEtterPeriode"
                    checked={schema.arbeidsfoerEtterPeriode}
                    label="Pasienten er 100 prosent arbeidsfør etter denne perioden"
                    onChange={() =>
                        setSchema(
                            (state): SchemaType => {
                                const updatedSchema = {
                                    ...state,
                                    arbeidsfoerEtterPeriode: !state.arbeidsfoerEtterPeriode,
                                    hensynArbeidsplassen: undefined,
                                };
                                validate('arbeidsfoerEtterPeriode', updatedSchema);
                                return updatedSchema;
                            },
                        )
                    }
                    feil={errors.arbeidsfoerEtterPeriode}
                />
                <br />
                <ExpandableField show={schema.arbeidsfoerEtterPeriode}>
                    <Textarea
                        id="hensynArbeidsplassen"
                        maxLength={0}
                        value={schema.hensynArbeidsplassen || ''}
                        onChange={({ target: { value } }) => {
                            setSchema(
                                (state): SchemaType => {
                                    const updatedSchema = {
                                        ...state,
                                        hensynArbeidsplassen: value,
                                    };
                                    validate('hensynArbeidsplassen', updatedSchema);
                                    return updatedSchema;
                                },
                            );
                        }}
                        feil={errors.hensynArbeidsplassen}
                        label={<Element>5.1.1 Beskrive eventuelle hensyn som må tas på arbeidsplassen</Element>}
                    />
                </ExpandableField>
            </Subsection>

            <Subsection sectionIdentifier="5.2" underline={true}>
                <Checkbox
                    id="erIArbeid"
                    checked={schema.erIArbeid}
                    label="Pasienten har arbeidsgiver"
                    onChange={() => {
                        setSchema(
                            (state): SchemaType => {
                                const updatedSchema = {
                                    ...state,
                                    erIArbeid: !state.erIArbeid,
                                    egetArbeidPaSikt: false,
                                    arbeidFOM: undefined,
                                    annetArbeidPaSikt: false,
                                    vurderingsDatoIArbeid: undefined,
                                };
                                validate('erIArbeid', updatedSchema);
                                return updatedSchema;
                            },
                        );
                    }}
                    feil={errors.erIArbeid}
                />
                <br />

                <ExpandableField show={schema.erIArbeid}>
                    <Subsection sectionIdentifier="5.2.1" underline={false}>
                        <Checkbox
                            id="egetArbeidPaSikt"
                            checked={schema.egetArbeidPaSikt}
                            label="Pasienten kan på sikt komme tilbake til samme arbeidsgiver"
                            onChange={() =>
                                setSchema(
                                    (state): SchemaType => {
                                        const updatedSchema = {
                                            ...state,
                                            egetArbeidPaSikt: !state.egetArbeidPaSikt,
                                            arbeidFOM: undefined,
                                        };
                                        validate('egetArbeidPaSikt', updatedSchema);
                                        return updatedSchema;
                                    },
                                )
                            }
                            feil={errors.egetArbeidPaSikt}
                        />
                        <br />
                        <ExpandableField show={schema.egetArbeidPaSikt}>
                            <DatePicker
                                id="arbeidFOM"
                                label="Anslå når dette kan skje"
                                value={schema.arbeidFOM ? schema.arbeidFOM : undefined}
                                onChange={(newDate) => {
                                    setSchema(
                                        (state): SchemaType => {
                                            const updatedSchema = {
                                                ...state,
                                                arbeidFOM: newDate,
                                            };
                                            validate('arbeidFOM', updatedSchema);
                                            return updatedSchema;
                                        },
                                    );
                                }}
                                feil={errors.arbeidFOM}
                            />
                        </ExpandableField>
                    </Subsection>

                    <Subsection sectionIdentifier="5.2.2" underline={false}>
                        <Checkbox
                            id="annetArbeidPaSikt"
                            checked={schema.annetArbeidPaSikt}
                            label="Pasienten kan på sikt komme i arbeid hos annen arbeidsgiver"
                            onChange={() =>
                                setSchema(
                                    (state): SchemaType => {
                                        const updatedSchema = {
                                            ...state,
                                            annetArbeidPaSikt: !state.annetArbeidPaSikt,
                                        };
                                        validate('annetArbeidPaSikt', updatedSchema);
                                        return updatedSchema;
                                    },
                                )
                            }
                            feil={errors.annetArbeidPaSikt}
                        />
                    </Subsection>
                    <br />
                    <DatePicker
                        id="vurderingsDatoIArbeid"
                        label="5.2.3 Hvis usikker: Når antar du å kunne gi tilbakemelding på dette?"
                        value={schema.vurderingsDatoIArbeid ? schema.vurderingsDatoIArbeid : undefined}
                        onChange={(newDate) => {
                            setSchema(
                                (state): SchemaType => {
                                    const updatedSchema = {
                                        ...state,
                                        vurderingsDatoIArbeid: newDate,
                                    };

                                    validate('vurderingsDatoIArbeid', updatedSchema);
                                    return updatedSchema;
                                },
                            );
                        }}
                        feil={errors.vurderingsDatoIArbeid}
                    />
                </ExpandableField>
            </Subsection>

            <Subsection sectionIdentifier="5.3" underline={false}>
                <Checkbox
                    id="erIkkeIArbeid"
                    checked={schema.erIkkeIArbeid}
                    label="Pasienten har ikke arbeidsgiver"
                    onChange={() => {
                        setSchema(
                            (state): SchemaType => {
                                const updatedSchema = {
                                    ...state,
                                    erIkkeIArbeid: !state.erIkkeIArbeid,
                                };
                                validate('erIkkeIArbeid', updatedSchema);
                                return updatedSchema;
                            },
                        );
                    }}
                    feil={errors.erIkkeIArbeid}
                />
                <br />

                <ExpandableField show={schema.erIkkeIArbeid}>
                    <Subsection sectionIdentifier="5.3.1" underline={false}>
                        <Checkbox
                            id="arbeidsforPaSikt"
                            checked={schema.arbeidsforPaSikt}
                            label="Pasienten kan komme tilbake i arbeid på sikt"
                            onChange={() =>
                                setSchema(
                                    (state): SchemaType => {
                                        const updatedSchema = {
                                            ...state,
                                            arbeidsforPaSikt: !state.arbeidsforPaSikt,
                                        };
                                        validate('arbeidsforPaSikt', updatedSchema);
                                        return updatedSchema;
                                    },
                                )
                            }
                            feil={errors.arbeidsforPaSikt}
                        />
                        <br />
                        <ExpandableField show={schema.arbeidsforPaSikt}>
                            <DatePicker
                                id="arbeidsforFOM"
                                label="Anslå når dette kan skje"
                                value={schema.arbeidsforFOM ? schema.arbeidsforFOM : undefined}
                                onChange={(newDate) => {
                                    setSchema(
                                        (state): SchemaType => {
                                            const updatedSchema = {
                                                ...state,
                                                arbeidsforFOM: newDate,
                                            };
                                            validate('arbeidsforFOM', updatedSchema);
                                            return updatedSchema;
                                        },
                                    );
                                }}
                                feil={errors.arbeidsforFOM}
                            />
                        </ExpandableField>
                    </Subsection>
                    <DatePicker
                        id="vurderingsDatoUtenArbeid"
                        label="5.3.2 Hvis usikker: Når antar du å kunne gi tilbakemelding på dette?"
                        value={schema.vurderingsDatoUtenArbeid ? schema.vurderingsDatoUtenArbeid : undefined}
                        onChange={(newDate) => {
                            setSchema(
                                (state): SchemaType => {
                                    const updatedSchema = {
                                        ...state,
                                        vurderingsDatoUtenArbeid: newDate,
                                    };
                                    validate('vurderingsDatoUtenArbeid', updatedSchema);
                                    return updatedSchema;
                                },
                            );
                        }}
                        feil={errors.vurderingsDatoUtenArbeid}
                    />
                </ExpandableField>
            </Subsection>
        </SectionContainer>
    );
};

export default FriskmeldingSection;
