import React from 'react';
import { Checkbox, Input, Select, Textarea } from 'nav-frontend-skjema';
import { Element } from 'nav-frontend-typografi';

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
    aktivitetIkkeMuligMedisinskArsakType?: MedisinskArsakType[];
    aktivitetIkkeMuligMedisinskArsakBeskrivelse?: string;
    aktivitetIkkeMuligArbeidsrelatertArsak?: boolean;
    aktivitetIkkeMuligArbeidsrelatertArsakType?: ArbeidsrelatertArsakType[];
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
        <SectionContainer section={section}>
            <Subsection sectionIdentifier="4.1">
                <Checkbox
                    checked={schema.avventendeSykmelding}
                    label="Pasienten kan benytte avventende sykmelding"
                    onChange={() => {
                        validate('avventendeSykmelding', !schema.avventendeSykmelding);
                        validate('mulighetForArbeid', !schema.avventendeSykmelding);
                        setSchema(state => ({
                            ...state,
                            avventendeSykmelding: !state.avventendeSykmelding,
                        }));
                    }}
                    feil={errors.avventendeSykmelding}
                />
                <br />
                {schema.avventendeSykmelding && (
                    <>
                        <RangePicker
                            labelFrom="4.1.1 f.o.m."
                            labelTo="4.1.2 t.o.m."
                            value={schema.avventendePeriode || []}
                            onChange={newDates => {
                                console.log(newDates);
                                setSchema(state => ({
                                    ...state,
                                    avventendePeriode: newDates,
                                }));
                                validate('avventendePeriode', newDates);
                            }}
                            feil={errors.avventendePeriode}
                        />
                        <Textarea
                            maxLength={0}
                            value={schema.avventendeInnspillTilArbeidsgiver || ''}
                            onChange={({ target: { value } }) => {
                                setSchema(state => ({
                                    ...state,
                                    avventendeInnspillTilArbeidsgiver: value,
                                }));
                                validate('avventendeInnspillTilArbeidsgiver', value);
                            }}
                            feil={errors.avventendeInnspillTilArbeidsgiver}
                            label={<Element>4.1.3 Innspill til arbeidsgiver om tilrettelegging</Element>}
                        />
                    </>
                )}
            </Subsection>
            <Subsection sectionIdentifier="4.2">
                <Checkbox
                    checked={schema.gradertSykmelding}
                    label="Pasienten kan være delvis i arbeid (gradert sykmelding)"
                    onChange={() => {
                        validate('gradertSykmelding', !schema.gradertSykmelding);
                        validate('mulighetForArbeid', !schema.gradertSykmelding);
                        setSchema(state => ({
                            ...state,
                            gradertSykmelding: !state.gradertSykmelding,
                        }));
                    }}
                    feil={errors.gradertSykmelding}
                />
                <br />
                {schema.gradertSykmelding && (
                    <>
                        <RangePicker
                            labelFrom="4.2.1 f.o.m."
                            labelTo="4.2.2 t.o.m."
                            value={schema.gradertPeriode || []}
                            onChange={newDates =>
                                setSchema(state => ({
                                    ...state,
                                    gradertPeriode: newDates,
                                }))
                            }
                            feil={errors.gradertPeriode}
                        />
                        <Input
                            className="form-margin-bottom half"
                            type="number"
                            value={schema.gradertGrad}
                            onChange={({ target: { value } }) => {
                                setSchema(state => ({
                                    ...state,
                                    gradertGrad: parseInt(value),
                                }));
                                validate('gradertGrad', value);
                            }}
                            feil={errors.gradertGrad}
                            label={<Element>4.2.3 Oppgi grad for sykmelding</Element>}
                        />
                    </>
                )}

                <Element className="form-label">4.2.4</Element>
                <Checkbox
                    checked={schema.gradertReisetilskudd}
                    label="Pasienten kan være delvis i arbeid ved bruk av reisetilskudd"
                    onChange={() => {
                        setSchema(state => ({
                            ...state,
                            gradertReisetilskudd: !state.gradertReisetilskudd,
                        }));
                        validate('gradertReisetilskudd', schema.gradertReisetilskudd);
                    }}
                    feil={errors.gradertReisetilskudd}
                />
            </Subsection>

            <Subsection sectionIdentifier="4.3">
                <Checkbox
                    checked={schema.aktivitetIkkeMuligSykmelding}
                    label="Pasienten kan ikke være i arbeid (100 prosent sykmelding)"
                    onChange={() => {
                        validate('aktivitetIkkeMuligSykmelding', !schema.aktivitetIkkeMuligSykmelding);
                        validate('mulighetForArbeid', !schema.aktivitetIkkeMuligSykmelding);
                        setSchema(state => ({
                            ...state,
                            aktivitetIkkeMuligSykmelding: !state.aktivitetIkkeMuligSykmelding,
                        }));
                    }}
                    feil={errors.aktivitetIkkeMuligSykmelding}
                />
                <br />
                {schema.aktivitetIkkeMuligSykmelding && (
                    <>
                        <RangePicker
                            labelFrom="4.3.1 f.o.m."
                            labelTo="4.3.2 t.o.m."
                            value={schema.aktivitetIkkeMuligPeriode || []}
                            onChange={newDates =>
                                setSchema(state => ({
                                    ...state,
                                    aktivitetIkkeMuligPeriode: newDates,
                                }))
                            }
                            feil={errors.aktivitetIkkeMuligPeriode}
                        />
                        <Element className="form-label">4.3.3</Element>
                        <Checkbox
                            className="form-margin-bottom"
                            checked={schema.aktivitetIkkeMuligMedisinskArsak}
                            label="Det er medisinske årsaker som hindrer arbeidsrelatert aktivitet"
                            onChange={() =>
                                setSchema(state => ({
                                    ...state,
                                    aktivitetIkkeMuligMedisinskArsak: !state.aktivitetIkkeMuligMedisinskArsak,
                                }))
                            }
                            feil={errors.aktivitetIkkeMuligMedisinskArsak}
                        />
                        {schema.aktivitetIkkeMuligMedisinskArsak && (
                            <>
                                <Select
                                    onChange={({ target: { value } }) => {
                                        if (value === '0') {
                                            setSchema(state => ({
                                                ...state,
                                                aktivitetIkkeMuligMedisinskArsakType: undefined,
                                            }));
                                        } else {
                                            setSchema(state => ({
                                                ...state,
                                                aktivitetIkkeMuligMedisinskArsakType: [value] as MedisinskArsakType[],
                                            }));
                                        }
                                        validate('aktivitetIkkeMuligMedisinskArsakType', value);
                                    }}
                                    value={schema.aktivitetIkkeMuligMedisinskArsakType}
                                    className="form-margin-bottom"
                                    label={<Element>Medisinsk årsak</Element>}
                                    feil={errors.aktivitetIkkeMuligMedisinskArsakType}
                                >
                                    <option value="0">Velg</option>
                                    {Object.entries(MedisinskArsakType).map(([key, value]) => {
                                        return (
                                            <option key={key} value={value}>
                                                {value}
                                            </option>
                                        );
                                    })}
                                </Select>
                                <Input
                                    className="form-margin-bottom"
                                    type="text"
                                    onChange={({ target: { value } }) => {
                                        setSchema(state => ({
                                            ...state,
                                            aktivitetIkkeMuligMedisinskArsakBeskrivelse: value,
                                        }));
                                        validate('aktivitetIkkeMuligMedisinskArsakBeskrivelse', value);
                                    }}
                                    label={<Element>Beskrivelse</Element>}
                                    feil={errors.aktivitetIkkeMuligMedisinskArsakBeskrivelse}
                                />
                            </>
                        )}
                        <Element className="form-label">4.3.4</Element>
                        <Checkbox
                            className="form-margin-bottom"
                            checked={schema.aktivitetIkkeMuligArbeidsrelatertArsak}
                            label="Forhold på arbeidsplassen vanskeliggjør arbeidsrelatert aktivitet"
                            onChange={() =>
                                setSchema(state => ({
                                    ...state,
                                    aktivitetIkkeMuligArbeidsrelatertArsak: !state.aktivitetIkkeMuligArbeidsrelatertArsak,
                                }))
                            }
                            feil={errors.aktivitetIkkeMuligArbeidsrelatertArsak}
                        />
                        {schema.aktivitetIkkeMuligArbeidsrelatertArsak && (
                            <>
                                <Select
                                    onChange={({ target: { value } }) => {
                                        if (value === '0') {
                                            setSchema(state => ({
                                                ...state,
                                                aktivitetIkkeMuligArbeidsrelatertArsakType: undefined,
                                            }));
                                        } else {
                                            setSchema(state => ({
                                                ...state,
                                                aktivitetIkkeMuligArbeidsrelatertArsakType: [
                                                    value,
                                                ] as ArbeidsrelatertArsakType[],
                                            }));
                                        }
                                        validate('aktivitetIkkeMuligArbeidsrelatertArsakType', value);
                                    }}
                                    value={schema.aktivitetIkkeMuligArbeidsrelatertArsakType}
                                    className="form-margin-bottom"
                                    label={<Element>Arbeidsrelatert årsak</Element>}
                                    feil={errors.aktivitetIkkeMuligArbeidsrelatertArsakType}
                                >
                                    <option value="0">Velg</option>
                                    {Object.entries(ArbeidsrelatertArsakType).map(([key, value]) => {
                                        return (
                                            <option key={key} value={value}>
                                                {value}
                                            </option>
                                        );
                                    })}
                                </Select>
                                <Input
                                    className="form-margin-bottom"
                                    type="text"
                                    onChange={({ target: { value } }) => {
                                        setSchema(state => ({
                                            ...state,
                                            aktivitetIkkeMuligArbeidsrelatertArsakBeskrivelse: value,
                                        }));
                                        validate('aktivitetIkkeMuligArbeidsrelatertArsakBeskrivelse', value);
                                    }}
                                    label={<Element>Beskrivelse</Element>}
                                    feil={errors.aktivitetIkkeMuligArbeidsrelatertArsakBeskrivelse}
                                />
                            </>
                        )}
                    </>
                )}
            </Subsection>

            <Subsection sectionIdentifier="4.4">
                <Checkbox
                    checked={schema.behandlingsdagerSykmelding}
                    label="Pasienten kan ikke være i arbeid på behandlingsdager"
                    onChange={() => {
                        validate('behandlingsdagerSykmelding', !schema.behandlingsdagerSykmelding);
                        validate('mulighetForArbeid', !schema.behandlingsdagerSykmelding);
                        setSchema(state => ({
                            ...state,
                            behandlingsdagerSykmelding: !state.behandlingsdagerSykmelding,
                        }));
                    }}
                    feil={errors.behandlingsdagerSykmelding}
                />
                <br />
                {schema.behandlingsdagerSykmelding && (
                    <>
                        <RangePicker
                            labelFrom="4.4.1 f.o.m."
                            labelTo="4.4.2 t.o.m."
                            value={schema.behandlingsdagerPeriode || []}
                            onChange={newDates => {
                                setSchema(state => ({
                                    ...state,
                                    behandlingsdagerPeriode: newDates,
                                }));
                                validate('behandlingsdagerPeriode', newDates);
                            }}
                            feil={errors.behandlingsdagerPeriode}
                        />

                        <Input
                            className="form-margin-bottom half"
                            type="number"
                            onChange={({ target: { value } }) => {
                                setSchema(state => ({
                                    ...state,
                                    behandlingsdagerAntall: Number(value),
                                }));
                                validate('behandlingsdagerAntall', value);
                            }}
                            feil={errors.behandlingsdagerAntall}
                            label={<Element>4.4.3 Oppgi antall dager i perioden</Element>}
                        />
                    </>
                )}
            </Subsection>

            <Subsection sectionIdentifier="4.5" underline={false}>
                <Checkbox
                    checked={schema.reisetilskuddSykmelding}
                    label="Pasienten kan være i fullt arbeid ved bruk av reisetilskudd"
                    onChange={() => {
                        validate('reisetilskuddSykmelding', !schema.reisetilskuddSykmelding);
                        validate('mulighetForArbeid', !schema.reisetilskuddSykmelding);
                        setSchema(state => ({
                            ...state,
                            reisetilskuddSykmelding: !state.reisetilskuddSykmelding,
                        }));
                    }}
                    feil={errors.reisetilskuddSykmelding}
                />
                <br />
                {schema.reisetilskuddSykmelding && (
                    <RangePicker
                        labelFrom="4.5.1 f.o.m."
                        labelTo="4.5.2 t.o.m."
                        value={schema.reisetilskuddPeriode || []}
                        onChange={newDates => {
                            setSchema(state => ({
                                ...state,
                                reisetilskuddPeriode: newDates,
                            }));
                            validate('reisetilskuddPeriode', newDates);
                        }}
                        feil={errors.reisetilskuddPeriode}
                    />
                )}
            </Subsection>
            {errors.mulighetForArbeid && <p className="typo-feilmelding">{errors.mulighetForArbeid}</p>}
        </SectionContainer>
    );
};

export default MulighetForArbeidSection;
