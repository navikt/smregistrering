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
    arbeidsfoerEtterPeriode?: boolean;
    hensynPaArbeidsplassen?: string;
    pasientMedArbeidsgiver?: boolean;
    pasientUtenArbeidsgiver?: boolean;
    egetArbeidPaSikt: boolean;
    annetArbeidPaSikt: boolean;
    arbeidFOM?: Date;
    vurderingsDatoIArbeid?: Date;
    arbeidsforPaSikt: boolean;
    arbeidsforFOM?: Date;
    vurderingsDatoUtenArbeid?: Date;
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
                        setSchema(state => ({
                            ...state,
                            arbeidsfoerEtterPeriode: !state.arbeidsfoerEtterPeriode,
                        }))
                    }
                    feil={errors.arbeidsfoerEtterPeriode}
                />
                <br />
                <ExpandableField show={schema.arbeidsfoerEtterPeriode}>
                    <Textarea
                        id="hensynPaArbeidsplassen"
                        maxLength={0}
                        value={schema.hensynPaArbeidsplassen || ''}
                        onChange={({ target: { value } }) => {
                            setSchema(state => ({
                                ...state,
                                hensynPaArbeidsplassen: value,
                            }));
                            validate('hensynPaArbeidsplassen', value);
                        }}
                        feil={errors.hensynPaArbeidsplassen}
                        label={<Element>5.1.1 Beskrive eventuelle hensyn som må tas på arbeidsplassen</Element>}
                    />
                </ExpandableField>
            </Subsection>

            <Subsection sectionIdentifier="5.2" underline={true}>
                <Checkbox
                    id="pasientMedArbeidsgiver"
                    checked={schema.pasientMedArbeidsgiver}
                    label="Pasienten har arbeidsgiver"
                    onChange={() => {
                        setSchema(state => ({
                            ...state,
                            pasientMedArbeidsgiver: !state.pasientMedArbeidsgiver,
                        }));
                    }}
                    feil={errors.pasientMedArbeidsgiver}
                />
                <br />

                <ExpandableField show={schema.pasientMedArbeidsgiver}>
                    <Subsection sectionIdentifier="5.2.1" underline={false}>
                        <Checkbox
                            id="egetArbeidPaSikt"
                            checked={schema.egetArbeidPaSikt}
                            label="Pasienten kan på sikt komme tilbake til samme arbeidsgiver"
                            onChange={() =>
                                setSchema(state => ({
                                    ...state,
                                    egetArbeidPaSikt: !state.egetArbeidPaSikt,
                                }))
                            }
                            feil={errors.egetArbeidPaSikt}
                        />
                        <br />
                        <ExpandableField show={schema.egetArbeidPaSikt}>
                            <DatePicker
                                id="arbeidFOM"
                                label="Anslå når dette kan skje"
                                value={schema.arbeidFOM}
                                onChange={newDate => {
                                    setSchema(state => ({
                                        ...state,
                                        arbeidFOM: newDate,
                                    }));
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
                                setSchema(state => ({
                                    ...state,
                                    annetArbeidPaSikt: !state.annetArbeidPaSikt,
                                }))
                            }
                            feil={errors.annetArbeidPaSikt}
                        />
                    </Subsection>
                    <br />
                    <DatePicker
                        id="vurderingsDatoIArbeid"
                        label="5.2.3 Hvis usikker: Når antar du å kunne gi tilbakemelding på dette?"
                        value={schema.vurderingsDatoIArbeid}
                        onChange={newDate => {
                            setSchema(state => ({
                                ...state,
                                vurderingsDatoIArbeid: newDate,
                            }));
                        }}
                        feil={errors.vurderingsDatoIArbeid}
                    />
                </ExpandableField>
            </Subsection>

            <Subsection sectionIdentifier="5.3" underline={false}>
                <Checkbox
                    id="pasientUtenArbeidsgiver"
                    checked={schema.pasientUtenArbeidsgiver}
                    label="Pasienten har ikke arbeidsgiver"
                    onChange={() => {
                        setSchema(state => ({
                            ...state,
                            pasientUtenArbeidsgiver: !state.pasientUtenArbeidsgiver,
                        }));
                    }}
                    feil={errors.pasientUtenArbeidsgiver}
                />
                <br />

                <ExpandableField show={schema.pasientUtenArbeidsgiver}>
                    <Subsection sectionIdentifier="5.3.1" underline={false}>
                        <Checkbox
                            id="arbeidsforPaSikt"
                            checked={schema.arbeidsforPaSikt}
                            label="Pasienten kan komme tilbake i arbeid på sikt"
                            onChange={() =>
                                setSchema(state => ({
                                    ...state,
                                    arbeidsforPaSikt: !state.arbeidsforPaSikt,
                                }))
                            }
                            feil={errors.arbeidsforPaSikt}
                        />
                        <br />
                        <ExpandableField show={schema.arbeidsforPaSikt}>
                            <DatePicker
                                id="arbeidsforFOM"
                                label="Anslå når dette kan skje"
                                value={schema.arbeidsforFOM}
                                onChange={newDate => {
                                    setSchema(state => ({
                                        ...state,
                                        arbeidsforFOM: newDate,
                                    }));
                                }}
                                feil={errors.arbeidsforFOM}
                            />
                        </ExpandableField>
                    </Subsection>
                    <DatePicker
                        id="vurderingsDatoUtenArbeid"
                        label="5.3.2 Hvis usikker: Når antar du å kunne gi tilbakemelding på dette?"
                        value={schema.vurderingsDatoUtenArbeid}
                        onChange={newDate => {
                            setSchema(state => ({
                                ...state,
                                vurderingsDatoUtenArbeid: newDate,
                            }));
                        }}
                        feil={errors.vurderingsDatoUtenArbeid}
                    />
                </ExpandableField>
            </Subsection>
        </SectionContainer>
    );
};

export default FriskmeldingSection;
